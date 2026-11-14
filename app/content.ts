// All site copy lives here. Edit this file to update the page.

export const profile = {
  name: "Brian Tea, P.E.",
  tagline: "Engineer. Learner. Builder.",
  headline: "Tinkering with AI to make games, tools, and things that (mostly) work.",
  intro: [
    "I spent six years at Dow Chemical leading engineering programs up to $55M, then spent this summer at TD Bank digging into synthetic identity fraud with Python, SQL, and SAS.",
    "Now I'm finishing a Master's in Analytics at Georgia Tech and building with data, automation, and AI, because I don't just manage workflows, I build them to eliminate work.",
  ],
  location: "Boston, MA",
  site: "https://briantea.vercel.app", // canonical URL for metadata, robots.txt and sitemap.xml
  description: "Technical program manager and analyst. Data, automation, and AI.", // meta and link-preview text
  email: "briantea716@gmail.com",
  linkedin: "https://www.linkedin.com/in/brian-tea",
  linkedinLabel: "linkedin.com/in/brian-tea",
  github: "https://github.com/branmuffn",
  githubLabel: "github.com/branmuffn",
  resume: "/Brian-Tea-Resume.pdf",
};

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  title: string;
  context: string;
  summary?: string;
  details?: string[];
  metric?: { value: string; label: string };
  tools?: string[]; // "Built with": the 3-4 main pieces, not a skills claim
  status?: string;
  featured?: boolean;
  award?: string;
  role?: string;
  team?: string;
  links?: { href: string; label: string; note?: string }[]; // note: short hint shown next to the link
  image?: Shot; // main screenshot in public/projects/
  gallery?: Shot[]; // more screenshots, shown with arrows in the project panel (same shape as `image`)
  next?: string[]; // what's in progress now, shown as its own "In progress" list
};

