# SHADOWPROOF — Adversarial Security Awareness Training Suite

A static, browser-only security-awareness training prototype: 16 short interactive modules. Each one ends in a 4-question knowledge check that awards a badge. Progress and badges are stored in the browser's `localStorage`.

## Running it

There's no build step. You can open `signin.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000/signin.html
```

## Modules

| # | Module | File | Tier |
|---|--------|------|------|
| 01 | Ghost Session — AiTM Phishing | `01-aitm.html` | Email & Messaging |
| 02 | The CEO Text — Business Email Compromise | `02-bec.html` | Email & Messaging |
| 03 | Silent Signal — Smishing | `03-smishing.html` | Email & Messaging |
| 04 | The Painted Door — Quishing | `04-quishing.html` | Email & Messaging |
| 05 | The Locked Door — Ransomware & Attachments | `13-ransomware.html` | Email & Messaging |
| 06 | The Voice on the Line — Vishing | `05-vishing.html` | Identity & Access |
| 07 | Endless Knocking — MFA Fatigue | `06-mfa-fatigue.html` | Identity & Access |
| 08 | The Handed Key — OAuth Consent Phishing | `07-oauth.html` | Identity & Access |
| 09 | The Master Key — Password Hygiene | `08-passwords.html` | Identity & Access |
| 10 | The Perfect Copy — Deepfakes | `14-deepfake.html` | Identity & Access |
| 11 | The Gift Nobody Sent — USB Drops | `09-usb.html` | Physical & Environmental |
| 12 | The Open Window — Public Wi-Fi & Travel | `10-wifi.html` | Physical & Environmental |
| 13 | Held Door — Social Engineering & Tailgating | `11-social-eng.html` | Physical & Environmental |
| 14 | The Home Front — Home Network | `15-home-network.html` | Physical & Environmental |
| 15 | The Careless Hand — Insider Threat & Data Handling | `12-insider.html` | Human & Operational |
| 16 | The First Nine Minutes — When & How to Report | `16-reporting.html` | Human & Operational |

The file numbers don't match the module numbers, because the order of the curriculum changed after the files were named. `index.html` is the source of truth for the order.

## Architecture

- `signin.html`: creates a local profile in `localStorage`.
- `index.html`: the dashboard. It holds the module catalog, progress, and badge case.
- `assessment.js`: the shared knowledge-check engine (v2). Each attempt draws **6 random questions** from the module's bank of 8, **shuffles the answer order**, and needs **5 of 6 (80%)** to pass. A failed attempt starts a **30-second cooldown** and shows a review of the missed questions. It records attempts and best score, saves badges, and on a pass reveals the next lab's access code. You can answer with keys A–D and continue with Enter.
- `questions.js`: one question bank per module, keyed by module id. Each bank has the 4 original questions plus 4 harder, scenario-based "advanced tier" questions, merged at the bottom of the file.
- `labs-access.js`: access-code gating. Module 01 is open, and every other lab needs an access code. Learners get a code by passing the previous lab (it's also saved to the **Intel Vault** on the dashboard), or an instructor can hand out any lab's code or the master code. Each lab page calls `SPAccess.guard(id)`, which sends a locked lab back to the dashboard's unlock dialog. Codes are stored obfuscated, not encrypted. See the file header for how to change them.
- `suite.css`: focus outlines, reduced motion, and accessible tooltips for the hand-built modules (01–04, 06).
- `module-kit.css` / `module-kit.js`: the shared layout and interaction kit used by modules 05 and 07–16. It provides:
  - scene navigation through `data-go="N"`
  - scenario choices (`.choice[data-verdict]`)
  - spot-the-red-flag zones (`.flag-zone .flag`)
  - triage/sorting exercises (`.tri[data-answer]`)
  - click-to-reveal cards (`.reveal`)
  - the knowledge-check reveal (`#startCheckBtn`)

  Each module sets its own `--accent` colour.
- Modules 01–04 and 06 are bespoke, self-contained pages.

### Adding a new module
1. Copy any kit-based module (e.g. `16-reporting.html`) and change the content and `--accent`.
2. Add a 4-question bank to `questions.js` under the module id.
3. Add the module to the `modules` array in `index.html` with `built:true`.
4. Add a badge style in `assessment.js` and in `badgeSVG()` in `index.html`.

## Audit notes and recommended next steps

What's solid: the assessment engine is cleanly shared, the content is accurate and practical, and the visual design is strong and consistent.

Known limitations of the prototype:

1. **Client-side only.** Profiles, progress, badges, and unlocks live in `localStorage`, so they are per-browser. They can be edited from DevTools, and clearing site data wipes them. Completion records can't be trusted for compliance until there's a backend with SSO, which is already planned in `roadmap-2027.html`.
2. **Access codes are a learning mechanic, not security.** The codes are obfuscated in `labs-access.js`, and anyone reading the source can recover them. Real per-user gating needs a server that issues and checks codes.
3. **Quiz difficulty.** Randomised draws, shuffled options, and an 80% pass mark make the checks much harder to game. A remaining tell: correct answers are often the longest option. Future work: rewrite distractors to similar lengths and grow banks to 10+ questions.
4. **Duplicated badge config.** Badge colours/icons are defined in both `index.html` and `assessment.js`. Move them into one shared file.
5. **Accessibility.** Contrast, focus outlines, reduced motion, keyboard navigation, and the vishing tooltips are now addressed. A full WCAG 2.1 AA audit is still on the roadmap.
7. **External fonts.** The pages load Google Fonts. In a locked-down corporate network, self-host them.
8. **Reporting channels are generic.** Modules say "report to IT/Security". Add the organisation's real hotline, Report Phishing button name, and portal link to make them actionable.
