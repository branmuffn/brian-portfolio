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

export type Project = {
  title: string;
  context: string;
  summary?: string;
  details?: string[];
  metric?: { value: string; label: string };
  tools?: string[];
  status?: string;
  featured?: boolean;
  award?: string;
  role?: string;
  team?: string;
  links?: { href: string; label: string; note?: string }[]; // note: short hint shown next to the link
};

export const projects: Project[] = [
  {
    title: "OnBoard",
    context: "Gloo AI Hackathon 2026 · Team project",
    featured: true,
    award: "Winner, Best of the Ministry Track · $20,000 team prize",
    status: "Ongoing",
    summary:
      "A mobile web app that helps solo missionaries and one-person ministries turn small moments from the field into prayer requests and newsletters in their own words, without exposing the people they serve.",
    details: [
      "Capture: type or talk a moment, and AI tags it so it's easy to find later.",
      "Write: AI finds themes across chosen moments and drafts only from your words. No added facts, quotes, or verses.",
      "Privacy Check: flags full names and locations and blurs faces in photos. Nothing publishes without approval.",
      "Partner side: a two-way prayer board and Journeys that let supporters follow one story over time.",
      "Still testing and improving with missionaries and campus ministers.",
    ],
    metric: { value: "5 of 7", label: "testers said sending an update felt faster than what they do now" },
    role: "Helped lead the team, contributed ideas, built the prototype, and helped with the initial pitch.",
    team: "Christopher Lee, Javier Soto, Jedidiah Gabrielle Santos, Rita Dong, Thanh Tran, and me",
    tools: ["React", "TypeScript", "Vite", "Fastify", "Drizzle", "PostgreSQL", "Gloo AI Studio", "Gemini", "Whisper", "MediaPipe", "FastAPI"],
    links: [
      { href: "https://gloo.com/ai/hackathon/2026-winners", label: "Hackathon winners" },
    ],
  },
  {
    title: "Frontline Squad",
    context: "Browser game · Personal project",
    featured: true,
    status: "Live",
    summary:
      "A first-person shooter that runs in the browser with no install, no account, and no game server. Inspired by Combat Arms, with some Halo and Call of Duty mixed in.",
    details: [
      "13 modes, 9 maps, an in-game map editor, bots with skill levels 1 to 10, and vehicles.",
      "Multiplayer for up to 12 players, peer to peer over WebRTC. The host's game is the referee.",
      "Ships as one self-contained HTML file. All art, audio, and music are generated in code.",
      "Every bug fix ships with a test that fails without it.",
    ],
    metric: { value: "68", label: "automated browser tests run before every change ships" },
    role: "Set the vision, play-tested every build, and decided what to keep, cut, and fix. Claude wrote most of the code.",
    tools: ["JavaScript", "three.js", "WebRTC", "Vite", "Playwright", "Claude Code"],
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
    context: "Concept · Proposed OMSA capstone with Frontier Commons and IFI",
    status: "Prototype",
    summary:
      "When a currency crashes, a flood hits, or conflict breaks out abroad, students from that country are often studying here. Downstream connects news signals from abroad with data on where international students study, so IFI can see which U.S. places may need attention, and why.",
    details: [
      "Clickable prototype with mock data, a guided tour, and a no-signup demo mode.",
      "Map, weekly digest, and a transparent explanation of how each place is scored.",
    ],
    tools: ["JavaScript", "D3", "Supabase", "Vercel"],
    links: [{ href: "https://downstream-map.vercel.app/?demo=1", label: "Try the demo" }],
  },
  {
    title: "Scribe Bot",
    context: "Self-hosted app · Personal project",
    status: "Coming soon",
    summary:
      "A private, self-hosted app that turns recorded conversations into searchable transcripts, tasks, decisions, and people notes.",
    details: [
      "Speech recognition and speaker identification run locally on a home server. Audio never leaves my devices.",
      "Private meetings never touch a cloud AI.",
      "A public demo with sample data is in progress.",
    ],
    tools: ["Python", "FastAPI", "sherpa-onnx", "Tailscale", "Claude"],
  },
  {
    title: "Splitwise clone",
    context: "Frontier Commons Build Bootcamp",
    status: "Live",
    summary: "A working Splitwise clone: create or join a group, add shared expenses, and see who owes whom.",
    details: ["Create an account to try it. A no-signup demo mode is coming soon."],
    tools: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    links: [
      { href: "https://splitwise-clone-three-theta.vercel.app", label: "Live" },
      { href: "https://github.com/branmuffn/splitwise-clone", label: "GitHub" },
    ],
  },
  {
    title: "Pledge reconciliation dashboard",
    context: "Frontier Commons Technical Challenge · Aug 2026",
    summary:
      "Built a pandas data reconciliation pipeline and a Streamlit dashboard to evaluate transaction history against pledges.",
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
      "Compared Gemini, ChatGPT, Grok, Claude, and Nemotron on generating working n8n workflow code.",
    ],
    tools: ["n8n", "Docker", "Python", "APIs", "Ollama", "MLX", "llama.cpp"],
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
    points: ["8-week fellowship."],
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
  "Build & AI": ["n8n", "Docker", "Streamlit", "APIs", "Ollama", "MLX", "llama.cpp", "Azure"],
  Leadership: ["Technical program management", "Cross-functional teams", "Requirements from ambiguity", "Professional Engineer (P.E.)"],
};
