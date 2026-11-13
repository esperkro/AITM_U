/**
 * SHADOWPROOF — Question Banks
 * One array per module. Consumed by assessment.js via:
 *   ShadowproofAssessment.init({ moduleId, moduleTitle, questions: SHADOWPROOF_QUESTIONS.aitm, ... })
 * Question shape: { question, options[], correct (index), explanation }
 */
window.SHADOWPROOF_QUESTIONS = {

  aitm: [
    {
      question: 'What makes an AiTM (Adversary-in-the-Middle) attack especially dangerous?',
      options: [
        'It guesses your password through brute force',
        'It steals your active session even when MFA is enabled',
        'It only works against people with weak passwords',
        'It physically damages your device'
      ],
      correct: 1,
      explanation: 'AiTM proxies the real login in real time and captures your session cookie after you pass MFA — so multi-factor alone does not stop it.'
    },
    {
      question: 'You get an email with a link to "review a shared document." What is the safest habit?',
      options: [
        'Click it if the sender name looks familiar',
        'Hover the link, and click if it looks close enough',
        'Never reach a login page from an emailed link — open a new tab and type the address or use a bookmark',
        'Reply and ask the sender if it is legitimate'
      ],
      correct: 2,
      explanation: 'The strongest defense is to never authenticate through a link you were sent. Navigate to the site yourself so a proxy page never gets your credentials.'
    },
    {
      question: 'Which detail exposes the sender "no-reply@rnicrosoft-secure.com"?',
      options: [
        'The word "secure" proves it is safe',
        '"rn" is used to imitate the letter "m" — it is not microsoft.com',
        '"no-reply" means it is automated and trustworthy',
        'Nothing — it is a normal Microsoft domain'
      ],
      correct: 1,
      explanation: '"rn" placed together mimics "m" at a glance. The real domain is microsoft.com. Lookalike domains are a core phishing tell.'
    },
    {
      question: 'The email warns the document "expires in 24 hours or data will be lost." This is:',
      options: [
        'A helpful courtesy reminder',
        'Manufactured urgency designed to rush your judgment',
        'Standard Microsoft policy',
        'A sign the message is genuine'
      ],
      correct: 1,
      explanation: 'Artificial time pressure is engineered to make you act before you think. Feeling rushed by a message is exactly when to slow down.'
    }
  ],

  bec: [
    {
      question: 'A text from an unknown number says: "It\'s David, your CEO — new phone. Need a quick favor." The best first move is to:',
      options: [
        'Reply and ask what he needs',
        'Verify through a known channel (Teams, Slack, or his known desk line) before doing anything',
        'Buy the gift cards to be safe',
        'Delete it and tell no one'
      ],
      correct: 1,
      explanation: 'Verifying through a channel you already trust is the single most effective defense against BEC. The "new phone" line is the most common opener.'
    },
    {
      question: 'Which request pattern should be treated as hostile until proven otherwise?',
      options: [
        'A request to join a meeting',
        'A request involving gift cards, wire transfers, or changed banking details',
        'A request to review a shared calendar',
        'A request to update your email signature'
      ],
      correct: 1,
      explanation: 'Gift cards, wires, crypto, and banking-detail changes are the money-movement patterns at the heart of BEC. They warrant out-of-band verification every time.'
    },
    {
      question: 'A vendor emails from "acme-corp.net" asking to update their bank details — but your records show acme-corp.com. You should:',
      options: [
        'Update it since the invoice number matches',
        'Call the vendor on a number you already have on file to confirm',
        'Reply to the email asking if they are sure',
        'Update it, but only for small amounts'
      ],
      correct: 1,
      explanation: 'The .net vs .com swap is a lookalike domain. Any banking change must be confirmed by calling a number you already trust — never one from the email.'
    },
    {
      question: '"Keep this between us for now" in a payment message is a red flag because:',
      options: [
        'It signals the request is confidential and important',
        'Isolation is a tactic — real executives don\'t ask you to hide business transactions',
        'It means a reward is coming',
        'It is a normal part of finance work'
      ],
      correct: 1,
      explanation: 'Secrecy requests exist to stop you from verifying with someone who might catch the scam. Legitimate business does not need to be hidden.'
    }
  ],

  smishing: [
    {
      question: 'A text claims to be USPS about a "held package," linking to usps-parcelupdate.co/verify. The clearest red flag is:',
      options: [
        'USPS never sends any texts',
        'The domain is not usps.com — it is a lookalike using a .co suffix',
        'Packages are never actually held',
        'The message is too short'
      ],
      correct: 1,
      explanation: 'Real USPS uses usps.com. Lookalike domains with odd suffixes (.co, -secure, extra words) are the hallmark of smishing.'
    },
    {
      question: 'Which agency will legitimately text you demanding immediate payment to avoid arrest?',
      options: ['The IRS', 'The SSA', 'The DMV', 'None — agencies do not text arrest threats'],
      correct: 3,
      explanation: 'The IRS, SSA, and DMV do not text threats or arrest warnings. Authority-based urgency about arrest or warrants is always a scam.'
    },
    {
      question: 'The best way to report a smishing text and help block the sender is to:',
      options: [
        'Reply "STOP"',
        'Forward it to 7726 (SPAM), then delete and block',
        'Click the link to see where it leads',
        'Call the number back'
      ],
      correct: 1,
      explanation: 'Forwarding to 7726 lets your carrier block the sender network-wide. Replying "STOP" only confirms your number is active.'
    },
    {
      question: 'A text feels professional, has no link, and references your real appointment. This is:',
      options: [
        'Definitely a scam — every text is',
        'Possibly legitimate — but still verify before sharing anything sensitive',
        'Safe to reply to with your password',
        'A reason to send personal details'
      ],
      correct: 1,
      explanation: 'Not every text is a scam; legit messages feel unremarkable. The rule holds: never share sensitive info by text, and verify anything that asks for it.'
    }
  ],

  quishing: [
    {
      question: 'The single most important habit when scanning any QR code is to:',
      options: [
        'Scan it quickly before it expires',
        'Read the URL preview your phone shows before you tap to open it',
        'Trust it if a company logo is next to it',
        'Only scan codes printed in color'
      ],
      correct: 1,
      explanation: 'Every modern phone shows a URL preview after scanning. Reading it before you tap is the whole defense — two seconds that catch most malicious codes.'
    },
    {
      question: 'A QR code on a parking meter looks like a sticker placed over another sticker. You should:',
      options: [
        'Scan it — stickers are normal',
        'Treat it as hostile; attackers paste fake QR stickers over real ones',
        'Peel it and immediately scan what is underneath',
        'Scan it but enter only a small payment'
      ],
      correct: 1,
      explanation: 'Layered or fresh-looking stickers on public codes are a top quishing tactic. If it looks added-on, do not scan it.'
    },
    {
      question: 'An email from "IT" has a QR code to scan to "re-enroll your MFA." The right move is:',
      options: [
        'Scan it with your phone right away',
        'Do not scan; use the real system on your computer or contact IT directly',
        'Forward it to your team so they can scan it too',
        'Scan it only if your name appears in it'
      ],
      correct: 1,
      explanation: 'QR codes in email exist to move you off your monitored computer onto your phone. Real MFA changes happen through official channels, not an emailed code.'
    },
    {
      question: 'A scanned QR code opens a page that looks like a Microsoft sign-in. You should:',
      options: [
        'Enter your credentials — it looks official',
        'Close it; open the app or type the URL yourself — logins should not come from scanning a square',
        'Enter a fake password to test it',
        'Screenshot it and sign in later'
      ],
      correct: 1,
      explanation: 'A QR leading to a login page is almost always a credential harvester. Real sign-ins happen through your own browser or app.'
    }
  ],

  vishing: [
    {
      question: 'The most reliable defense against a suspicious "support" call is to:',
      options: [
        'Ask the caller to prove their identity over the phone',
        'Hang up and call back on the official number you look up yourself',
        'Stay on the line and cooperate to be polite',
        'Give partial info to test them'
      ],
      correct: 1,
      explanation: 'Hanging up and calling the real number yourself defeats nearly every vishing call. A scammer\'s callback path won\'t reach the real organization.'
    },
    {
      question: 'A caller claiming to be "Microsoft security" asks you to read back the 6-digit code just texted to you. You should:',
      options: [
        'Read it — they need it to secure your account',
        'Never share it; a code read aloud lets them log in as you',
        'Read only the first three digits',
        'Ask them to text you first'
      ],
      correct: 1,
      explanation: 'MFA codes are never shared aloud with anyone. If someone asks you to read a code, they are attacking your account — every time.'
    },
    {
      question: 'A caller already knows your name, title, and department. This means:',
      options: [
        'They must be legitimate — only real staff would know that',
        'Nothing about legitimacy; that info is easily found on LinkedIn, company sites, or breaches',
        'You can safely share your password',
        'They must work in your building'
      ],
      correct: 1,
      explanation: 'Familiarity is not authentication. Personal details are trivially available and are used to manufacture false trust.'
    },
    {
      question: 'Your "CEO" leaves a voicemail urgently asking you to move money — and the voice sounds exactly right. You should:',
      options: [
        'Act immediately because it sounds like them',
        'Verify on a separate known channel or ask something only the real person would know — voice cloning is real',
        'Reply to the voicemail with a transfer confirmation',
        'Forward the voicemail to accounting to handle'
      ],
      correct: 1,
      explanation: 'AI voice cloning needs only seconds of audio. Trust the verified identity, not the sound — confirm through a channel you already trust.'
    }
  ],

  ransomware: [
    {
      question: 'A Word document from an unexpected invoice email says "Enable Content to view this document." You should:',
      options: [
        'Enable it — older documents need this to display',
        'Not enable it; close the file and report the email',
        'Enable it, then run a virus scan afterwards',
        'Forward it to a colleague to see if it works for them'
      ],
      correct: 1,
      explanation: 'No legitimate invoice needs macros to be read. "Enable Content" runs the attacker\'s code with your permissions. Close it and report.'
    },
    {
      question: 'Which attachment name is the biggest red flag?',
      options: [
        'Meeting_Notes.pdf from a colleague after a meeting you attended',
        'Q3_Budget.xlsx from your manager, which you requested',
        'Payment_Receipt.pdf.exe from an unknown sender',
        'Team_Photo.jpg from HR about the company picnic'
      ],
      correct: 2,
      explanation: 'A double extension hides a program (.exe) behind a fake ".pdf". Turn on "show file extensions" so tricks like this are visible.'
    },
    {
      question: 'Why do attackers send password-protected ZIP files with the password in the email body?',
      options: [
        'To keep your data private',
        'Because the file is too big to send otherwise',
        'Encryption stops email security tools from scanning what\'s inside',
        'It is a legal requirement for invoices'
      ],
      correct: 2,
      explanation: 'The password protects nothing from you — it only blinds the scanners that would have caught the malware.'
    },
    {
      question: 'You opened a suspicious attachment and think something may have run. What is the best first step?',
      options: [
        'Report it to IT/Security immediately and follow their instructions',
        'Delete the file and empty the recycle bin so it can\'t spread',
        'Shut down the computer and wait until Monday',
        'Say nothing unless your files start disappearing'
      ],
      correct: 0,
      explanation: 'Speed matters. Ransomware crews often spend days preparing before encrypting. An early report can stop the chain; deleting evidence or waiting helps the attacker.'
    }
  ],

  'mfa-fatigue': [
    {
      question: 'You get an MFA approval prompt on your phone, but you aren\'t signing in to anything. This means:',
      options: [
        'It\'s a harmless glitch',
        'Someone likely has your password and is trying to sign in',
        'IT is running a routine test',
        'Your phone needs an update'
      ],
      correct: 1,
      explanation: 'A prompt appears only after a correct password is entered. An unexpected prompt is strong evidence your password is compromised.'
    },
    {
      question: 'After a dozen prompts, a message from "IT Support" says to approve the next one to stop them. You should:',
      options: [
        'Approve it — IT asked you to',
        'Approve it, then change your password',
        'Deny it, and report the prompts and the message to Security',
        'Reply asking them to call you first'
      ],
      correct: 2,
      explanation: 'Real IT never asks you to approve a prompt you didn\'t start. That message is part of the attack.'
    },
    {
      question: 'With number-matching MFA, your phone asks you to enter a number but you didn\'t start a sign-in. What does that tell you?',
      options: [
        'Nothing — enter any number to dismiss it',
        'You have no sign-in screen showing a number, so the request isn\'t yours: deny and report',
        'Call the help desk and ask them which number to enter',
        'Enter 00 to cancel'
      ],
      correct: 1,
      explanation: 'Only the person signing in sees the number. If you have no screen and no number, someone else is signing in as you.'
    },
    {
      question: 'You denied every unexpected prompt. What else should you do?',
      options: [
        'Nothing — denying was enough',
        'Turn off MFA so it stops bothering you',
        'Report it and change your password from a trusted device',
        'Silence your phone overnight'
      ],
      correct: 2,
      explanation: 'The attacker still has your password. Reporting lets Security block them, and a new password makes the stolen one useless.'
    }
  ],

  oauth: [
    {
      question: 'What makes OAuth consent phishing different from regular credential phishing?',
      options: [
        'It uses a fake login page to steal your password',
        'You grant a malicious app access on the real sign-in page — no password is stolen',
        'It only works on personal email accounts',
        'It requires physical access to your device'
      ],
      correct: 1,
      explanation: 'The attacker never needs your password. You complete the genuine sign-in and MFA, then click Accept and hand their app a token.'
    },
    {
      question: '"PDF Viewer" asks for "Read and write access to your mail" and "Maintain access to data". The best response is:',
      options: [
        'Accept, because it\'s on a real Microsoft page',
        'Accept, then change your password later to be safe',
        'Cancel — the permissions are far bigger than viewing a PDF — and report it',
        'Accept only if the logo looks professional'
      ],
      correct: 2,
      explanation: 'Permissions must fit the task. A viewer has no reason to read or send your mail or keep permanent access.'
    },
    {
      question: 'You accidentally granted a suspicious app access. Will changing your password remove its access?',
      options: [
        'Yes, a password change revokes everything',
        'No — the app keeps its token until it is revoked, so report it immediately',
        'Yes, but only after 24 hours',
        'Only if you also restart your computer'
      ],
      correct: 1,
      explanation: 'OAuth tokens are separate from your password. Only revoking the app\'s consent (Security can do this) stops it.'
    },
    {
      question: 'Which consent request is most likely legitimate?',
      options: [
        'An unverified "HR Portal" from an urgent email asking for all your files',
        'A browser game asking to read your work mail and contacts',
        'An IT-approved scheduling tool from the company app catalog asking to read your calendar',
        'An unknown app asking to send mail as you'
      ],
      correct: 2,
      explanation: 'Approved by IT, verified publisher, and permissions that match the job — that\'s what normal consent looks like.'
    }
  ],

  passwords: [
    {
      question: 'Why is reusing the same password across sites so dangerous?',
      options: [
        'Websites can see each other\'s passwords',
        'A breach of any one site exposes every account using that password (credential stuffing)',
        'Reused passwords expire faster',
        'It isn\'t dangerous if the password is complex'
      ],
      correct: 1,
      explanation: 'Attackers automatically try leaked username/password pairs everywhere. One breach becomes many.'
    },
    {
      question: 'Which password is strongest?',
      options: [
        'P@ssw0rd2026!',
        'Summer2026!',
        'lantern-orbit-thistle-copper-meadow',
        'Qw3rty!'
      ],
      correct: 2,
      explanation: 'Length and randomness beat symbol swaps. A multi-word random passphrase is long and hard to guess; the others follow patterns cracking tools try first.'
    },
    {
      question: 'What is the best way to have a unique strong password for every account?',
      options: [
        'Write them in a spreadsheet on your desktop',
        'Use one strong password with a different number at the end for each site',
        'Use a password manager (your company-approved one for work)',
        'Save them in a notes app'
      ],
      correct: 2,
      explanation: 'A password manager generates and stores unique passwords and won\'t auto-fill on look-alike phishing sites.'
    },
    {
      question: 'Someone from "IT" asks for your password to fix your account. You should:',
      options: [
        'Give it — IT needs it to help',
        'Refuse; legitimate IT never needs your password — report the request',
        'Give it, then change it right after',
        'Give only the first half'
      ],
      correct: 1,
      explanation: 'Nobody legitimate needs your password. Requests for it are a reliable sign of an attack.'
    }
  ],

  deepfake: [
    {
      question: 'On a video call, your "CFO" urgently asks for a large wire to a new account. The video looks and sounds right. You should:',
      options: [
        'Proceed — you can see it\'s them',
        'Ask a personal question on the call and proceed if they answer',
        'Verify through a separate known channel (e.g., call their directory number) and follow normal payment approvals',
        'Proceed but send only half'
      ],
      correct: 2,
      explanation: 'Seeing and hearing are no longer proof of identity. Out-of-band verification and standard payment controls defeat deepfakes.'
    },
    {
      question: 'Which is the most reliable sign of an AI impersonation attempt?',
      options: [
        'Slight video glitches',
        'Behaviour: urgency, secrecy, unusual requests, and resistance to verification',
        'A strong accent',
        'Poor audio quality'
      ],
      correct: 1,
      explanation: 'Technical glitches are disappearing as tools improve. The request pattern — urgency, secrecy, skipping process — stays the same.'
    },
    {
      question: '"Don\'t tell anyone about this deal, not even your manager." What does this instruction usually indicate?',
      options: [
        'A normal confidentiality requirement',
        'An attempt to isolate you from the person who would expose the fraud',
        'That you\'ve been promoted',
        'That legal is involved'
      ],
      correct: 1,
      explanation: 'Real confidential deals still follow controls and involve your management chain. Secrecy that isolates you is a red flag.'
    },
    {
      question: 'How much audio does a criminal typically need to clone a voice convincingly?',
      options: [
        'Hours of studio recordings',
        'Only a few seconds to a minute — e.g. from a webinar, social video, or voicemail',
        'It\'s impossible without the person\'s cooperation',
        'At least a full day of phone calls'
      ],
      correct: 1,
      explanation: 'Modern voice cloning needs very little audio, so a familiar voice alone is never verification.'
    }
  ],

  usb: [
    {
      question: 'You find a USB drive labeled "Payroll – Confidential" in the parking lot. You should:',
      options: [
        'Plug it into your work computer to find the owner',
        'Plug it into your home computer instead',
        'Give it to IT/Security without plugging it in anywhere',
        'Throw it in the trash'
      ],
      correct: 2,
      explanation: 'Dropped drives are a known attack, and tempting labels are the bait. Security can examine it safely and warn others.'
    },
    {
      question: 'Why can a malicious USB device be dangerous even if you never open a file on it?',
      options: [
        'It can\'t — you must open a file',
        'Some devices pretend to be a keyboard and type commands automatically when plugged in',
        'USB drives only spread viruses in the summer',
        'It only drains the battery'
      ],
      correct: 1,
      explanation: 'Devices that act as a keyboard can type and run commands in seconds. Plugging in is enough.'
    },
    {
      question: 'Your phone is nearly dead at the airport. The safest way to charge is:',
      options: [
        'Use a free cable from a vendor stall',
        'Use your own charger in a wall outlet, or your own power bank',
        'Plug into any public USB port and tap "Trust this computer"',
        'Borrow a stranger\'s laptop'
      ],
      correct: 1,
      explanation: 'Public ports and unknown cables can carry data, not just power. Your own charger and power bank avoid that risk.'
    },
    {
      question: 'You notice a small unknown adapter between a meeting-room keyboard and the PC. What do you do?',
      options: [
        'Remove it and throw it away',
        'Ignore it — probably IT equipment',
        'Leave it in place and report it to Security',
        'Take it home to investigate'
      ],
      correct: 2,
      explanation: 'It could be a keylogger. Report it without touching it so Security can investigate and preserve evidence.'
    }
  ],

  wifi: [
    {
      question: 'At the airport you see "Airport_Free_WiFi" with a strong signal. What\'s the risk?',
      options: [
        'None — public networks are always run by the venue',
        'Anyone can create a network with that name (an "evil twin") and sit in the middle of your traffic',
        'It will only be slow',
        'It might use too much battery'
      ],
      correct: 1,
      explanation: 'Network names prove nothing. A fake hotspot can redirect you to phishing pages or push malicious downloads.'
    },
    {
      question: 'What is the best way to work securely on public Wi-Fi?',
      options: [
        'Only visit websites you know',
        'Connect the company VPN before accessing anything work-related, or use your own phone hotspot',
        'Use incognito mode',
        'Turn the screen brightness down'
      ],
      correct: 1,
      explanation: 'A VPN encrypts your traffic past anyone on the local network; your own hotspot avoids the shared network entirely.'
    },
    {
      question: 'A hotel Wi-Fi page says you must install a "security certificate" to continue. You should:',
      options: [
        'Install it — it\'s required by the hotel',
        'Decline, disconnect, and use a trusted connection instead',
        'Install it, then remove it after your stay',
        'Ask the front desk for the password, then install it'
      ],
      correct: 1,
      explanation: 'Installing certificates or profiles from a network can let its operator read your encrypted traffic. Legitimate hotel Wi-Fi never needs this.'
    },
    {
      question: 'You step away from your laptop in a café. What should you do?',
      options: [
        'Ask a friendly stranger to watch it',
        'Leave it — you\'ll only be a minute',
        'Lock the screen and take it with you',
        'Close the lid but leave it on the table'
      ],
      correct: 2,
      explanation: 'Theft and quick tampering take seconds. Lock it and keep it with you while travelling.'
    }
  ],

  'social-eng': [
    {
      question: 'Someone carrying boxes asks you to hold the secure door behind you. The best response is:',
      options: [
        'Hold it — they\'re clearly a delivery person',
        'Politely direct them to reception, where deliveries are handled',
        'Ignore them and walk faster',
        'Let them in but follow them'
      ],
      correct: 1,
      explanation: 'Full hands and uniforms are classic tailgating props. Pointing people to the process is helpful and secure.'
    },
    {
      question: 'A confident contractor in a hi-vis vest asks to be shown to the network room. You should:',
      options: [
        'Escort them — they know what they\'re doing',
        'Check their badge and let them in',
        'Verify the visit by calling Facilities on the directory number, and ensure they are escorted',
        'Give them the door code to save time'
      ],
      correct: 2,
      explanation: 'Confidence and badges can be faked. Verify through a channel you trust; visitors are always escorted.'
    },
    {
      question: 'Which psychological lever is an attacker using when they say "My badge isn\'t working, it\'s my first week"?',
      options: [
        'Fear',
        'Helpfulness and empathy',
        'Greed',
        'Curiosity'
      ],
      correct: 1,
      explanation: 'They\'re relying on your kindness and your memory of being new. Reception can help a real new hire in minutes.'
    },
    {
      question: 'A stranger with a clipboard asks for your username and laptop asset tag for an "audit". Why does this matter?',
      options: [
        'It doesn\'t — it\'s not a password',
        'Small details help attackers build convincing follow-up attacks; verify the request before sharing',
        'Asset tags are public information',
        'Only managers need to worry about audits'
      ],
      correct: 1,
      explanation: 'Reconnaissance comes before the real attack. Confirm audits with IT or your manager before answering.'
    }
  ],

  'home-network': [
    {
      question: 'Which home router change gives the biggest security improvement?',
      options: [
        'Changing the network name to something funny',
        'Changing the default admin password and keeping firmware updated',
        'Moving the router to a different room',
        'Turning the router off at night'
      ],
      correct: 1,
      explanation: 'Default credentials are published online and old firmware has known exploits. Fix those first.'
    },
    {
      question: 'Why put smart TVs, cameras, and visitors on a separate guest network?',
      options: [
        'It makes the Wi-Fi faster',
        'If one of those devices is compromised, it can\'t easily reach your work laptop',
        'Smart devices don\'t work on the main network',
        'It\'s required by law'
      ],
      correct: 1,
      explanation: 'Segmentation limits the blast radius. Rarely updated gadgets are common entry points.'
    },
    {
      question: 'Your child asks to borrow your work laptop for homework. You should:',
      options: [
        'Allow it with a separate browser profile',
        'Allow it for one hour only',
        'Say no — work devices are for work and only for you',
        'Allow it if they promise not to install anything'
      ],
      correct: 2,
      explanation: 'Company devices are for the employee only. Shared use risks malware and exposes company data.'
    },
    {
      question: 'Which Wi-Fi security setting should your home router use?',
      options: [
        'Open (no password) so guests can connect',
        'WEP',
        'WPA3, or WPA2-AES if WPA3 isn\'t available, with a long passphrase',
        'WPS PIN only'
      ],
      correct: 2,
      explanation: 'WPA3/WPA2-AES with a strong passphrase is the modern standard. WEP and WPS PIN are known to be weak.'
    }
  ],

  insider: [
    {
      question: 'What causes most insider-related data leaks?',
      options: [
        'Spies placed by competitors',
        'Honest mistakes — wrong recipients, oversharing, unapproved tools',
        'Hackers breaking into the building',
        'Old printers'
      ],
      correct: 1,
      explanation: 'Malicious insiders exist, but accidents — misdirected emails, personal drives, oversharing — are far more common.'
    },
    {
      question: 'You realise you emailed a member list to the wrong external address. What should you do?',
      options: [
        'Stay quiet — it\'s probably fine',
        'Report it to your manager and Security/Privacy immediately with the details',
        'Try to recall it and tell no one',
        'Delete your sent copy'
      ],
      correct: 1,
      explanation: 'Fast, honest reporting lets the privacy team contain it and meet any legal deadlines.'
    },
    {
      question: 'Is it OK to paste a customer complaint containing their account number into a free public AI chatbot?',
      options: [
        'Yes, AI tools are private',
        'Yes, if you delete the chat afterwards',
        'No — use only company-approved AI tools, and remove personal data unless the tool is approved for it',
        'Yes, if it saves time'
      ],
      correct: 2,
      explanation: 'Public AI services may store or learn from what you paste. Company and customer data stays in approved tools.'
    },
    {
      question: 'A colleague who is leaving is bulk-downloading client files to a USB drive. You should:',
      options: [
        'Confront them directly',
        'Ignore it — not your business',
        'Report it confidentially to Security or HR',
        'Copy the files yourself as a backup'
      ],
      correct: 2,
      explanation: 'Report concerns quietly to the right team. Don\'t investigate or confront — that\'s their job.'
    }
  ],

  reporting: [
    {
      question: 'You entered your password on a page that turned out to be fake. When should you report it?',
      options: [
        'Immediately — minutes matter',
        'At the end of the day',
        'Only if something bad happens',
        'After you\'ve changed your password and checked your email'
      ],
      correct: 0,
      explanation: 'Speed is everything. Security can revoke sessions and block the attacker before damage is done.'
    },
    {
      question: 'Should you report a phishing email you recognised and didn\'t click?',
      options: [
        'No, nothing happened',
        'Yes — it helps Security remove it from coworkers\' inboxes and block the sender',
        'Only if it came from your manager',
        'Only if it had an attachment'
      ],
      correct: 1,
      explanation: 'Your report protects the person who would have clicked. Use the Report Phishing button.'
    },
    {
      question: 'Which should NOT be included in a security incident report?',
      options: [
        'What happened and when',
        'The original suspicious email',
        'Your password',
        'Which device and account were involved'
      ],
      correct: 2,
      explanation: 'Never send your password to anyone, including Security. They will never ask for it.'
    },
    {
      question: 'Before reporting a suspicious attachment you opened, should you delete the email and clear your browser history?',
      options: [
        'Yes, to limit the damage',
        'No — keep the evidence and report it; follow Security\'s instructions',
        'Yes, then shut down the computer',
        'Only delete the email'
      ],
      correct: 1,
      explanation: 'Evidence helps Security find and remove copies and understand what happened. Preserve, don\'t clean.'
    }
  ]

};

