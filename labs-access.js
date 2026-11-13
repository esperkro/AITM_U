/**
 * SHADOWPROOF — LAB ACCESS CODES
 *
 * Every lab after Module 01 is locked behind an access code. A learner gets a code by:
 *   1. passing the previous lab's knowledge check, which reveals the next lab's code ("intel recovered"), or
 *   2. receiving it from an instructor, who has the full code sheet plus a master code.
 *
 * IMPORTANT: this is client-side gating for a static prototype. The codes are obfuscated, not
 * secret: anyone reading the source can recover them. Real enforcement needs the server-side
 * platform described in roadmap-2027.html.
 *
 * To change codes: encode each new code as base64(reverse(code)) and replace the value below.
 *   node -e "console.log(Buffer.from('NEW-CODE'.split('').reverse().join('')).toString('base64'))"
 */
(function () {
  var UNLOCK_KEY = 'shadowproof_unlocked_v1';
  var VAULT_KEY = 'shadowproof_vault_v1';
  var PROGRESS_KEY = 'shadowproof_progress_v1';

  // Curriculum order (matches index.html).
  var ORDER = [
    { id: 'aitm',         num: '01', title: 'Ghost Session',          file: '01-aitm.html' },
    { id: 'bec',          num: '02', title: 'The CEO Text',           file: '02-bec.html' },
    { id: 'smishing',     num: '03', title: 'Silent Signal',          file: '03-smishing.html' },
    { id: 'quishing',     num: '04', title: 'The Painted Door',       file: '04-quishing.html' },
    { id: 'ransomware',   num: '05', title: 'The Locked Door',        file: '13-ransomware.html' },
    { id: 'vishing',      num: '06', title: 'The Voice on the Line',  file: '05-vishing.html' },
    { id: 'mfa-fatigue',  num: '07', title: 'Endless Knocking',       file: '06-mfa-fatigue.html' },
    { id: 'oauth',        num: '08', title: 'The Handed Key',         file: '07-oauth.html' },
    { id: 'passwords',    num: '09', title: 'The Master Key',         file: '08-passwords.html' },
    { id: 'deepfake',     num: '10', title: 'The Perfect Copy',       file: '14-deepfake.html' },
    { id: 'usb',          num: '11', title: 'The Gift Nobody Sent',   file: '09-usb.html' },
    { id: 'wifi',         num: '12', title: 'The Open Window',        file: '10-wifi.html' },
    { id: 'social-eng',   num: '13', title: 'Held Door',              file: '11-social-eng.html' },
    { id: 'home-network', num: '14', title: 'The Home Front',         file: '15-home-network.html' },
    { id: 'insider',      num: '15', title: 'The Careless Hand',      file: '12-insider.html' },
    { id: 'reporting',    num: '16', title: 'The First Nine Minutes', file: '16-reporting.html' }
  ];

  // Encoded as base64(reverse(code)). Key = the lab the code opens.
  var ENC = {
    'bec': 'UTdLMy1SRUdERUw=',
    'smishing': 'RDJXOC1MQU5HSVM=',
    'quishing': 'UjlNNS1MRVhJUA==',
    'ransomware': 'SDZUMi1SRUhQSUM=',
    'vishing': 'TDRGOS1PSENF',
    'mfa-fatigue': 'WDNCNi1LQ09OSw==',
    'oauth': 'TjhQNC1ORUtPVA==',
    'passwords': 'QzJKNy1UTFVBVg==',
    'deepfake': 'SzVWMy1ST1JSSU0=',
    'usb': 'TTFEOC1EQU9MWUFQ',
    'wifi': 'RzdSNS1OT0NBRUI=',
    'social-eng': 'UDlYMi1FVEFHTElBVA==',
    'home-network': 'RjRONi1SRVRVT1I=',
    'insider': 'VDNIOS1LQUVM',
    'reporting': 'VzhDNC1ORVJJUw==',
    '__master': 'MTM3Ny1SRVRTQU0tUFM='
  };

  function dec(s) { try { return atob(s).split('').reverse().join(''); } catch (e) { return ''; } }
  function norm(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (e) { return fallback; } }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function find(id) { for (var i = 0; i < ORDER.length; i++) if (ORDER[i].id === id) return ORDER[i]; return null; }
  function indexOf(id) { for (var i = 0; i < ORDER.length; i++) if (ORDER[i].id === id) return i; return -1; }

  function isUnlocked(id) {
    if (indexOf(id) === 0) return true;
    if (read(UNLOCK_KEY, {})[id]) return true;
    var p = read(PROGRESS_KEY, {});
    return !!(p[id] && p[id].completed); // already-completed labs stay open
  }

  function unlock(ids) {
    var u = read(UNLOCK_KEY, {});
    ids.forEach(function (id) { u[id] = Date.now(); });
    write(UNLOCK_KEY, u);
  }

  /** Try a code. Returns { ok, ids:[unlocked ids], master, message }. */
  function redeem(code) {
    var c = norm(code);
    if (!c) return { ok: false, message: 'Enter an access code.' };
    if (c === norm(dec(ENC.__master))) {
      var all = ORDER.map(function (m) { return m.id; });
      unlock(all);
      return { ok: true, master: true, ids: all, message: 'Instructor code accepted: all labs unlocked.' };
    }
    for (var id in ENC) {
      if (id === '__master') continue;
      if (c === norm(dec(ENC[id]))) {
        var m = find(id);
        var already = isUnlocked(id);
        unlock([id]);
        addToVault(id, true);
        return { ok: true, ids: [id], message: already
          ? 'Module ' + m.num + ' · ' + m.title + ' was already unlocked.'
          : 'Access granted: Module ' + m.num + ' · ' + m.title + ' unlocked.' };
      }
    }
    return { ok: false, message: 'Code not recognised. Check it and try again.' };
  }

  function nextOf(id) { var i = indexOf(id); return i >= 0 && i < ORDER.length - 1 ? ORDER[i + 1] : null; }

  function codeFor(id) { return ENC[id] ? dec(ENC[id]) : null; }

  /** Record a recovered code in the learner's vault (does not unlock the lab). */
  function addToVault(id, used) {
    var v = read(VAULT_KEY, {});
    v[id] = v[id] || { foundAt: Date.now() };
    if (used) v[id].used = true;
    write(VAULT_KEY, v);
  }

  /** Called when a lab's knowledge check is passed: returns the next lab and its code. */
  function revealNext(id) {
    var n = nextOf(id);
    if (!n) return null;
    addToVault(n.id, isUnlocked(n.id));
    return { module: n, code: codeFor(n.id), alreadyUnlocked: isUnlocked(n.id) };
  }

  function vault() {
    var v = read(VAULT_KEY, {});
    return ORDER.filter(function (m) { return v[m.id]; }).map(function (m) {
      return { module: m, code: codeFor(m.id), used: isUnlocked(m.id), foundAt: v[m.id].foundAt };
    });
  }

  /** Put at the top of each lab page: bounces to the dashboard if the lab is still locked. */
  function guard(id) {
    if (!isUnlocked(id)) {
      try { window.location.replace('index.html?locked=' + encodeURIComponent(id)); } catch (e) {}
    }
  }

  function reset() {
    try { localStorage.removeItem(UNLOCK_KEY); localStorage.removeItem(VAULT_KEY); } catch (e) {}
  }

  window.SPAccess = {
    order: ORDER, find: find, isUnlocked: isUnlocked, redeem: redeem, nextOf: nextOf,
    revealNext: revealNext, vault: vault, guard: guard, reset: reset
  };
})();