export const projects: Project[] = [
  {
    title: "OnBoard",
    image: { src: "/projects/onboard.jpg", alt: "OnBoard worker home screen with recent moments and prayer requests (sample data)", width: 1200, height: 750 },
    context: "Gloo AI Hackathon 2026 · Team project",
    featured: true,
    award: "Winner, Best of the Ministry Track · $20,000 team prize",
    status: "Ongoing",
    summary:
      "A mobile web app that helps missionaries and small or understaffed ministries turn moments from the field into prayer requests and newsletters in their own words, without exposing the people they serve.",
    details: [
      "Capture: type or talk a moment, and AI tags it so it's easy to find later.",
      "Write: AI finds themes across chosen moments and drafts only from your words. No added facts, quotes, or verses.",
      "Privacy Check: flags full names and locations and blurs faces in photos. Nothing publishes without approval.",
      "Partner side: a two-way prayer board and Journeys that let supporters follow one story over time.",
    ],
    next: ["Testing with missionaries and campus ministers, and improving it from their feedback."],
    metric: { value: "5 of 7", label: "testers said sending an update felt faster than what they do now" },
    role: "Led the team, contributed ideas, built the prototype, and helped with the initial pitch.",
    team: "Christopher Lee, Thanh Tran, Rita Dong, Javier Soto, Jedidiah Gabrielle Santos, and me",
    tools: ["React", "Gloo AI Studio", "Gemini", "Whisper"],
    links: [
      { href: "https://gloo.com/ai/hackathon/2026-winners", label: "Hackathon winners" },
    ],
  },
  {
    title: "Frontline Squad",
    image: { src: "/projects/frontline.jpg", alt: "Frontline Squad gameplay: a team deathmatch on the Gorge map", width: 1200, height: 675 },
    context: "Browser game · Personal project",
    featured: true,
    status: "Live",
    summary:
      "A first-person shooter that runs in the browser with no install, no account, and no game server. Inspired by Combat Arms, with some Halo and Call of Duty mixed in.",
    details: [
      "13 modes, 9 maps, an in-game map editor, bots with skill levels 1 to 10, and vehicles.",
      "Multiplayer for up to 12 players, peer to peer over WebRTC. The host's game is the referee.",
      "Ships as one self-contained HTML file. All art, audio, and music are generated in code.",
      "Every bug fix comes with a new automated test, so the same bug can't quietly come back.",
    ],
    metric: { value: "68", label: "automated tests play the game in a real browser before every update goes live" },
    role: "Set the vision, play-tested every build, and decided what to keep, cut, and fix. Claude wrote most of the code.",
    tools: ["three.js", "WebRTC", "Playwright", "Claude Code"],
    links: [
      { href: "https://frontline-squad.netlify.app", label: "Play it" },
      { href: "https://github.com/branmuffn/frontline-squad", label: "GitHub" },
    ],
  },
  {
    title: "Synthetic identity fraud analysis",
    context: "TD Bank · Summer 2026",
    featured: true,
    summary:
      "Investigated synthetic identity fraud in the Target Circle Card portfolio using portfolio and credit bureau data.",
    details: [
      "Segmented accounts and evaluated anomalous behaviors and loss patterns to surface fraud indicators.",
      "Partnered with a fraud SME and consumer credit stakeholders to turn findings into business insights.",
    ],
    metric: { value: "~7%", label: "of loss dollars came from ~0.25% of accounts" },
    tools: ["Python", "SQL", "SAS"],
  },
  {
    title: "Downstream",
    image: { src: "/projects/downstream.jpg", alt: "Downstream map of U.S. metros ranked by priority score for a rising country signal (mock data)", width: 1200, height: 750 },
    gallery: [
      { src: "/projects/downstream-digest.jpg", alt: "Downstream weekly digest preview: a short Monday email listing places to check in on (mock data)", width: 1200, height: 750 },
      { src: "/projects/downstream-score.jpg", alt: "How the Downstream priority score works, with adjustable assumptions and a worked example (mock data)", width: 1200, height: 750 },
    ],
    context: "Proposed OMSA capstone with Frontier Commons and IFI",
    status: "In progress",
    summary:
      "A planned dataset and dashboard that estimate how many students from each country study in each U.S. metro, then flag the places that may need attention when things get worse in a home country.",
    details: [
      "Students: monthly counts by country and state from DHS's SEVIS tables, split across metros by each campus's international enrollment (IPEDS), and cross-checked against Open Doors.",
      "Signals: weekly country instability levels from Frontier Commons' Upstream, with GDELT news data as a backup.",
      "Scoring: each place gets a 0 to 100 priority score with every assumption shown, and student counts are shown as ranges, not false precision.",
      "Prototype: a clickable map, weekly digest, and score explainer with mock data, plus a no-signup demo.",
    ],
    next: ["Collecting and joining the real public data to replace the mock data."],
    tools: ["JavaScript", "D3", "Supabase"],
    links: [{ href: "https://downstream-map.vercel.app/?demo=1", label: "Try the demo" }],
  },
  {
    title: "Scribe Bot",
    featured: true,
    image: { src: "/projects/scribe-bot.jpg", alt: "Scribe Bot's Today page in Demo mode with sample meetings", width: 1200, height: 806 },
    context: "Self-hosted app · Personal project",
    status: "Coming soon",
    summary:
      "A private, self-hosted app that turns recorded conversations into searchable transcripts, tasks, decisions, and people notes.",
    details: [
      "Speech recognition and speaker identification run locally on a home server. Audio never leaves my devices.",
      "Private meetings never touch a cloud AI.",
      "A public demo with sample data is in progress.",
    ],
    tools: ["Python", "FastAPI", "sherpa-onnx", "Claude"],
  },
  {
    title: "Splitwise clone",
    context: "Frontier Commons Build Bootcamp",
    status: "Live",
    summary: "A working clone of Splitwise, the app for sharing costs: create or join a group, add shared expenses, and see who owes whom.",
    details: [
      "Splits: equally, by exact amounts, percentages, or shares, or item by item with tax and tip shared.",
      "Settling up: suggests the fewest payments to even out, in multiple currencies, then you record them.",
      "Free to use. It only keeps track of who owes what; no money moves through the app.",
      "Also: receipts, recurring expenses, comments, charts, CSV export, and live updates.",
    ],
    next: ["A no-signup demo mode, so anyone can try it without creating an account."],
    tools: ["Next.js", "TypeScript", "Supabase"],
    links: [
      { href: "https://splitwise-clone-three-theta.vercel.app", label: "Try it", note: "free account" },
      { href: "https://github.com/branmuffn/splitwise-clone", label: "GitHub" },
    ],
  },
  {
    title: "Pledge reconciliation dashboard",
    image: { src: "/projects/pledge-dashboard.jpg", alt: "Pledge reconciliation dashboard showing valid monthly support, goal progress and excluded pledges", width: 1200, height: 750 },
    context: "Frontier Commons Technical Challenge · Aug 2026",
    gallery: [
      { src: "/projects/pledge-breakdown.jpg", alt: "Pledge dashboard: excluded pledges broken down by reason and lost monthly value", width: 1200, height: 750 },
      { src: "/projects/pledge-lapsed.jpg", alt: "Pledge dashboard: the lapsed pledges table, with days since each donor's last gift (sample data)", width: 1200, height: 750 },
    ],
    summary:
      "A Streamlit dashboard that checks donors' stated pledges against their actual gift history to show how much monthly support is really committed.",
    details: [
      "Cleans a deliberately messy ledger: four currencies, mixed frequencies, and several date and amount formats.",
      "Gives each pledge exactly one status (included, lapsed, paused, past end date, or unparseable), so nothing is double-counted.",
      "Every row is counted or listed, and the dashboard shows why each excluded pledge was excluded.",
      "Logic is separate from the dashboard and covered by 24 automated tests.",
    ],
    metric: { value: "71.8%", label: "of the $7,500 monthly goal is actually backed by recent gifts" },
    tools: ["Python", "pandas", "Streamlit"],
    links: [
      { href: "https://klrju2rpjcgffbf5yktsqp.streamlit.app/", label: "Live app", note: "may take ~30 s to wake" },
      { href: "https://github.com/branmuffn/fc-dashboard", label: "GitHub" },
    ],
  },
  {
    title: "Cloud-based AI vendor risk assessment",
    context: "Azure",
    summary:
      "Developed a model to analyze and categorize unstructured vendor inspection reports.",
    details: [
      "Partnered with SMEs to define the taxonomy, evaluation criteria, and measurable outputs.",
      "Documented workflows and repeatable analysis steps for consistent classification and reporting.",
    ],
    tools: ["Azure", "AI / ML"],
  },
  {
    title: "Self-hosted automation and local AI",
    context: "Personal infrastructure",
    summary:
      "Built and maintain n8n automation workflows running in Docker on my own server hardware, alongside local LLMs.",
    details: [
      "Workflows include generating YouTube videos from Reddit posts and producing video ads from static assets.",
      "Compared Gemini, ChatGPT, and Claude on generating working n8n workflow code.",
    ],
    tools: ["n8n", "Docker", "Ollama"],
  },
];