/* ===================================================================
 * ADVANCED TIER: harder, scenario-based questions.
 * Merged into each module's bank. The engine draws 6 random questions per attempt from
 * the combined bank and shuffles answer order, so learners can't memorise positions.
 * =================================================================== */
(function () {
  var advanced = {

    aitm: [
      { question: 'You signed in through an emailed link and completed MFA, then noticed the address bar said "login.micros0ft-auth.com". You immediately changed your password. Why should you still report it?',
        options: ['You don\'t need to; a password change logs everyone out automatically', 'The attacker may hold your stolen session cookie, which can stay valid until Security revokes your sessions', 'MFA codes stay valid for 24 hours', 'The fake page may have changed your password too'],
        correct: 1, explanation: 'AiTM steals the session token issued after MFA. Changing your password doesn\'t always end existing sessions. Security has to revoke them and check for persistence such as mailbox rules.' },
      { question: 'Which sign-in method is most resistant to AiTM proxy phishing?',
        options: ['SMS one-time codes', 'Authenticator app push with number matching', 'A FIDO2 security key or passkey', 'Security questions'],
        correct: 2, explanation: 'FIDO2 keys and passkeys are bound to the real website\'s domain, so they refuse to sign in on a proxy domain. Codes and pushes can be relayed through a proxy.' },
      { question: 'A login page you reached from an email shows a padlock and a valid certificate. What does the padlock actually prove?',
        options: ['The site belongs to the company in the logo', 'The site has been checked by your IT team', 'Your connection is encrypted to whoever owns that domain, which may be the attacker', 'The site cannot steal passwords'],
        correct: 2, explanation: 'Attackers get free, valid certificates for their own domains. The padlock means encrypted, not legitimate. Check the domain itself.' },
      { question: 'After an AiTM compromise, which change do attackers most often make to stay hidden in a mailbox?',
        options: ['Change your email signature', 'Create inbox rules that forward, move, or delete replies about payments or security alerts', 'Delete all your contacts', 'Switch your mailbox language'],
        correct: 1, explanation: 'Malicious inbox rules hide the attacker\'s activity and siphon off sensitive mail. Security checks for them after any suspected compromise.' }
    ],

    bec: [
      { question: 'A long-time vendor emails from their correct, real address asking you to update their bank details before Friday\'s payment. What is the right next step?',
        options: ['Proceed: the sender address matches exactly', 'Reply to the email asking them to confirm', 'Call the vendor on a phone number already in your records (not one in the email) and follow your payee-change process', 'Ask them to send the new details on official letterhead'],
        correct: 2, explanation: 'Vendor mailboxes get compromised, so a "correct" sender address proves nothing. Replies and letterheads come from the same attacker. Only an out-of-band callback to a known number verifies the change.' },
      { question: 'You notice the Reply-To address of an urgent payment email is different from the From address. What does this most likely mean?',
        options: ['The email system is misconfigured', 'Your reply will go to a different mailbox, a common trick to hijack the conversation', 'The sender is on vacation', 'It was sent from a phone'],
        correct: 1, explanation: 'Attackers spoof or mimic the From line and set Reply-To to their own mailbox, so your answers go straight to them.' },
      { question: 'Twenty minutes ago you sent a wire that you now believe was fraudulent. What is the priority?',
        options: ['Email the recipient and ask for the money back', 'Wait until tomorrow to confirm with the vendor', 'Immediately alert Finance/your bank and Security so they can attempt a recall, because speed is what makes recovery possible', 'Delete the email thread to avoid embarrassment'],
        correct: 2, explanation: 'Banks can sometimes freeze or recall funds if they\'re alerted within hours. Every minute counts, and the evidence must be kept.' },
      { question: 'A text from an unknown number claims to be your CEO: "In a board meeting, can\'t talk. Need 5 gift cards for a client. Send codes ASAP." Which detail is the strongest fraud indicator?',
        options: ['It uses your first name', 'It arrived during business hours', 'It requests untraceable payment (gift cards) while pre-emptively blocking a voice check', 'It is short'],
        correct: 2, explanation: 'Gift cards are untraceable cash, and "can\'t talk" removes the one check that would expose the attacker. Together they are the signature of this scam.' }
    ],

    smishing: [
      { question: 'A text links to "https://usps.com-track-redelivery.info/update". What is the real domain?',
        options: ['usps.com', 'track-redelivery', 'com-track-redelivery.info', 'update'],
        correct: 2, explanation: 'Read the domain right to left from the first single slash: the registered domain is com-track-redelivery.info. "usps.com" at the start is just a subdomain label.' },
      { question: 'A suspicious promotional text says "Reply STOP to opt out." What should you do?',
        options: ['Reply STOP so they remove you', 'Don\'t reply; report it (forward to 7726 / your carrier\'s spam report), then delete and block', 'Call the number to complain', 'Click the link to unsubscribe properly'],
        correct: 1, explanation: 'Replying confirms your number is active and monitored, and it gets you more scams. Report and delete instead.' },
      { question: 'You get a bank text, "Did you attempt a $1,240 purchase? Reply YES or NO". You reply NO, and a "fraud team" calls asking for the code they just texted you. What\'s happening?',
        options: ['Normal fraud-prevention procedure', 'A combined smishing + vishing attack: the code would let them into your account. Hang up and call the number on your card', 'A bank system test', 'A delivery notification'],
        correct: 1, explanation: 'Attackers chain channels: the text sets up the story, and the call harvests the code. Banks never ask you to read back a code they sent.' },
      { question: 'Why are phishing texts often harder to spot than phishing emails?',
        options: ['Texts are always from real companies', 'Phones show less of the sender and link details, and texts skip the email filters your company runs', 'Texts can\'t contain links', 'Carriers verify every sender'],
        correct: 1, explanation: 'Small screens and truncated links hide clues, and SMS bypasses corporate email security entirely.' }
    ],

    quishing: [
      { question: 'At a parking meter, a QR code sticker says "Scan to pay". What is the safest approach?',
        options: ['Scan it; parking QR codes are official', 'Check whether it is a sticker placed over the original, and pay through the city\'s official app or a website you type yourself', 'Scan it, and pay only if the page loads quickly', 'Scan it and enter card details only if the page has a padlock'],
        correct: 1, explanation: 'Fake QR stickers on meters and chargers are a common scam. Use official apps or typed URLs for any payment.' },
      { question: 'Why do attackers put QR codes inside phishing emails instead of normal links?',
        options: ['QR codes look more professional', 'The link is hidden inside an image that email filters struggle to inspect, and it moves you to a phone with fewer protections', 'QR codes are encrypted', 'Phones can\'t be phished'],
        correct: 1, explanation: 'QR codes dodge URL scanning and shift the victim to a personal device outside corporate controls.' },
      { question: 'Your camera previews a QR link as "https://login.microsoftonline.com.secure-auth.co/verify". You should:',
        options: ['Open it: it says microsoftonline.com', 'Not open it: the real domain is secure-auth.co', 'Open it in private browsing', 'Open it, but don\'t enter MFA'],
        correct: 1, explanation: 'The registered domain is the part just before the first single slash: secure-auth.co. Everything before it is a decoy subdomain.' },
      { question: 'An email from "IT" asks you to scan a QR code to "re-register MFA before your account is disabled". What is the best response?',
        options: ['Scan it quickly to avoid lockout', 'Forward it to colleagues so they don\'t get locked out', 'Report it; MFA changes are done through the official portal you navigate to yourself', 'Scan it with a work phone instead of a personal one'],
        correct: 2, explanation: 'Urgency plus a QR code plus an MFA "re-registration" is a classic credential-theft lure. Go to the real portal yourself, and report the email.' }
    ],

    ransomware: [
      { question: 'Security suspects malware on your laptop and tells you to "disconnect it". Why disconnect from the network but not shut it down?',
        options: ['Shutting down could damage the battery', 'Disconnecting stops the spread, while keeping it powered preserves evidence in memory that responders may need', 'Shutting down automatically deletes the malware', 'It doesn\'t matter which you do'],
        correct: 1, explanation: 'Isolation limits the spread, and memory can hold keys, processes, and attacker tools that vanish at power-off. Follow Security\'s exact instructions.' },
      { question: 'A coworker\'s real account sends "Updated document – sign in to view" with a file-share link. They never mentioned any document. Best action?',
        options: ['Open it: it\'s from a coworker\'s real account', 'Verify with the coworker through a different channel (chat or phone) before clicking, and report it if they didn\'t send it', 'Reply to the email asking if it\'s legit', 'Open it on your phone instead'],
        correct: 1, explanation: 'Compromised internal accounts are a favourite delivery method because they bypass trust checks. A reply goes to the attacker, so use another channel.' },
      { question: 'Which habit best helps the company recover from ransomware without paying?',
        options: ['Copy important files to a USB stick on your desk', 'Save work on company-managed storage (OneDrive, SharePoint, network drives) that IT backs up', 'Keep everything on your desktop', 'Email files to your personal account'],
        correct: 1, explanation: 'Managed storage has versioning and protected backups. Local and USB copies are usually encrypted along with everything else, or simply lost.' },
      { question: 'A file named "Invoice.pdf" shows "Type: Shortcut (.lnk)" in its properties. What does that mean?',
        options: ['It\'s a PDF with a shortcut icon', 'It\'s a shortcut that can launch commands, disguised with a PDF name', 'It\'s a compressed PDF', 'It\'s safe because shortcuts can\'t contain code'],
        correct: 1, explanation: '.lnk files can run arbitrary commands when opened, and attackers name them to look like documents.' }
    ],

    vishing: [
      { question: 'Your phone shows your bank\'s real customer-service number on an incoming call. What does that prove?',
        options: ['The call is genuinely from your bank', 'Nothing: caller ID can be spoofed easily', 'That the bank has verified the caller', 'That the call is recorded'],
        correct: 1, explanation: 'Caller ID spoofing is trivial. Hang up and call the number on the back of your card or the official website.' },
      { question: 'A "help desk" caller says they\'re fixing your MFA and asks you to install a remote-support tool so they can "take a look". You should:',
        options: ['Install it; remote tools are normal for IT', 'Install it, then uninstall it after the call', 'Hang up and contact the help desk through the official number or portal', 'Ask them for their employee ID, then install it'],
        correct: 2, explanation: 'Remote-access tools hand the attacker your screen and keyboard. An employee ID is easily invented. Verify through a channel you initiate.' },
      { question: 'You realise you gave an unverified caller your employee ID and your manager\'s name. Should you report it?',
        options: ['No: it wasn\'t a password', 'Yes: small details power the next, more convincing attack (on you, your manager, or the help desk)', 'Only if they call back', 'Only if your manager agrees'],
        correct: 1, explanation: 'Reconnaissance details let attackers impersonate you to the help desk or impersonate your manager to you. Report it so Security can watch for follow-ups.' },
      { question: 'What may you confirm to an unverified caller who says they\'re from IT?',
        options: ['Your username', 'The last four digits of your ID number', 'Nothing sensitive until you\'ve verified them by calling back through an official number', 'Your MFA code, but only if they already know your username'],
        correct: 2, explanation: 'Verification must come first, and it has to be through a channel you initiate. Every detail helps the attacker.' }
    ],

    'mfa-fatigue': [
      { question: 'Why does number matching make push bombing much less effective?',
        options: ['It sends fewer notifications', 'You must type a number shown only on the sign-in screen, so you can\'t approve blindly', 'It blocks foreign IP addresses', 'It encrypts the push'],
        correct: 1, explanation: 'Without the sign-in screen in front of you, you have no number to type, so accidental or fatigued approval is no longer possible.' },
      { question: 'Half-asleep, you tapped Approve on a prompt you didn\'t start. What now?',
        options: ['Nothing: it was only one tap', 'Report it immediately so Security can revoke sessions, then change your password from a trusted device', 'Turn off your phone', 'Wait to see if anything strange happens'],
        correct: 1, explanation: 'That tap probably let an attacker in. Fast reporting lets Security kill the session before they set up persistence.' },
      { question: 'You get a text: "IT here. Enter 47 in your authenticator to stop the alerts." What is going on?',
        options: ['Normal IT procedure', 'The attacker is reading the number off their own sign-in screen. Deny and report', 'An automated system message', 'A test you should complete'],
        correct: 1, explanation: 'Only someone looking at a live sign-in screen knows the number. Anyone telling you which number to enter is signing in as you.' },
      { question: 'Which MFA method best resists both push bombing and phishing proxies?',
        options: ['SMS codes', 'Email codes', 'Push approval without number matching', 'FIDO2 security key or passkey'],
        correct: 3, explanation: 'Passkeys and FIDO2 keys require a physical action and only work on the genuine site, so there is no prompt to spam and nothing to relay.' }
    ],

    oauth: [
      { question: 'A consent screen is hosted on the genuine login.microsoftonline.com. What should you evaluate before clicking Accept?',
        options: ['Only the domain: it\'s Microsoft, so it\'s safe', 'The app\'s name and publisher verification, and whether the permissions match what you\'re trying to do', 'Only whether the logo looks professional', 'Whether the page loads quickly'],
        correct: 1, explanation: 'The real identity provider hosts consent for any app, including malicious ones. Judge the app and its permissions, not the host.' },
      { question: 'What does a permission like "Maintain access to data you have given it access to" (offline_access) allow?',
        options: ['Access only while the browser tab is open', 'Ongoing access via refresh tokens, even when you\'re not signed in and after a password change', 'Offline viewing of one file', 'Nothing important'],
        correct: 1, explanation: 'offline_access issues long-lived refresh tokens. That\'s why revoking the app\'s consent, not changing your password, is what stops it.' },
      { question: 'An app says "Need admin approval", and the email that sent you there asks you to "request approval from IT". What should you do?',
        options: ['Push IT to approve it quickly', 'Report the email and app as suspicious instead of requesting approval', 'Try again with a personal account', 'Ask a colleague with admin rights to accept it'],
        correct: 1, explanation: 'Attackers try to trick admins into granting tenant-wide consent. Report it so Security can investigate and block the app.' },
      { question: 'A consent screen shows the app "Microsoft Teams Update" from an unverified publisher, requesting Mail.Send. Which is the strongest red flag?',
        options: ['The app has an icon', 'A brand-name app from an unverified publisher asking to send mail as you', 'It mentions Teams', 'The screen is white'],
        correct: 1, explanation: 'Real Microsoft apps don\'t appear as unverified third-party apps, and an "update" has no reason to send mail as you.' }
    ],

    passwords: [
      { question: 'An old shopping site you used years ago announces a password breach. You reused that password at work but have changed your work password since. What remains at risk?',
        options: ['Nothing, since the work password was changed', 'Every other account that still uses that old password: change those and turn on MFA', 'Only the shopping site', 'Only your work account'],
        correct: 1, explanation: 'Credential stuffing tries the leaked pair everywhere. Any account still sharing that password is exposed.' },
      { question: 'Why does adding length strengthen a password more than swapping letters for symbols (a→@, o→0)?',
        options: ['Symbols aren\'t allowed on most sites', 'Each extra character multiplies the possible combinations, while common swaps are among the first patterns cracking tools try', 'Long passwords are encrypted differently', 'It doesn\'t; symbols are always better'],
        correct: 1, explanation: 'Cracking rules apply predictable substitutions automatically. Length grows the search space far faster.' },
      { question: 'Your password manager refuses to auto-fill on a login page that looks exactly like your company\'s. What does that suggest?',
        options: ['The password manager is broken', 'The page\'s domain doesn\'t match the saved site, so it may be a phishing page', 'You need to update the manager', 'You should copy and paste the password instead'],
        correct: 1, explanation: 'Managers match on the exact domain. Refusing to fill is a valuable warning. Don\'t override it by pasting.' },
      { question: 'What is the best setup for your password manager\'s master password?',
        options: ['Your work password, so you only remember one', 'A long, unique passphrase used nowhere else, plus MFA on the manager', 'A short password you change monthly', 'Your birthday plus a symbol'],
        correct: 1, explanation: 'The master password protects everything, so it must be long, unique, and backed by MFA.' }
    ],

    deepfake: [
      { question: 'On a suspicious video call you ask the person to turn their head fully sideways and wave a hand in front of their face. What is the limitation of this test?',
        options: ['It always detects deepfakes', 'It may expose weaker fakes, but good ones can pass. Out-of-band verification is still required', 'It is illegal', 'It only works on audio'],
        correct: 1, explanation: 'Visual tests are a useful hint, not proof. Process-based verification (a callback to a known number, normal approvals) is the real control.' },
      { question: 'What is the purpose of a family "safe word"?',
        options: ['To unlock shared devices', 'To verify identity in an emergency call where the voice may be AI-cloned', 'To reset passwords', 'To sign in to streaming services'],
        correct: 1, explanation: 'A pre-agreed word that a cloned voice can\'t know defeats "family emergency" voice-cloning scams.' },
      { question: 'A voice message from an executive asks you to bypass dual approval "just this once" for an urgent transfer. Best response?',
        options: ['Bypass it: an executive authorised it', 'Follow dual approval anyway, verify through a known channel, and report the request', 'Ask a colleague to approve it quickly', 'Send half now, half after approval'],
        correct: 1, explanation: 'Requests to skip controls are a defining feature of impersonation fraud. Controls apply to everyone, executives included.' },
      { question: 'Why do impersonation attacks combine urgency with secrecy?',
        options: ['To be polite', 'To stop you taking the time to verify and from consulting anyone who could expose the fraud', 'Because deals are always secret', 'To reduce paperwork'],
        correct: 1, explanation: 'Urgency removes time, and secrecy removes allies. Recognising that pair is one of the best defences.' }
    ],

    usb: [
      { question: 'A malicious USB device presents itself as a keyboard. Why might antivirus fail to stop it?',
        options: ['Antivirus can\'t read USB drives', 'It doesn\'t deliver a file to scan. It types commands as if you were typing them', 'Keyboards are encrypted', 'Antivirus only works online'],
        correct: 1, explanation: 'Keystroke-injection devices act like a fast typist. There\'s no file to scan, which is why you shouldn\'t plug them in at all.' },
      { question: 'You charge your phone at a public kiosk and it asks "Trust this computer?" What should you do?',
        options: ['Tap Trust so it charges faster', 'Tap Don\'t Trust (or use a charge-only data blocker or your own charger)', 'Tap Trust, then untrust later', 'Restart your phone and tap Trust'],
        correct: 1, explanation: '"Trust" grants data access. Charging doesn\'t need it.' },
      { question: 'A colleague hands you a USB stick with a client\'s presentation from an off-site meeting. Best approach?',
        options: ['Plug it in: you know the colleague', 'Follow policy: use an approved file-sharing channel, or have IT scan or handle the device', 'Plug it into a meeting-room PC instead', 'Copy it to your personal laptop first'],
        correct: 1, explanation: 'Even well-meaning colleagues carry infected media from external machines. Approved channels exist for exactly this.' },
      { question: 'A parcel addressed to your team contains a branded USB stick and a letter saying it\'s from a government agency with "required compliance documents". You should:',
        options: ['Plug it in: government mail is trustworthy', 'Hand it to Security unopened and unplugged; mailed USBs posing as agencies or retailers are a known attack', 'Plug it into an old spare PC', 'Throw it away'],
        correct: 1, explanation: 'Criminals have mailed USB "gifts" impersonating agencies and retailers. Security can investigate it and warn others.' }
    ],

    wifi: [
      { question: 'You browse HTTPS sites on public Wi-Fi without a VPN. What can a malicious hotspot operator still see or do?',
        options: ['Read every page and password you type', 'Nothing at all', 'See which sites you visit and try to redirect you to fake pages, which work if you ignore warnings or follow links', 'Delete files on your laptop'],
        correct: 2, explanation: 'HTTPS hides page contents, but domains can leak and redirects to look-alike sites are possible. A VPN protects against both.' },
      { question: 'On airport Wi-Fi, your browser shows a certificate warning when you open your bank\'s site. Best response?',
        options: ['Click "Proceed anyway": airport Wi-Fi is often weird', 'Don\'t proceed. Disconnect and use a trusted connection (hotspot + VPN)', 'Reload the page until it works', 'Use an incognito window'],
        correct: 1, explanation: 'A certificate warning on a sensitive site over public Wi-Fi is a classic sign that someone is in the middle. Never click through it.' },
      { question: 'Why is auto-joining remembered public networks risky?',
        options: ['It wastes battery', 'Your device may silently connect to any network using the same name, including an attacker\'s copy', 'It slows down downloads', 'It disables your VPN permanently'],
        correct: 1, explanation: 'Devices trust network names. An evil twin with a familiar name can capture your connection without any action from you.' },
      { question: 'A hotel Wi-Fi login page asks for your corporate email and password to "verify your guest account". You should:',
        options: ['Enter them: it\'s for verification', 'Never enter corporate credentials into a Wi-Fi portal. Disconnect and use your hotspot', 'Enter only the password', 'Enter them, then change your password later'],
        correct: 1, explanation: 'Captive portals have no legitimate reason to need your work credentials. This is a credential-harvesting page.' }
    ],

    'social-eng': [
      { question: 'Someone you recognise from another department walks up behind you at a secure door. Their badge isn\'t visible. Best action?',
        options: ['Let them in: you know them', 'Politely ask them to badge in themselves. Policy applies to everyone, and their access may have changed', 'Ignore it', 'Badge them in, but note their name'],
        correct: 1, explanation: 'Recognising a face doesn\'t confirm current access: people change roles or leave. One badge per person keeps logs and access accurate.' },
      { question: 'A caller says they\'re from building management and asks which company makes your badge readers and where the server room is. This is best described as:',
        options: ['Routine maintenance', 'Reconnaissance for a physical or technical attack. Verify before sharing anything', 'A customer survey', 'Harmless small talk'],
        correct: 1, explanation: 'Vendor names and room locations help attackers plan intrusions and craft convincing pretexts.' },
      { question: 'A friendly visitor brings coffee for the team, chats for a while, then asks to use a desk PC to print a document. Which lever are they pulling, and what\'s the right response?',
        options: ['Fear; ignore them', 'Reciprocity; thank them, and direct them to reception or their host to print', 'Authority; let them print', 'Curiosity; ask what the document is, then let them print'],
        correct: 1, explanation: 'A favour first creates a sense of obligation. Stay friendly and follow the visitor process.' },
      { question: 'You challenged an unescorted person who turned out to be a senior executive, and they seemed annoyed. What\'s the right takeaway?',
        options: ['Never challenge anyone senior again', 'You did the right thing. Consistent challenges are what security policy expects, and leaders should model it', 'Apologise and give them your badge', 'Report yourself to HR'],
        correct: 1, explanation: 'Attackers impersonate senior people precisely because staff hesitate to challenge them. Consistency protects everyone.' }
    ],

    'home-network': [
      { question: 'Your home router no longer receives firmware updates from the manufacturer. Best action?',
        options: ['Keep using it; it still works', 'Replace it: unpatched routers accumulate known, actively exploited vulnerabilities', 'Turn off Wi-Fi at night', 'Change the network name'],
        correct: 1, explanation: 'End-of-life routers are a frequent target of botnets. If it can\'t be patched, it should be replaced.' },
      { question: 'What is the main risk of leaving UPnP enabled on a home router?',
        options: ['Slower Wi-Fi', 'Devices and malware on your network can automatically open ports to the internet', 'It drains device batteries', 'It disables WPA3'],
        correct: 1, explanation: 'UPnP lets devices punch holes in your firewall without asking you, which is handy for malware and poorly secured cameras.' },
      { question: 'An internet-connected camera at home still has its default password. Which set of actions fixes the most risk?',
        options: ['Rename the camera', 'Change the password, update the firmware, put it on a guest/IoT network, and disable remote access you don\'t use', 'Point it at a wall', 'Unplug it once a week'],
        correct: 1, explanation: 'Default credentials and old firmware are how cameras get hijacked. Isolating the camera limits the damage if it\'s compromised.' },
      { question: 'A family PC on your home network gets infected. What most limits its ability to reach your work laptop?',
        options: ['Sitting in a different room', 'Network separation (guest/IoT network for other devices) plus a patched work laptop with its firewall and the company VPN', 'Using a different browser', 'Turning down screen brightness'],
        correct: 1, explanation: 'Segmentation and a well-maintained device are layered defences against threats on the same network.' }
    ],

    insider: [
      { question: 'A partner needs member emails for a newsletter. The export has names, emails, dates of birth, and balances. What is the correct share?',
        options: ['The full export, in case they need more later', 'Only names and emails, through an approved secure channel', 'Everything, but in a password-protected zip', 'Balances only'],
        correct: 1, explanation: 'Data minimisation: share only the fields the task requires, by an approved method.' },
      { question: 'What is the risk of an "Anyone with the link" sharing setting on a confidential document?',
        options: ['None if you only send it to one person', 'The link works for anyone it\'s forwarded to, with no sign-in or audit of who opened it', 'It makes the file read-only', 'It deletes the file after a week'],
        correct: 1, explanation: 'Links get forwarded, pasted, and indexed. Use "specific people" for anything beyond public data.' },
      { question: 'Before leaving the company, you want to keep templates you built, but they contain client data. What should you do?',
        options: ['Email them to your personal account', 'Ask your manager what you may keep and follow the offboarding policy. Client data stays with the company', 'Copy them to USB', 'Upload them to your personal cloud'],
        correct: 1, explanation: 'Taking client data, even in your "own" work, can breach contracts and privacy law. Ask first.' },
      { question: 'What is the best way to send restricted data to an approved external partner?',
        options: ['Regular email attachment', 'The approved secure file transfer or encrypted email, to the named recipient, with access limited and set to expire', 'A personal cloud link', 'A USB stick in the post'],
        correct: 1, explanation: 'Approved secure channels give encryption, access control, and an audit trail.' }
    ],

    reporting: [
      { question: 'It\'s 11 PM on Saturday. You realise you entered your password on a fake page an hour ago. What should you do?',
        options: ['Wait until Monday morning', 'Use the urgent/24-7 security reporting channel now', 'Post about it in the team chat and go to bed', 'Change the password and say nothing'],
        correct: 1, explanation: 'Attackers don\'t keep office hours. Urgent channels exist so containment can start immediately.' },
      { question: 'Why report something you aren\'t sure is malicious?',
        options: ['You shouldn\'t; it wastes Security\'s time', 'False alarms are cheap, and one report often reveals a campaign hitting many people', 'Reports are needed for performance reviews', 'Only managers should report'],
        correct: 1, explanation: 'Security would much rather triage a harmless report than miss the first sign of an attack.' },
      { question: 'What is the best way to report a phishing email?',
        options: ['Forward it inline with "is this phishing?"', 'Use the Report Phishing button (or forward it as an attachment) so the original headers are preserved', 'Take a screenshot and delete the email', 'Reply to the sender saying you\'ve reported them'],
        correct: 1, explanation: 'Headers let Security trace the sender and find every copy. Inline forwards and screenshots lose them.' },
      { question: 'You reported a click, and Security tells you to stay connected so they can investigate remotely. Your instinct is to wipe your browser history first. You should:',
        options: ['Wipe it; it\'s private', 'Follow Security\'s instructions and change nothing; altering the device can destroy evidence', 'Restart the laptop', 'Uninstall recent software'],
        correct: 1, explanation: 'Investigators need the device as it is. Preserve the evidence and follow their directions.' }
    ]
  };

  var Q = window.SHADOWPROOF_QUESTIONS;
  Object.keys(advanced).forEach(function (k) { Q[k] = (Q[k] || []).concat(advanced[k]); });
})();
