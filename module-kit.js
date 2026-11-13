/**
 * SHADOWPROOF MODULE KIT — shared behaviour for modules 05, 07–16.
 *
 * Usage (at the end of a module page, after questions.js + assessment.js):
 *   ModuleKit.init({ moduleId: 'oauth', moduleTitle: 'The Handed Key' });
 *
 * Markup conventions handled automatically:
 *   [data-go="N"]                         → navigate to scene N
 *   .choice-set > .choice[data-verdict]   → scenario choices with inline .why feedback
 *   .flag-zone .flag (+ .flag-log, .flag-count, .flag-total)  → spot-the-red-flags
 *   .triage > .tri[data-answer] + [data-pick]                → classify items
 *   .reveal                               → click-to-reveal cards
 *   #startCheckBtn                        → reveals the knowledge check
 */
(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var current = 1, total = 1, moduleKey = null;

  function goToScene(n) {
    var scene = document.getElementById('scene-' + n);
    if (!scene) return;
    current = n;
    var bar = document.getElementById('mkProgress');
    if (bar) bar.style.width = (total > 1 ? ((n - 1) / (total - 1)) * 100 : 100) + '%';
    if (moduleKey) { try { sessionStorage.setItem(moduleKey, String(n)); } catch (e) {} }
    $$('.scene').forEach(function (s) { s.classList.remove('active'); });
    scene.classList.add('active');
    $$('.mk-chapter').forEach(function (m, i) {
      m.classList.remove('active', 'done');
      if (i + 1 < n) m.classList.add('done');
      if (i + 1 === n) { m.classList.add('active'); m.setAttribute('aria-current', 'step'); }
      else m.removeAttribute('aria-current');
    });
    var h = scene.querySelector('h1, h2');
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) {} }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initChoices() {
    $$('.choice-set').forEach(function (set) {
      $$('.choice', set).forEach(function (btn) {
        btn.setAttribute('type', 'button');
        btn.addEventListener('click', function () {
          btn.classList.add('picked');
          if (btn.dataset.verdict === 'good') set.classList.add('solved');
        });
      });
    });
  }

  function initFlags() {
    $$('.flag-zone').forEach(function (zone) {
      var flags = $$('.flag', zone);
      var log = $('.flag-log', zone);
      var count = $('.flag-count', zone);
      var total = $('.flag-total', zone);
      if (total) total.textContent = flags.length;
      var found = 0;
      flags.forEach(function (f) {
        f.setAttribute('type', 'button');
        f.addEventListener('click', function () {
          if (f.classList.contains('found')) return;
          f.classList.add('found');
          found++;
          if (count) count.textContent = found;
          var why = $('.why', f);
          if (log && why) {
            var item = document.createElement('div');
            item.className = 'flag-log-item';
            item.innerHTML = why.innerHTML;
            log.appendChild(item);
          }
        });
      });
    });
  }

  function initTriage() {
    $$('.triage').forEach(function (group) {
      var items = $$('.tri', group);
      var score = $('.tri-score', group.parentNode);
      var right = 0, done = 0;
      function update() {
        if (!score) return;
        score.innerHTML = done < items.length
          ? 'Sorted <b>' + done + '</b> of ' + items.length
          : 'You sorted <b>' + right + ' of ' + items.length + '</b> correctly. ' +
            (right === items.length ? 'Sharp eyes.' : 'Read the notes on the ones you missed — that is where the lesson is.');
      }
      items.forEach(function (item) {
        $$('[data-pick]', item).forEach(function (b) {
          b.setAttribute('type', 'button');
          b.addEventListener('click', function () {
            if (item.classList.contains('done')) return;
            b.classList.add('chosen');
            item.classList.add('done');
            var ok = b.dataset.pick === item.dataset.answer;
            item.classList.add(ok ? 'right' : 'wrong');
            if (ok) right++;
            done++;
            update();
          });
        });
      });
      update();
    });
  }

  function initReveals() {
    $$('.reveal').forEach(function (r) {
      r.setAttribute('type', 'button');
      r.addEventListener('click', function () { r.classList.toggle('open'); });
    });
  }

  function initClock() {
    var el = document.getElementById('clock');
    if (!el) return;
    function tick() { el.textContent = new Date().toTimeString().slice(0, 8); }
    tick();
    setInterval(tick, 1000);
  }

  window.ModuleKit = {
    goToScene: goToScene,
    init: function (cfg) {
      total = document.querySelectorAll('.scene').length;
      moduleKey = 'shadowproof_scene_' + cfg.moduleId;

      // Reading-progress bar
      var bar = document.createElement('div');
      bar.className = 'mk-progress'; bar.id = 'mkProgress'; bar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(bar);

      // Chapters become real, clickable buttons
      $$('.mk-chapter').forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = c.className; b.textContent = c.textContent;
        b.addEventListener('click', function () { goToScene(i + 1); });
        c.parentNode.replaceChild(b, c);
      });

      // Arrow keys move between scenes (ignored while typing)
      document.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        var t = (e.target && e.target.tagName) || '';
        if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
        if (e.key === 'ArrowRight' && current < total) goToScene(current + 1);
        else if (e.key === 'ArrowLeft' && current > 1) goToScene(current - 1);
      });

      // Keyboard hint under the first scene's nav row
      var firstNav = $('#scene-1 .nav-row');
      if (firstNav) {
        var hint = document.createElement('div');
        hint.className = 'mk-keys';
        hint.innerHTML = 'Tip: use <kbd>←</kbd> <kbd>→</kbd> to move between chapters, or click a chapter above.';
        firstNav.parentNode.insertBefore(hint, firstNav.nextSibling);
      }

      $$('[data-go]').forEach(function (b) {
        b.addEventListener('click', function () { goToScene(parseInt(b.dataset.go, 10)); });
      });
      initChoices();
      initFlags();
      initTriage();
      initReveals();
      initClock();

      // Resume where the learner left off in this browser tab session
      var saved = 1;
      try { saved = parseInt(sessionStorage.getItem(moduleKey) || '1', 10) || 1; } catch (e) {}
      goToScene(Math.min(Math.max(saved, 1), total));
      window.scrollTo(0, 0);

      var startBtn = document.getElementById('startCheckBtn');
      if (startBtn) {
        startBtn.addEventListener('click', function () {
          startBtn.style.display = 'none';
          var bank = (window.SHADOWPROOF_QUESTIONS || {})[cfg.questionsKey || cfg.moduleId];
          window.ShadowproofAssessment.init({
            moduleId: cfg.moduleId,
            moduleTitle: cfg.moduleTitle,
            questions: bank || []
          });
          document.getElementById('shadowproof-assessment').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  };
})();