// How I build with AI (shown under Projects)
export const howIBuild = [
  { title: "I direct, AI writes, I check", body: "I set the goal and the constraints, Claude Code writes most of the code, and I review and test every change before it ships." },
  { title: "Tests over trust", body: "Every bug fix comes with an automated test that fails without the fix, so the same bug can't quietly come back." },
  { title: "Decisions live in the repo", body: "Rules, pitfalls, and decision logs are written down next to the code, so the next session (human or AI) starts from what we already learned." },
];

export type TimelineItem = {
  dates: string;
  title: string;
  org: string;
  place?: string;
  points?: string[];
  kind: "work" | "education";
};

export const timeline: TimelineItem[] = [
  {
    dates: "Sep – Oct 2026",
    title: "Innovation Fellow, Build lane",
    org: "Frontier Commons",
    points: [
      "Selected for the Build lane through a technical challenge: the pledge reconciliation dashboard above.",
      "Built and shipped projects in the Build Bootcamp, including this site and a working Splitwise clone.",
      "Scoped Downstream, a proposed data capstone with Frontier Commons and IFI.",
    ],
    kind: "work",
  },
  {
    dates: "Jun – Aug 2026",
    title: "Graduate Leadership Program Intern, Consumer Products & Credit Management",
    org: "TD Bank",
    place: "Boston, MA",
    points: ["Found a synthetic-fraud segment: ~0.25% of accounts, ~7% of loss dollars."],
    kind: "work",
  },
  {
    dates: "Aug 2019 – Oct 2025",
    title: "Technical Program Manager · Senior Mechanical Design Engineer",
    org: "The Dow Chemical Company",
    place: "Houston, TX",
    points: [
      "Led end-to-end delivery of 10+ programs, up to $55M.",
      "Delivered a project with 90% CO₂ reduction, recapturing 20,000 metric tons of flare gas CO₂.",
      "Technical SME for robotics and automation deployments.",
      "Aligned 20+ engineers and global stakeholders. Mentored 5+ interns and junior engineers.",
    ],
    kind: "work",
  },
  {
    dates: "Expected May 2027",
    title: "M.S. Analytics · GPA 4.00",
    org: "Georgia Institute of Technology",
    place: "Online",
    kind: "education",
  },
  {
    dates: "May 2019",
    title: "B.S. Mechanical Engineering with Honors · GPA 3.83",
    org: "The University of Texas at Austin",
    place: "Austin, TX",
    kind: "education",
  },
];

export const skills = {
  Data: ["Python", "SQL", "R", "SAS", "pandas", "Predictive modeling", "Regression", "Simulation"],
  "Building with AI": ["Claude Code", "Claude", "ChatGPT", "Gemini", "Local LLMs (Ollama, MLX, llama.cpp)"],
  "Build & automation": ["n8n", "Docker", "Streamlit", "APIs", "Azure"],
  Leadership: ["Technical program management", "Cross-functional teams", "Requirements from ambiguity", "Professional Engineer"],
};
