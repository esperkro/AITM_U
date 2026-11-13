/**
 * SHADOWPROOF ASSESSMENT ENGINE (v2)
 * Shared knowledge check + badge system for all modules.
 *
 * Usage in a module:
 *   1. Include questions.js, assessment.js (and labs-access.js for access codes).
 *   2. Add a container div: <div id="shadowproof-assessment"></div>
 *   3. Call: ShadowproofAssessment.init({ moduleId, moduleTitle, questions: [...] })
 *
 * Question shape: { question, options[], correct (index), explanation }
 *
 * Difficulty rules (v2):
 *   - Each attempt draws QUESTIONS_PER_ATTEMPT questions at random from the module's bank.
 *   - Answer options are shuffled on every attempt, so answer positions can't be memorised.
 *   - The pass mark is PASS_RATIO of the questions drawn (5 of 6).
 *   - A failed attempt starts a cooldown before the learner can retry.
 */
(function () {
  const PROFILE_KEY = 'shadowproof_profile_v1';
  const PROGRESS_KEY = 'shadowproof_progress_v1';
  const BADGES_KEY = 'shadowproof_badges_v1';
  const COOLDOWN_KEY = 'shadowproof_cooldown_v1';
  const QUESTIONS_PER_ATTEMPT = 6;
  const PASS_RATIO = 0.8;          // 80% → 5 of 6
  const COOLDOWN_SECONDS = 30;

  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch (e) { return fallback; } }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function requireProfile() {
    const p = read(PROFILE_KEY, null);
    if (!p) { window.location.href = 'signin.html'; return null; }
    return p;
  }

  function rand(n) {
    if (window.crypto && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
    return Math.floor(Math.random() * n);
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /** Draw questions and shuffle each one's options, remapping the correct index. */
  function buildAttempt(bank) {
    const n = Math.min(QUESTIONS_PER_ATTEMPT, bank.length);
    return shuffle(bank).slice(0, n).map(q => {
      const order = shuffle(q.options.map((_, i) => i));
      return {
        question: q.question,
        options: order.map(i => q.options[i]),
        correct: order.indexOf(q.correct),
        explanation: q.explanation
      };
    });
  }

  function passMark(n) { return Math.ceil(n * PASS_RATIO); }

  function saveBadge(moduleId, moduleTitle, score, total) {
    const badges = read(BADGES_KEY, {});
    const prev = badges[moduleId];
    badges[moduleId] = {
      moduleId, moduleTitle,
      earnedAt: prev ? prev.earnedAt : Date.now(),
      score, total,
      badgeId: prev ? prev.badgeId : `SHDW-${moduleId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
    };
    write(BADGES_KEY, badges);
    return badges[moduleId];
  }

  function recordAttempt(moduleId, passed, score, total, badge) {
    const p = read(PROGRESS_KEY, {});
    const r = p[moduleId] || {};
    r.attempts = (r.attempts || 0) + 1;
    r.best = Math.max(r.best || 0, score);
    r.total = total;
    if (passed) {
      r.completed = true;
      r.ts = r.ts || Date.now();
      r.badgeId = badge ? badge.badgeId : r.badgeId || null;
      r.score = score;
    }
    p[moduleId] = r;
    write(PROGRESS_KEY, p);
    return r;
  }

  function cooldownLeft(moduleId) {
    const c = read(COOLDOWN_KEY, {});
    const until = c[moduleId] || 0;
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
  }
  function startCooldown(moduleId) {
    const c = read(COOLDOWN_KEY, {});
    c[moduleId] = Date.now() + COOLDOWN_SECONDS * 1000;
    write(COOLDOWN_KEY, c);
  }

  const styles = `
    .sp-assessment {
      --spa: var(--sp-accent, #00ff9f);
      background: rgba(8, 11, 14, 0.85);
      border: 1px solid var(--spa);
      border-radius: 6px;
      padding: 40px;
      margin: 40px 0;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      color: #e8eef2;
      max-width: 900px;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
      font-size: 15px;
    }
    .sp-assessment * { box-sizing: border-box; }
    .sp-header {
      display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
      padding-bottom: 20px; border-bottom: 1px dashed #2c3a44; margin-bottom: 28px;
    }
    .sp-title { font-family: 'Fraunces', Georgia, serif; font-size: 28px; font-weight: 700; line-height: 1.1; }
    .sp-title-italic { font-style: italic; color: var(--spa); }
    .sp-badge-preview { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #a3b2bd; letter-spacing: 0.15em; text-transform: uppercase; }
    .sp-progress-row { display: flex; gap: 6px; margin-bottom: 22px; }
    .sp-progress-dot { flex: 1; height: 5px; background: #2a3640; border-radius: 3px; transition: background 0.3s; }
    .sp-progress-dot.active { background: var(--spa); }
    .sp-progress-dot.done { background: #19c37d; }
    .sp-progress-dot.wrong { background: #ff4757; }
    .sp-q-meta { display: flex; justify-content: space-between; gap: 12px; font-size: 11px; letter-spacing: 0.18em; color: var(--spa); margin-bottom: 12px; font-weight: 700; text-transform: uppercase; }
    .sp-q-meta span:last-child { color: #a3b2bd; }
    .sp-q-text { font-family: 'Fraunces', Georgia, serif; font-size: 22px; line-height: 1.4; font-weight: 500; margin-bottom: 26px; color: #f2f6f8; }
    .sp-options { display: grid; gap: 10px; }
    .sp-option {
      display: flex; align-items: flex-start; gap: 14px; width: 100%;
      padding: 15px 18px; background: #121a21; border: 1px solid #2c3a44; border-radius: 4px;
      color: #e8eef2; font-family: inherit; font-size: 14.5px; line-height: 1.5;
      cursor: pointer; text-align: left; transition: border-color 0.15s, background 0.15s;
    }
    .sp-option:hover:not(:disabled), .sp-option:focus-visible { border-color: var(--spa); background: #17222b; outline: none; }
    .sp-option-letter {
      flex: 0 0 28px; height: 28px; border: 1px solid #3a4a56; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 13px; color: var(--spa);
    }
    .sp-option:disabled { cursor: default; }
    .sp-option:disabled:not(.correct):not(.wrong) { opacity: 0.55; }
    .sp-option.correct { background: rgba(25, 195, 125, 0.14); border-color: #19c37d; }
    .sp-option.correct .sp-option-letter { border-color: #19c37d; color: #19c37d; }
    .sp-option.wrong { background: rgba(255, 71, 87, 0.14); border-color: #ff4757; }
    .sp-option.wrong .sp-option-letter { border-color: #ff4757; color: #ff4757; }
    .sp-explanation {
      margin-top: 20px; padding: 16px 20px; background: #121a21; border-left: 3px solid #19c37d;
      font-size: 14px; line-height: 1.65; color: #c4d0d8; display: none; animation: spFadeIn 0.3s ease;
    }
    .sp-explanation.wrong { border-left-color: #ff4757; }
    .sp-explanation.show { display: block; }
    @keyframes spFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    .sp-hint { font-size: 11px; color: #8796a3; margin-top: 14px; letter-spacing: 0.05em; }
    .sp-hint kbd { border: 1px solid #3a4a56; border-radius: 3px; padding: 0 5px; font-family: inherit; color: #c4d0d8; }

    .sp-btn {
      padding: 14px 26px; background: transparent; border: 1px solid #3a4a56; color: #e8eef2;
      font-family: inherit; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
      text-decoration: none; display: inline-block; font-weight: 700; transition: all 0.15s; border-radius: 3px;
    }
    .sp-btn:hover { border-color: var(--spa); color: var(--spa); }
    .sp-btn.primary { background: var(--spa); color: #0a0d10; border-color: var(--spa); }
    .sp-btn.primary:hover { background: #f2f6f8; border-color: #f2f6f8; color: #0a0d10; }
    .sp-btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .sp-next-btn { margin-top: 16px; }

    .sp-result { text-align: center; padding: 10px 0; animation: spFadeIn 0.4s ease; }
    .sp-result-score { font-family: 'Fraunces', Georgia, serif; font-size: 72px; font-weight: 800; line-height: 1; margin-bottom: 8px; }
    .sp-result-score.pass { color: #19c37d; }
    .sp-result-score.fail { color: #ff4757; }
    .sp-result-score .of { color: #6f808c; font-size: 32px; }
    .sp-result-title { font-family: 'Fraunces', Georgia, serif; font-size: 32px; font-weight: 700; margin-bottom: 12px; }
    .sp-result-title .italic { font-style: italic; color: #19c37d; }
    .sp-result-sub { color: #a3b2bd; max-width: 540px; margin: 0 auto 28px; font-size: 14px; line-height: 1.65; }
    .sp-result-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .sp-review { text-align: left; margin: 0 auto 28px; max-width: 640px; display: grid; gap: 8px; }
    .sp-review-item { font-size: 13px; color: #a3b2bd; padding: 10px 14px; background: #121a21; border-left: 3px solid #ff4757; }
    .sp-review-item b { color: #e8eef2; font-weight: 600; }

    .sp-badge-earned { display: flex; flex-direction: column; align-items: center; margin: 24px 0; animation: spBadgeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes spBadgeIn { 0% { opacity: 0; transform: scale(0.5) rotate(-10deg); } 100% { opacity: 1; transform: none; } }
    .sp-badge-earned svg { width: 170px; height: 170px; filter: drop-shadow(0 0 24px rgba(25, 195, 125, 0.4)); }
    .sp-badge-id { font-size: 10px; color: #8796a3; letter-spacing: 0.15em; margin-top: 14px; text-transform: uppercase; }

    .sp-intel {
      margin: 8px auto 28px; max-width: 560px; text-align: left;
      border: 1px dashed var(--spa); background: rgba(255,255,255,0.03); padding: 20px 22px; border-radius: 4px;
    }
    .sp-intel-label { font-size: 10px; letter-spacing: 0.25em; color: var(--spa); text-transform: uppercase; margin-bottom: 8px; }
    .sp-intel-for { color: #c4d0d8; font-size: 13px; margin-bottom: 12px; }
    .sp-intel-code {
      font-size: 26px; font-weight: 800; letter-spacing: 0.12em; color: #f2f6f8;
      background: #0a0d10; border: 1px solid #2c3a44; padding: 12px 16px; text-align: center; margin-bottom: 14px;
      user-select: all; word-break: break-all;
    }
    .sp-intel-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .sp-intel-actions .sp-btn { padding: 11px 18px; }

    .sp-intro-panel { text-align: center; padding: 10px 0; }
    .sp-intro-icon { font-size: 44px; margin-bottom: 12px; }
    .sp-intro-head { font-family: 'Fraunces', Georgia, serif; font-size: 24px; font-weight: 600; margin-bottom: 14px; }
    .sp-rules { list-style: none; max-width: 520px; margin: 0 auto 26px; text-align: left; padding: 0; }
    .sp-rules li { padding: 7px 0 7px 26px; position: relative; color: #b8c5cf; font-size: 14px; border-bottom: 1px dashed #24303a; }
    .sp-rules li::before { content: '▸'; position: absolute; left: 6px; color: var(--spa); }
    .sp-stats { font-size: 12px; color: #8796a3; margin-bottom: 18px; }

    @media (max-width: 640px) {
      .sp-assessment { padding: 24px 16px; }
      .sp-q-text { font-size: 19px; }
      .sp-result-score { font-size: 56px; }
      .sp-intel-code { font-size: 20px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sp-assessment *, .sp-badge-earned { animation: none !important; transition: none !important; }
    }
  `;

  function injectStyles() {
    if (document.getElementById('sp-assessment-styles')) return;
    const s = document.createElement('style');
    s.id = 'sp-assessment-styles';
    s.textContent = styles;
    document.head.appendChild(s);
  }

  // Badge SVG generator — creates a unique badge based on module
  function generateBadgeSVG(moduleId, moduleTitle) {
    const badges = {
      'aitm': { icon: '👻', label: 'GHOST SESSION', color: '#00ff9f', bg: '#0a0d10' },
      'bec': { icon: '💼', label: 'THE CEO TEXT', color: '#b8322b', bg: '#f4efe6' },
      'smishing': { icon: '📱', label: 'SILENT SIGNAL', color: '#ffb020', bg: '#0a0806' },
      'quishing': { icon: '🔲', label: 'PAINTED DOOR', color: '#d63838', bg: '#f8f4ec' },
      'vishing': { icon: '📞', label: 'VOICE ON LINE', color: '#d4a656', bg: '#1a1512' },
      'mfa-fatigue': { icon: '🔔', label: 'ENDLESS KNOCKING', color: '#5ab9ff', bg: '#0a0d18' },
      'oauth': { icon: '🎫', label: 'HANDED KEY', color: '#b48fff', bg: '#0a0810' },
      'passwords': { icon: '🗝️', label: 'MASTER KEY', color: '#40ff8a', bg: '#0a1010' },
      'usb': { icon: '💾', label: 'GIFT NOBODY SENT', color: '#ffb84d', bg: '#100a08' },
      'wifi': { icon: '📶', label: 'OPEN WINDOW', color: '#5ab9ff', bg: '#0a1018' },
      'social-eng': { icon: '🚪', label: 'HELD DOOR', color: '#ffb020', bg: '#100a08' },
      'insider': { icon: '📁', label: 'CARELESS HAND', color: '#b48fff', bg: '#0a0810' },
      'ransomware': { icon: '🔒', label: 'LOCKED DOOR', color: '#ff4757', bg: '#0a0508' },
      'deepfake': { icon: '🎭', label: 'PERFECT COPY', color: '#b48fff', bg: '#0a0810' },
      'home-network': { icon: '🏠', label: 'HOME FRONT', color: '#40ff8a', bg: '#0a1010' },
      'reporting': { icon: '🚨', label: 'FIRST NINE MINUTES', color: '#ff4757', bg: '#100508' }
    };
    const b = badges[moduleId] || { icon: '⚡', label: moduleTitle.toUpperCase(), color: '#00ff9f', bg: '#0a0d10' };

    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-${moduleId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${b.bg}"/>
          <stop offset="100%" stop-color="${b.bg}" stop-opacity="0.8"/>
        </linearGradient>
        <filter id="glow-${moduleId}"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <!-- Outer ring -->
      <polygon points="100,10 175,55 175,145 100,190 25,145 25,55"
        fill="url(#bg-${moduleId})" stroke="${b.color}" stroke-width="3"/>
      <!-- Inner ring -->
      <polygon points="100,25 160,60 160,140 100,175 40,140 40,60"
        fill="none" stroke="${b.color}" stroke-width="1" opacity="0.5"/>
      <!-- Center circle for icon -->
      <circle cx="100" cy="90" r="30" fill="${b.color}" opacity="0.1" stroke="${b.color}" stroke-width="1.5"/>
      <!-- Icon (emoji) -->
      <text x="100" y="102" text-anchor="middle" font-size="34" fill="${b.color}">${b.icon}</text>
      <!-- Label -->
      <text x="100" y="145" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700"
        fill="${b.color}" letter-spacing="1.5">${b.label}</text>
      <text x="100" y="160" text-anchor="middle" font-family="monospace" font-size="7"
        fill="${b.color}" opacity="0.7" letter-spacing="2">SHADOWPROOF</text>
      <!-- Corner marks -->
      <circle cx="100" cy="15" r="3" fill="${b.color}"/>
      <circle cx="100" cy="185" r="2" fill="${b.color}" opacity="0.6"/>
    </svg>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  window.ShadowproofAssessment = {
    passMark: passMark,
    init: function (config) {
      const profile = requireProfile();
      if (!profile) return;
      injectStyles();

      const container = document.getElementById(config.containerId || 'shadowproof-assessment');
      if (!container) { console.error('Assessment container not found'); return; }
      const bank = Array.isArray(config.questions) ? config.questions : [];
      if (!bank.length) { container.innerHTML = '<div class="sp-assessment">No questions are available for this module yet.</div>'; return; }

      const state = {
        moduleId: config.moduleId,
        moduleTitle: config.moduleTitle,
        questions: [],
        currentQ: 0,
        answers: [],
        score: 0,
        answered: false,
        onPass: config.onPass || function () {},
        onFail: config.onFail || function () {},
        started: false
      };
      let cooldownTimer = null;

      function n() { return Math.min(QUESTIONS_PER_ATTEMPT, bank.length); }

      function render() {
        clearInterval(cooldownTimer);
        if (!state.started) { container.innerHTML = renderIntro(); tickCooldown(); return; }
        if (state.currentQ >= state.questions.length) { renderResult(); return; }
        renderQuestion();
      }

      function tickCooldown() {
        const btn = container.querySelector('[data-sp-start]');
        if (!btn) return;
        const label = btn.dataset.label;
        function update() {
          const left = cooldownLeft(state.moduleId);
          btn.disabled = left > 0;
          btn.textContent = left > 0 ? `Review the module · retry in ${left}s` : label;
          if (!left) clearInterval(cooldownTimer);
        }
        update();
        cooldownTimer = setInterval(update, 1000);
      }

      function renderIntro() {
        const rec = read(PROGRESS_KEY, {})[state.moduleId] || {};
        const stats = rec.attempts ? `<div class="sp-stats">Attempts so far: ${rec.attempts} · Best score: ${rec.best || 0}/${rec.total || n()}${rec.completed ? ' · Badge earned ✓' : ''}</div>` : '';
        return `
          <div class="sp-assessment">
            <div class="sp-header">
              <div class="sp-title">Knowledge <span class="sp-title-italic">check.</span></div>
              <div class="sp-badge-preview">
                ${generateBadgeSVG(state.moduleId, state.moduleTitle).replace('<svg', '<svg style="width:34px;height:34px;opacity:0.6"')}
                Pass to earn badge + next lab code
              </div>
            </div>
            <div class="sp-intro-panel">
              <div class="sp-intro-icon">🎯</div>
              <div class="sp-intro-head">${n()} questions. <span class="sp-title-italic">${passMark(n())} to pass.</span></div>
              <ul class="sp-rules">
                <li>Questions are drawn at random from a larger bank, so every attempt is different.</li>
                <li>Answer order is shuffled every time. Read the options; don't rely on position.</li>
                <li>Several options may sound reasonable. Pick the <strong>best</strong> response.</li>
                <li>If you don't pass, you'll get a ${COOLDOWN_SECONDS}-second cooldown to review before retrying.</li>
              </ul>
              ${stats}
              <button class="sp-btn primary" data-sp-start data-label="Begin Assessment →" onclick="window.__spAssess.start()">Begin Assessment →</button>
            </div>
          </div>`;
      }

      function renderQuestion() {
        const q = state.questions[state.currentQ];
        state.answered = false;
        const dots = state.questions.map((_, i) => {
          let cls = '';
          if (i < state.currentQ) cls = state.answers[i] === state.questions[i].correct ? 'done' : 'wrong';
          else if (i === state.currentQ) cls = 'active';
          return `<div class="sp-progress-dot ${cls}"></div>`;
        }).join('');
        container.innerHTML = `
          <div class="sp-assessment" role="group" aria-label="Knowledge check">
            <div class="sp-header">
              <div class="sp-title">Knowledge <span class="sp-title-italic">check.</span></div>
              <div class="sp-badge-preview">${escapeHtml(state.moduleTitle.toUpperCase())}</div>
            </div>
            <div class="sp-progress-row" aria-hidden="true">${dots}</div>
            <div class="sp-q-meta"><span>Question ${state.currentQ + 1} of ${state.questions.length}</span><span>Need ${passMark(state.questions.length)} to pass</span></div>
            <div class="sp-q-text" id="spQText">${q.question}</div>
            <div class="sp-options" id="spOptions" role="list">
              ${q.options.map((opt, i) => `
                <button class="sp-option" data-idx="${i}" onclick="window.__spAssess.answer(${i})" aria-describedby="spQText">
                  <span class="sp-option-letter">${String.fromCharCode(65 + i)}</span>
                  <span>${opt}</span>
                </button>`).join('')}
            </div>
            <div class="sp-explanation" id="spExplanation" aria-live="polite"></div>
            <div class="sp-hint">Tip: press <kbd>A</kbd>–<kbd>${String.fromCharCode(64 + q.options.length)}</kbd> to answer, <kbd>Enter</kbd> to continue.</div>
          </div>`;
        const first = container.querySelector('.sp-option');
        if (first) first.focus({ preventScroll: true });
      }

      function renderResult() {
        const total = state.questions.length;
        const passed = state.score >= passMark(total);
        let badge = null;
        if (passed) badge = saveBadge(state.moduleId, state.moduleTitle, state.score, total);
        recordAttempt(state.moduleId, passed, state.score, total, badge);
        if (!passed) startCooldown(state.moduleId);

        let intel = '';
        if (passed && window.SPAccess) {
          const r = window.SPAccess.revealNext(state.moduleId);
          if (r) {
            intel = `
              <div class="sp-intel">
                <div class="sp-intel-label">🔓 Intel recovered</div>
                <div class="sp-intel-for">Access code for <strong>Module ${r.module.num} · ${escapeHtml(r.module.title)}</strong>. It has been saved to your Intel Vault on the dashboard.</div>
                <div class="sp-intel-code" id="spIntelCode">${escapeHtml(r.code)}</div>
                <div class="sp-intel-actions">
                  <button class="sp-btn" onclick="window.__spAssess.copyCode()">Copy code</button>
                  <button class="sp-btn primary" onclick="window.__spAssess.useCode()">Unlock &amp; open Module ${r.module.num} →</button>
                </div>
              </div>`;
          } else {
            intel = `<div class="sp-intel"><div class="sp-intel-label">🏁 Final lab cleared</div><div class="sp-intel-for">This was the last lab in the suite. Check your badge case on the dashboard.</div></div>`;
          }
        }

        const missed = state.questions.map((q, i) => ({ q, i })).filter(x => state.answers[x.i] !== x.q.correct);
        const review = !passed && missed.length ? `
          <div class="sp-review">
            ${missed.map(x => `<div class="sp-review-item"><b>${x.q.question}</b><br>${x.q.explanation}</div>`).join('')}
          </div>` : '';

        container.innerHTML = `
          <div class="sp-assessment">
            <div class="sp-result">
              <div class="sp-result-score ${passed ? 'pass' : 'fail'}">${state.score}<span class="of">/${total}</span></div>
              <div class="sp-result-title">${passed ? '<span class="italic">Passed.</span>' : 'Not quite yet.'}</div>
              <div class="sp-result-sub">
                ${passed
                  ? 'You showed the key patterns for this module. Your badge has been saved to your profile.'
                  : `You need ${passMark(total)} of ${total} to pass. Review what you missed below, and revisit the module. Your next attempt will draw different questions.`}
              </div>
              ${passed ? `<div class="sp-badge-earned">${generateBadgeSVG(state.moduleId, state.moduleTitle)}<div class="sp-badge-id">BADGE ID: ${badge ? badge.badgeId : '—'}</div></div>` : ''}
              ${intel}
              ${review}
              <div class="sp-result-actions">
                ${passed
                  ? `<a href="index.html" class="sp-btn primary">Return to Dashboard →</a>
                     <button class="sp-btn" onclick="window.__spAssess.reset()">Retake for Practice</button>`
                  : `<button class="sp-btn primary" data-sp-start data-label="Try Again →" onclick="window.__spAssess.reset()">Try Again →</button>
                     <a href="index.html" class="sp-btn">Back to Dashboard</a>`}
              </div>
            </div>
          </div>`;
        if (!passed) tickCooldown();
        if (passed) state.onPass(badge); else state.onFail(state.score);
      }

      function begin() {
        if (cooldownLeft(state.moduleId) > 0) return;
        state.started = true;
        state.questions = buildAttempt(bank);
        state.currentQ = 0;
        state.answers = [];
        state.score = 0;
        render();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      window.__spAssess = {
        start: begin,
        reset: begin,
        answer: function (idx) {
          if (state.answered || !state.started || state.currentQ >= state.questions.length) return;
          const q = state.questions[state.currentQ];
          if (idx < 0 || idx >= q.options.length) return;
          state.answered = true;
          state.answers[state.currentQ] = idx;
          const correct = idx === q.correct;
          if (correct) state.score++;
          container.querySelectorAll('.sp-option').forEach((el, i) => {
            el.disabled = true;
            if (i === q.correct) el.classList.add('correct');
            if (i === idx && !correct) el.classList.add('wrong');
          });
          const exp = document.getElementById('spExplanation');
          const last = state.currentQ === state.questions.length - 1;
          exp.innerHTML = `
            <strong style="color:${correct ? '#19c37d' : '#ff4757'};">${correct ? '✓ Correct.' : '✗ Not quite.'}</strong>
            ${q.explanation}
            <div><button class="sp-btn primary sp-next-btn" id="spNext" onclick="window.__spAssess.next()">${last ? 'See Results →' : 'Next Question →'}</button></div>`;
          exp.classList.add('show');
          if (!correct) exp.classList.add('wrong');
          const nb = document.getElementById('spNext');
          if (nb) nb.focus({ preventScroll: true });
        },
        next: function () {
          if (!state.answered) return;
          state.currentQ++;
          render();
        },
        copyCode: function () {
          const el = document.getElementById('spIntelCode');
          if (!el) return;
          const txt = el.textContent.trim();
          const done = () => { const b = container.querySelector('.sp-intel-actions .sp-btn'); if (b) b.textContent = 'Copied ✓'; };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done();
        },
        useCode: function () {
          const el = document.getElementById('spIntelCode');
          if (!el || !window.SPAccess) return;
          const res = window.SPAccess.redeem(el.textContent.trim());
          if (res.ok && res.ids.length === 1) {
            const m = window.SPAccess.find(res.ids[0]);
            if (m) window.location.href = m.file;
          }
        }
      };

      if (!window.__spKeysBound) {
        window.__spKeysBound = true;
        document.addEventListener('keydown', function (e) {
          if (!window.__spAssess || e.ctrlKey || e.metaKey || e.altKey) return;
          const tag = (e.target && e.target.tagName) || '';
          if (tag === 'INPUT' || tag === 'TEXTAREA') return;
          const opts = document.getElementById('spOptions');
          if (!opts || opts.offsetParent === null) return;
          const k = e.key.toUpperCase();
          if (/^[A-F]$/.test(k)) { window.__spAssess.answer(k.charCodeAt(0) - 65); e.preventDefault(); }
          else if (/^[1-6]$/.test(k)) { window.__spAssess.answer(parseInt(k, 10) - 1); e.preventDefault(); }
          else if (e.key === 'Enter' && document.getElementById('spNext') && document.activeElement !== document.getElementById('spNext')) { window.__spAssess.next(); e.preventDefault(); }
        });
      }

      render();
    }
  };
})();
