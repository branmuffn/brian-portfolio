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

export type Shot = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  title: string;
  context: string;
  oneLine: string; // the card on the main page: one short sentence
  summary?: string; // the panel: about two lines
  details?: string[]; // panel bullets, max 3; projects with screenshots use captions instead
  metric?: { value: string; label: string };
  tools?: string[]; // "Built with": the 3-4 main pieces, not a skills claim
  status?: string; // badge on the card (not repeated in the panel)
  cardBadge?: string; // replaces `status` on the card when there is something better to show
  award?: string;
  role?: string;
  team?: string;
  links?: { href: string; label: string; note?: string }[]; // note: short hint shown next to the link
  shots?: Shot[]; // screenshots in public/projects/ (2x), each with a caption shown under it in the panel
  phones?: Shot[]; // phone screenshots: the panel shows these side by side instead of `shots`
  next?: string[]; // what's in progress now, shown as its own "In progress" note
};

const desk = (src: string, alt: string, caption?: string, height = 1500): Shot => ({ src, alt, width: 2400, height, caption });
const phone = (src: string, alt: string, caption: string): Shot => ({ src, alt, width: 780, height: 1688, caption });

export const projects: Project[] = [
  {
    title: "OnBoard",
    context: "Gloo AI Hackathon 2026 · Team project",
    award: "Winner, Best of the Ministry Track · $20,000 team prize",
    status: "Ongoing",
    cardBadge: "Winner · $20K prize",
    oneLine: "Turns moments from the field into prayer requests and newsletters, without exposing the people missionaries serve.",
    summary:
      "A mobile app for missionaries and small or understaffed ministries: capture moments from the field and turn them into prayer requests and newsletters in their own words.",
    shots: [
      { src: "/projects/onboard.jpg", alt: "OnBoard worker home screen with recent moments and prayer requests (sample data)", width: 1200, height: 750 },
      { src: "/projects/onboard-letter.jpg", alt: "OnBoard letter editor with related notes from the notebook alongside (sample data)", width: 1200, height: 750 },
      { src: "/projects/onboard-privacy.jpg", alt: "OnBoard privacy check flagging a student's full name before a letter is sent (sample data)", width: 1200, height: 750 },
      { src: "/projects/onboard-partner.jpg", alt: "OnBoard partner home with the latest update and today's prayer requests (sample data)", width: 1200, height: 750 },
    ],
    phones: [
      phone("/projects/onboard-phone-home.jpg", "OnBoard home on a phone: quick capture, prayers and insights (sample data)", "Capture a moment in seconds by typing or talking. AI tags it so it's easy to find later."),
      phone("/projects/onboard-phone-write.jpg", "OnBoard letter editor on a phone (sample data)", "AI drafts newsletters only from your own notes. No added facts, quotes, or verses."),
      phone("/projects/onboard-phone-privacy.jpg", "OnBoard privacy check flagging a full name on a phone (sample data)", "A privacy check flags names and locations and blurs faces. Nothing is sent without approval."),
      phone("/projects/onboard-phone-partner.jpg", "OnBoard supporter app home on a phone (sample data)", "Supporters get their own app to pray along, reply, and follow one story over time."),
    ],
    metric: { value: "5 of 7", label: "testers said sending an update felt faster than what they do now" },
    role: "Led the team, contributed ideas, built the prototype, and helped with the initial pitch.",
    team: "Christopher Lee, Thanh Tran, Rita Dong, Javier Soto, Jedidiah Gabrielle Santos, and me",
    tools: ["React", "Gloo AI Studio", "Gemini", "Whisper"],
    links: [{ href: "https://gloo.com/ai/hackathon/2026-winners", label: "Hackathon winners" }],
    next: ["Testing with missionaries and campus ministers, and improving it from their feedback."],
  },
  {
    title: "Frontline Squad",
    context: "Browser game · Personal project",
    status: "Live",
    oneLine: "A browser shooter with 13 modes, 9 maps, and 12-player multiplayer. No install, no account, no server.",
    summary:
      "A first-person shooter that runs in the browser with no install, no account, and no game server. Inspired by Combat Arms, with some Halo and Call of Duty mixed in.",
    shots: [
      { src: "/projects/frontline.jpg", alt: "Frontline Squad gameplay: a team deathmatch on the Gorge map", width: 1200, height: 675, caption: "13 modes, 9 maps, bots with skill levels 1 to 10, vehicles, and up to 12 players peer to peer over WebRTC." },
      desk("/projects/frontline-menu.jpg", "Frontline Squad main menu with game modes, maps, bot skill and the map editor", "One self-contained HTML file. All art, audio, and music are generated in code, and there's a map editor.", 1350),
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
    oneLine: "Found the small slice of card accounts behind an outsized share of fraud losses.",
    summary: "Investigated synthetic identity fraud in the Target Circle Card portfolio using portfolio and credit bureau data.",
    details: [
      "Segmented accounts and evaluated anomalous behaviors and loss patterns to surface fraud indicators.",
      "Partnered with a fraud SME and consumer credit stakeholders to turn findings into business insights.",
    ],
    metric: { value: "~7%", label: "of loss dollars came from ~0.25% of accounts" },
    tools: ["Python", "SQL", "SAS"],
  },
  {
    title: "Scribe Bot",
    context: "Self-hosted app · Personal project",
    status: "Coming soon",
    oneLine: "A private app that turns recorded conversations into searchable transcripts, tasks, and decisions.",
    summary: "A private, self-hosted app that turns recorded conversations into searchable transcripts, tasks, decisions, and people notes.",
    shots: [
      { src: "/projects/scribe-bot.jpg", alt: "Scribe Bot's Today page in Demo mode with sample meetings", width: 1200, height: 806, caption: "Speech recognition and speaker ID run locally on a home server. Audio never leaves my devices, and private meetings never touch a cloud AI." },
    ],
    tools: ["Python", "FastAPI", "sherpa-onnx", "Claude"],
    next: ["A public demo with sample data."],
  },
  {
    title: "Downstream",
    context: "Proposed OMSA capstone with Frontier Commons and IFI",
    status: "In progress",
    oneLine: "Shows IFI which U.S. cities to check on when a crisis hits international students' home countries.",
    summary:
      "A tool I'm building for IFI, which serves international students. When a crisis hits a country, it shows which U.S. cities have the most students from there, so staff know where to check in first.",
    shots: [
      desk("/projects/downstream.jpg", "Downstream map of U.S. metros ranked by priority score for a rising country signal (mock data)", "I'm building the dataset: how many students from each country study in each U.S. metro, from public government and university data."),
      desk("/projects/downstream-digest.jpg", "Downstream weekly digest preview: a short Monday email listing places to check in on (mock data)", "Staff get a short Monday email with the top places to check in on, and mark each flag useful or not."),
      desk("/projects/downstream-score.jpg", "How the Downstream priority score works, with adjustable assumptions and a worked example (mock data)", "Every ranking is explained: how unstable the country is this week, times how many of its students are in that place."),
    ],
    tools: ["JavaScript", "D3", "Supabase"],
    links: [{ href: "https://downstream-map.vercel.app/?demo=1", label: "Try the demo" }],
    next: ["Collecting and joining the real data. The prototype runs on mock data and has a no-signup demo."],
  },
  {
    title: "Splitwise clone",
    context: "Frontier Commons Build Bootcamp",
    status: "Live",
    oneLine: "Share costs in a group, split them five ways, and settle up in the fewest payments.",
    summary: "A working clone of Splitwise, the app for sharing costs: create or join a group, add shared expenses, and see who owes whom.",
    details: [
      "Split a cost equally, by exact amounts, percentages, or shares, or item by item with tax and tip shared.",
      "Suggests the fewest payments to settle up, in multiple currencies, plus receipts, recurring expenses, and charts.",
      "Free to use with an email sign-up. No money moves through the app; it only keeps track of who owes what.",
    ],
    metric: { value: "5 ways", label: "to split a cost, with a live per-person preview" },
    tools: ["Next.js", "TypeScript", "Supabase"],
    links: [
      { href: "https://splitwise-clone-three-theta.vercel.app", label: "Try it" },
      { href: "https://github.com/branmuffn/splitwise-clone", label: "GitHub" },
    ],
    next: ["A no-signup demo mode, so anyone can try it without creating an account."],
  },
  {
    title: "Pledge reconciliation dashboard",
    context: "Frontier Commons Technical Challenge · Aug 2026",
    oneLine: "Checks donors' pledges against their actual gifts to show how much support is really committed.",
    summary:
      "A Streamlit dashboard that checks donors' stated pledges against their actual gift history, from a deliberately messy ledger with four currencies and mixed formats.",
    shots: [
      desk("/projects/pledge-dashboard.jpg", "Pledge reconciliation dashboard showing valid monthly support, goal progress and excluded pledges", "Monthly support and goal progress, judged from actual gifts rather than the status column."),
      desk("/projects/pledge-breakdown.jpg", "Pledge dashboard: excluded pledges broken down by reason and lost monthly value", "Each excluded pledge gets exactly one reason, so nothing is double-counted."),
      desk("/projects/pledge-lapsed.jpg", "Pledge dashboard: the lapsed pledges table, with days since each donor's last gift (sample data)", "Every row is counted or listed with why, and the logic is covered by 24 automated tests."),
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
    oneLine: "An AI model on Azure that classifies unstructured vendor inspection reports.",
    summary: "Developed a model to analyze and categorize unstructured vendor inspection reports.",
    details: [
      "Partnered with SMEs to define the taxonomy, evaluation criteria, and measurable outputs.",
      "Documented workflows and repeatable analysis steps for consistent classification and reporting.",
    ],
    tools: ["Azure", "AI / ML"],
  },
  {
    title: "Self-hosted automation and local AI",
    context: "Personal infrastructure",
    oneLine: "n8n automation workflows and local LLMs running in Docker on my own server.",
    summary: "Built and maintain n8n automation workflows running in Docker on my own server hardware, alongside local LLMs.",
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
      "Won Best of the Ministry Track ($20K team prize) at the 2026 Gloo AI Hackathon (1,000+ participants) with OnBoard, a privacy-first app for missionaries to send prayer updates and newsletters.",
      "Built and iterated on OnBoard prototypes and demo pitches with the technical lead, using feedback from missionaries, campus ministers, and mentors.",
      "Developed and deployed full-stack web apps with Claude Code, Next.js, Supabase, and Vercel, with user accounts and real-time updates.",
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
