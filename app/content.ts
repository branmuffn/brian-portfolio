// All site copy lives here. Edit this file to update the page.

export const profile = {
  name: "Brian Tea, P.E.",
  tagline: "Engineer. Learner. Builder.",
  headline: "Tinkering with AI to make games, tools, and things that (mostly) work.",
  intro: [
    "I spent six years at Dow Chemical leading engineering programs up to $55M, then spent summer 2026 at TD Bank digging into synthetic identity fraud with Python, SQL, and SAS.",
    "Now I'm finishing a Master's in Analytics at Georgia Tech and building with data, automation, and AI. Recent projects include an award-winning app for missionaries, a private transcription app, and a browser game.",
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

// title: the screen's name; caption: what it shows and why it matters (one sentence)
export type Shot = { src: string; alt: string; width: number; height: number; title?: string; caption?: string };

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

const desk = (src: string, alt: string, title: string, caption: string, height = 1500): Shot => ({ src, alt, width: 2400, height, title, caption });

export const projects: Project[] = [
  {
    title: "OnBoard",
    context: "Gloo AI Hackathon 2026 · Team project",
    award: "Winner, Best of the Ministry Track · $20,000 team prize",
    status: "Ongoing",
    cardBadge: "Winner · $20K prize",
    oneLine: "Turns moments from the field into prayer requests and newsletters, without exposing the people missionaries serve.",
    summary:
      "A mobile app that helps missionaries and small or understaffed ministries turn moments from the field into prayer requests and newsletters.",
    shots: [
      { src: "/projects/onboard.jpg", alt: "OnBoard worker home screen with recent moments and prayer requests (sample data)", width: 2400, height: 1500, title: "Home", caption: "Capture a moment in seconds, see today's prayers, and get AI suggestions for who to check in on." },
      { src: "/projects/onboard-letter.jpg", alt: "OnBoard letter editor with related notes from the notebook alongside (sample data)", width: 2400, height: 1500, title: "Letter editor", caption: "AI drafts prayer requests and newsletters only from your own notes, shown alongside. No added facts or verses." },
      { src: "/projects/onboard-privacy.jpg", alt: "OnBoard privacy check flagging a student's full name before a letter is sent (sample data)", width: 2400, height: 1500, title: "Privacy check", caption: "Flags a student's full name and suggests \"A.\" instead. Nothing is sent until you approve each flag." },
      { src: "/projects/onboard-partner.jpg", alt: "OnBoard partner home with the latest update and today's prayer requests (sample data)", width: 2400, height: 1500, title: "Supporter app", caption: "Supporters see the latest update and today's prayer requests, pray along, and reply." },
    ],
    metric: { value: "5 of 7", label: "testers said sending an update felt faster than what they do now" },
    role: "Led the team, contributed ideas, built the prototype, and helped with the initial pitch.",
    team: "Christopher Lee, Thanh Tran, Rita Dong, Javier Soto, Jedidiah Gabrielle Santos, and me",
    tools: ["React", "Gloo AI Studio", "Gemini", "Whisper"],
    links: [{ href: "https://gloo.com/ai/hackathon/2026-winners", label: "Hackathon winners" }],
    next: ["Testing with missionaries and campus ministers."],
  },
  {
    title: "Frontline Squad",
    context: "Browser game · Personal project",
    status: "Live",
    oneLine: "A browser shooter with 13 modes, 9 maps, and 12-player multiplayer. No install, no account, no server.",
    summary:
      "A first-person shooter that runs in the browser with no install, no account, and no game server. Inspired by Combat Arms, with some Halo and Call of Duty mixed in. Plays on phones too, with touch controls.",
    shots: [
      { src: "/projects/frontline.jpg", alt: "Frontline Squad gameplay: a team deathmatch on the Gorge map", width: 2400, height: 1350, title: "Team deathmatch", caption: "One of 13 modes on 9 maps, with bots, vehicles, and up to 12 players peer to peer." },
      desk("/projects/frontline-menu.jpg", "Frontline Squad main menu with game modes, maps, bot skill and the map editor", "Main menu", "Pick a mode, map, and bot skill. The whole game is one HTML file, with art and sound generated in code.", 1350),
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
    metric: { value: "~7%", label: "of loss dollars came from ~0.25% of accounts" },
    tools: ["Python", "SQL", "SAS"],
  },
  {
    title: "Scribe Bot",
    context: "Self-hosted app · Personal project",
    status: "Open source",
    oneLine: "A private app that turns recorded conversations into searchable transcripts, tasks, and decisions.",
    summary: "A private, self-hosted app that turns recorded conversations into searchable transcripts, tasks, decisions, and people notes.",
    shots: [
      desk("/projects/scribe-bot-today.jpg", "Scribe Bot's Today page in Demo mode: next tasks and late promises from made-up meetings", "Today (demo data)", "Your next tasks and the promises others made to you, pulled from recorded conversations.", 1612),
      desk("/projects/scribe-bot-conversation.jpg", "A made-up Scribe Bot conversation with its summary, tasks and transcript", "A conversation", "Each conversation gets a summary, tasks both ways, decisions, and a transcript you can correct. Speech recognition runs on a home server.", 1612),
      desk("/projects/scribe-bot-tasks.jpg", "Scribe Bot's task list across all conversations (demo data)", "Tasks", "Every task from every conversation in one list, with due dates and who is waiting on whom.", 1612),
    ],
    tools: ["Python", "FastAPI", "sherpa-onnx", "Claude"],
    links: [{ href: "https://github.com/branmuffn/scribe-bot-demo", label: "GitHub" }],
  },
  {
    title: "Downstream",
    context: "Proposed OMSA capstone with Frontier Commons and IFI",
    status: "In progress",
    oneLine: "Shows IFI which U.S. cities to check on when a crisis hits international students' home countries.",
    summary:
      "A tool I'm building for IFI, which serves international students. When a crisis hits a country, it shows which U.S. cities have the most students from there, so staff know where to check in first.",
    shots: [
      desk("/projects/downstream.jpg", "Downstream map of U.S. metros ranked by priority score for a rising country signal (mock data)", "Map", "Pick a country with rising instability to see which U.S. metros have the most of its students, ranked."),
      desk("/projects/downstream-digest.jpg", "Downstream weekly digest preview: a short Monday email listing places to check in on (mock data)", "Weekly digest", "A short Monday email lists the top places to check in on, and staff mark each flag useful or not."),
      desk("/projects/downstream-score.jpg", "How the Downstream priority score works, with adjustable assumptions and a worked example (mock data)", "How the score works", "Every ranking is explained: how unstable the country is this week, times how many of its students are there."),
    ],
    tools: ["JavaScript", "D3", "Supabase"],
    links: [{ href: "https://downstream-map.vercel.app/?demo=1", label: "Try the demo" }],
    next: ["Building the real dataset of students by country for every U.S. metro, from public government and university data. The prototype runs on mock data."],
  },
  {
    title: "Splitwise clone",
    context: "Frontier Commons Build Bootcamp",
    status: "Live demo",
    oneLine: "Share costs in a group, split them five ways, and settle up in the fewest payments.",
    summary:
      "A working clone of Splitwise, the app for sharing costs. Free to use, and no money moves through it: it only keeps track of who owes whom. Try the demo without signing up.",
    shots: [
      desk("/projects/splitwise-group.jpg", "Splitwise clone group page with balances in two currencies and suggested payments (demo data)", "Group page", "Balances in two currencies and the fewest payments to settle up, with Remind and Record buttons."),
      desk("/projects/splitwise-itemized.jpg", "Splitwise clone itemized grocery expense with each person's share (demo data)", "Itemized expense", "Split a bill item by item, with tax shared in proportion. Equal, exact, percent, and shares work too."),
      desk("/projects/splitwise-charts.jpg", "Splitwise clone spending charts by category and month (demo data)", "Spending charts", "Spending by category and by month, converted to one currency at today's rates."),
    ],
    metric: { value: "5 ways", label: "to split a cost, with a live per-person preview" },
    tools: ["Next.js", "TypeScript", "Supabase"],
    links: [
      { href: "https://split-tea.vercel.app", label: "Try the demo", note: "no sign-up" },
      { href: "https://github.com/branmuffn/splitwise-clone", label: "GitHub" },
    ],
  },
  {
    title: "Pledge reconciliation dashboard",
    context: "Frontier Commons Technical Challenge · Aug 2026",
    oneLine: "Checks donors' pledges against their actual gifts to show how much support is really committed.",
    summary:
      "A Streamlit dashboard that checks donors' stated pledges against their actual gift history, from a deliberately messy ledger with four currencies and mixed formats.",
    shots: [
      desk("/projects/pledge-dashboard.jpg", "Pledge reconciliation dashboard showing valid monthly support, goal progress and excluded pledges", "Summary", "Monthly support and goal progress, judged from actual gifts rather than the ledger's status column."),
      desk("/projects/pledge-breakdown.jpg", "Pledge dashboard: excluded pledges broken down by reason and lost monthly value", "Unrealized support", "Excluded pledges grouped by reason, with the monthly value each one represents."),
      desk("/projects/pledge-lapsed.jpg", "Pledge dashboard: the lapsed pledges table, with days since each donor's last gift (sample data)", "Lapsed pledges", "Every excluded pledge is listed with its last gift, so no row disappears. Logic covered by 24 tests."),
    ],
    metric: { value: "71.8%", label: "of the $7,500 monthly goal is actually backed by recent gifts" },
    tools: ["Python", "pandas", "Streamlit"],
    links: [
      { href: "https://klrju2rpjcgffbf5yktsqp.streamlit.app/", label: "Live app", note: "may take ~30 s to wake" },
      { href: "https://github.com/branmuffn/fc-dashboard", label: "GitHub" },
    ],
  },
];

// How I build with AI (shown under Projects)
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
    title: "Innovation Fellow",
    org: "Frontier Commons",
    points: [
      "Led the six-person OnBoard team to Best of the Ministry Track ($20K team prize) at the 2026 Gloo AI Hackathon (1,000+ participants). OnBoard is a privacy-first app for missionaries to send prayer updates and newsletters, now being tested with missionaries and campus ministers.",
      "Built prototypes and demo pitches, shaped by feedback from missionaries, campus ministers, and mentors.",
      "Shipped full-stack web apps with Claude Code, Next.js, Supabase, and Vercel.",
    ],
    kind: "work",
  },
  {
    dates: "Jun – Aug 2026",
    title: "Graduate Leadership Program Intern, Consumer Products & Credit Management",
    org: "TD Bank",
    place: "Boston, MA",
    points: [
      "Investigated synthetic identity fraud in the Target Circle Card portfolio, analyzing portfolio and credit bureau data with Python, SQL, and SAS to find a high-risk segment: ~0.25% of accounts but ~7% of loss dollars.",
      "Segmented accounts and evaluated anomalous behaviors and loss patterns to surface potential fraud indicators for further investigation.",
      "Partnered with a fraud SME and consumer credit stakeholders to turn the findings into insights for fraud detection and portfolio strategy.",
    ],
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
      "Developed an AI model on Azure that classifies unstructured vendor inspection reports, with SMEs defining the categories and evaluation criteria.",
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
  "Building with AI": ["Claude Code", "Local LLMs (Ollama, MLX, llama.cpp)"],
  "Web & automation": ["Next.js", "TypeScript", "Supabase", "three.js", "Playwright", "Docker", "n8n", "Streamlit", "Azure"],
  Leadership: ["Technical program management", "Cross-functional teams"],
};
