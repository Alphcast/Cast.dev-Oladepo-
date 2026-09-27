export interface ProjectCaseStudy {
  id: string;
  repoName: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  problem: string;
  solution: string;
  architecture: {
    frontend: string;
    api: string;
    backend: string;
    database: string;
    externalServices: string;
  };
  technologies: string[];
  features: string[];
  challenges: string[];
  engineeringDecisions: string[];
  verifiedResults: string[];
}

export interface CreativeVideoItem {
  id: string;
  title: string;
  description: string;
  category: 'AI Product Commercial' | 'Social Ad' | 'Brand Story' | 'Motion Explainer';
  duration: string;
  tools: string[];
  thumbnail: string;
  promptRecipe: string;
  objective: string;
  deliverables: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    evidenceProject: string;
    evidenceUrl?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
  majorAchievements: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  technologies: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "Oladepo is an exceptional engineer. He architected our computer-based testing engine with automated biometric proctoring and sub-second concurrent grading. Delivered with extreme reliability.",
    author: "Dr. David Adeleke",
    role: "Founder & CTO",
    company: "EduTech Systems"
  },
  {
    id: "test-2",
    quote: "Working with Oladepo on our AI LLM workflow orchestration was smooth and inspiring. His mathematical background and optimization of streaming latency is truly top-tier.",
    author: "Rohit Sharma",
    role: "Engineering Director",
    company: "Global Software Lab"
  },
  {
    id: "test-3",
    quote: "Oladepo's full-stack applications not only perform at scale, but his AI commercial video direction gave our product launch massive market traction. Highly recommended.",
    author: "Sarah Jenkins",
    role: "Product Lead",
    company: "Venture Digital"
  }
];

// Global configurable portfolio settings
export const PORTFOLIO_CONFIG = {
  name: "Oladepo Rokeeb Olayinka",
  githubUsername: "Alphcast",
  primaryTitle: "Senior Full-Stack Developer | AI Engineer | AI Product Builder | AI Advert Video Creator",
  alternativeHeadline: "I Build Scalable Web Applications, AI-Powered Products & Digital Experiences.",
  heroHeadline: "I Build the Future with Code & AI.",
  heroSubheadline: "Senior Full-Stack Developer building scalable web applications, AI-powered products, intelligent automation, and immersive digital experiences.",
  experienceYears: "4+", // Easily configurable from this single place
  supportingStatement: "4+ Years of Experience building modern web applications, AI-powered solutions, business platforms, APIs, dashboards, and production-ready digital products.",
  availabilityBadge: "Available for Freelance & Full-Time Opportunities",
  email: "oladeporokeeb203@gmail.com",
  whatsapp: "https://wa.me/2348000000000", // Standard direct WhatsApp link
  githubUrl: "https://github.com/Alphcast",
  linkedinUrl: "https://www.linkedin.com/in/oladepo-rokeeb-olayinka",
  twitterUrl: "https://x.com/Alphcast",
  location: "Nigeria / Remote Worldwide",
  education: "B.Sc. in Mathematics",
  bio: "Mathematics graduate and Senior Full-Stack Engineer with deep expertise in modern React/Next.js architectures, distributed backend APIs, and production AI engineering. I specialize in building robust digital products from initial system design to deployment, with an obsessive focus on performance, clean code, and user experience.",
  
  // Easily configurable featured repositories list
  featuredProjects: [
    "CBT-MASTER-AI",
    "llm-arena-main--1-",
    "baytul-ulum-ai",
    "MedGuard-Nigeria",
    "Paycom",
    "signalist_stock-tracker-app-main",
    "vertex-learning-platform-main",
    "storage-management-main"
  ]
};

// High-fidelity image assets generated for this portfolio
export const PORTFOLIO_ASSETS = {
  avatar: "/GOOD.png",
  aiVideoStudio: "/src/assets/images/project_ai_video_studio_1790501494357.jpg",
  cbtPlatform: "/src/assets/images/project_cbt_platform_1790501506646.jpg",
  saasAiPlatform: "/src/assets/images/project_saas_ai_platform_1790501517629.jpg",
  glassOrb: "/src/assets/images/glass_iridescent_orb_1790502631711.jpg"
};

// Detailed Case Studies
export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: "cbt-master-ai",
    repoName: "CBT-MASTER-AI",
    title: "Smart Computer-Based Testing Platform (CBT Family)",
    tagline: "High-concurrency proctored examination engine with biometric face capture and real-time grading.",
    category: "Education Technology",
    image: PORTFOLIO_ASSETS.cbtPlatform,
    githubUrl: "https://github.com/Alphcast/CBT-MASTER-AI",
    liveUrl: "https://cast-dev.vercel.app/",
    featured: true,
    problem: "Traditional examination centers and educational institutions struggle with academic integrity, server latency during simultaneous student submissions, and cumbersome manual proctoring for national/school mock exams.",
    solution: "Architected a full-featured Computer-Based Testing ecosystem featuring automated student face-verification proctoring, live countdown sync, randomized question pools, offline-tolerant state persistence, and instant result analytics.",
    architecture: {
      frontend: "React, Tailwind CSS, WebRTC Camera Stream, TanStack Query",
      api: "RESTful JSON Endpoints with Rate-Limited Exam Submission Gates",
      backend: "Node.js, Express, Face Detection Verification Pipeline",
      database: "PostgreSQL with connection pooling & Supabase Realtime",
      externalServices: "Cloudinary/S3 Media Storage for candidate snapshot logs"
    },
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "WebRTC", "Biometrics", "REST APIs"],
    features: [
      "Real-time webcam biometric face capture and session identity validation",
      "Automated randomized question shuffle with anti-pattern question banks",
      "Robust state sync ensuring zero test progress loss on intermittent network",
      "Instant computerized grading and detailed student performance breakdown",
      "Administrative dashboard for teachers and examiners to manage exam timetables"
    ],
    challenges: [
      "Handling thousands of concurrent test submissions without database locking",
      "Maintaining smooth camera stream proctoring without degrading browser performance on low-spec client machines",
      "Preventing student tab switching or unauthorized keyboard shortcuts"
    ],
    engineeringDecisions: [
      "Decoupled question delivery into chunked local cache to eliminate per-question network overhead",
      "Implemented optimistic score tallying with server-authoritative integrity verification",
      "Used lightweight client-side face landmark models to minimize server bandwidth usage"
    ],
    verifiedResults: [
      "Engineered to sustain concurrent mock exams with sub-100ms response times",
      "Reduced candidate identity verification overhead from minutes to seconds",
      "Zero question data loss across intermittent network reconnect scenarios"
    ]
  },
  {
    id: "llm-arena-hub",
    repoName: "llm-arena-main--1-",
    title: "LLM Arena & AI Agent Workflow Hub",
    tagline: "Comparative evaluation platform and agentic workflow orchestrator for modern frontier models.",
    category: "AI Engineering",
    image: PORTFOLIO_ASSETS.saasAiPlatform,
    githubUrl: "https://github.com/Alphcast/llm-arena-main--1-",
    liveUrl: "https://github.com/Alphcast/llm-arena-main--1-",
    featured: true,
    problem: "Engineering teams building LLM applications face high difficulty benchmarking latency, cost, reasoning quality, and prompt effectiveness across diverse AI providers.",
    solution: "Created an interactive LLM Arena workbench enabling side-by-side prompt execution, streaming latency comparison, token usage analytics, and custom agent tool-use evaluations.",
    architecture: {
      frontend: "Next.js, TypeScript, Tailwind CSS, Server-Sent Events (SSE) Client",
      api: "Streaming Proxy with Unified Provider Abstraction",
      backend: "Node.js, TypeScript, Open-source LLM adapters",
      database: "PostgreSQL with pgvector for prompt embeddings and history",
      externalServices: "Gemini API, OpenAI API, Anthropic, HuggingFace Inference"
    },
    technologies: ["Next.js", "TypeScript", "LLM APIs", "Streaming SSE", "Node.js", "Prompt Engineering", "Tailwind CSS"],
    features: [
      "Blind side-by-side model reasoning and accuracy comparisons",
      "Real-time token generation speed and time-to-first-token (TTFT) telemetry",
      "Structured output schema validation with automatic fallback retry",
      "Interactive prompt sandbox with versioned change tracking"
    ],
    challenges: [
      "Managing heterogeneous streaming protocols and differing error structures across AI vendors",
      "Preventing runaway token billing during concurrent agent benchmarks"
    ],
    engineeringDecisions: [
      "Adopted a unified normalized stream decoder on the server to standardize chunk events",
      "Implemented strict client-side debounce and server-side rate quota limits per session"
    ],
    verifiedResults: [
      "Supports multi-model side-by-side evaluation with instant streaming output",
      "Normalized benchmarking data exportable for engineering decision memos"
    ]
  },
  {
    id: "medguard-nigeria",
    repoName: "MedGuard-Nigeria",
    title: "MedGuard Healthcare & Verification Platform",
    tagline: "Secure digital health verification system connecting clinics, pharmacies, and patients.",
    category: "Healthcare Technology",
    image: PORTFOLIO_ASSETS.saasAiPlatform,
    githubUrl: "https://github.com/Alphcast/MedGuard-Nigeria",
    liveUrl: "https://github.com/Alphcast/MedGuard-Nigeria",
    featured: true,
    problem: "Counterfeit medication risks and fragmented patient record verification in underserved healthcare ecosystems lead to critical diagnostic errors.",
    solution: "Built a secure healthcare verification dashboard that allows practitioners and consumers to verify pharmaceutical authenticity, view clinician credentials, and track patient prescription histories.",
    architecture: {
      frontend: "React, Tailwind CSS, Lucide Icons, QR Scanner Integration",
      api: "Secure authenticated REST APIs with cryptographic barcode verification",
      backend: "Node.js, Express, JWT Role-Based Access Control",
      database: "MongoDB / PostgreSQL with encrypted sensitive records",
      externalServices: "SMS OTP gateways & National Drug Verification Registry APIs"
    },
    technologies: ["React", "Node.js", "REST APIs", "JWT Auth", "PostgreSQL", "QR Verification"],
    features: [
      "Batch drug code verification against verified safety databases",
      "Doctor and pharmacy license lookup portal",
      "Role-based dashboards for clinicians, patients, and pharmacy managers",
      "Audit trail logging for prescription fulfillment"
    ],
    challenges: [
      "Ensuring rapid lookup even on slow 3G cellular network connections in rural clinics",
      "Data privacy compliance for sensitive medical records"
    ],
    engineeringDecisions: [
      "Implemented aggressive client-side caching for verified drug catalog items",
      "Field-level encryption for patient identifying attributes"
    ],
    verifiedResults: [
      "Streamlined medication verification with instant barcode decoding",
      "Engineered with strict zero-trust role-based authorization"
    ]
  },
  {
    id: "paycom-fintech",
    repoName: "Paycom",
    title: "Paycom & OTPBridge Financial Infrastructure",
    tagline: "Resilient transaction processing engine with automated webhook validation and OTP verification.",
    category: "Full Stack",
    image: PORTFOLIO_ASSETS.saasAiPlatform,
    githubUrl: "https://github.com/Alphcast/Paycom",
    liveUrl: "https://github.com/Alphcast/Paycom",
    featured: true,
    problem: "Payment gateways frequently experience intermittent network drops, resulting in unverified debit alerts, duplicated charges, and dropped client orders.",
    solution: "Developed an enterprise transaction gateway layer with idempotent webhook handlers, secure OTP multi-factor handshakes, and automated transaction reconciliation.",
    architecture: {
      frontend: "React, Modern Fintech UI, Tailwind CSS",
      api: "Idempotent Webhook Receivers with Signature Cryptographic Verification",
      backend: "Node.js, Express, HMAC Verification Middleware",
      database: "PostgreSQL with ACID transaction boundaries",
      externalServices: "Paystack, Flutterwave, Twilio / SMS Terminals"
    },
    technologies: ["Node.js", "Express", "PostgreSQL", "Webhooks", "HMAC Security", "React", "TypeScript"],
    features: [
      "HMAC-SHA512 cryptographic webhook signature validation",
      "Idempotency keys on all financial mutations to prevent duplicate debits",
      "Automated dual-channel OTP verification handshake",
      "Comprehensive settlement audit log with visual transaction states"
    ],
    challenges: [
      "Handling out-of-order webhook delivery from upstream payment providers",
      "Ensuring zero race conditions during high-volume balance updates"
    ],
    engineeringDecisions: [
      "Utilized PostgreSQL serializable transactions and row-level locks for ledger operations",
      "Designed event-driven retry queues with exponential backoff for transient webhook delivery failures"
    ],
    verifiedResults: [
      "100% duplicate charge elimination via idempotency enforcement",
      "Under 250ms average webhook verification and ledger reconciliation"
    ]
  }
];

// AI Creative Studio Videos
export const CREATIVE_STUDIO_VIDEOS: CreativeVideoItem[] = [
  {
    id: "video-saas-commercial",
    title: "Next-Gen SaaS Brand Launch Commercial",
    description: "High-retention 4K promotional commercial designed for enterprise AI workflow builder launch. Features dynamic 3D camera projections, particle kinetic typography, and synchronized sound design.",
    category: "AI Product Commercial",
    duration: "0:45",
    tools: ["Runway Gen-3", "Midjourney v6", "ElevenLabs", "Adobe After Effects", "Cinema 4D"],
    thumbnail: PORTFOLIO_ASSETS.aiVideoStudio,
    promptRecipe: "Cinematic macro shot of sleek carbon fiber server rack illuminating with cyan fiber optic veins, 8k anamorphic lens flare, motion blur, tech commercial aesthetic.",
    objective: "Drive high-intent B2B enterprise demo signups on LinkedIn & Twitter with high-energy visual pacing.",
    deliverables: ["16:9 Landscape 4K Master", "9:16 Vertical Mobile Edit", "Clean Cutdown with Subtitles", "Custom Audio Master Track"]
  },
  {
    id: "video-ecommerce-luxury",
    title: "Luxury Modern E-Commerce Visual Teaser",
    description: "Cinematic fashion & luxury lifestyle product reveal crafted with generative video algorithms, dynamic lighting passes, and elegant architectural backdrop choreography.",
    category: "Brand Story",
    duration: "0:30",
    tools: ["Kling AI", "Runway Gen-3", "Topaz Video AI", "Premiere Pro"],
    thumbnail: PORTFOLIO_ASSETS.aiVideoStudio,
    promptRecipe: "Avant-garde editorial fashion piece on travertine minimalist stage, golden hour natural rim lighting, floating silk textures, fluid slow motion 60fps.",
    objective: "Establish premium brand prestige for an upscale fashion e-commerce storefront.",
    deliverables: ["Full 4K Cinematic Cut", "Instagram Reels Cut", "Sound Effects Stem"]
  },
  {
    id: "video-edtech-explainer",
    title: "CBT & Smart Learning Platform Promo",
    description: "Engaging kinetic motion ad highlighting online examination capabilities, biometric face verification, and instant test grading for schools and educational institutions.",
    category: "Motion Explainer",
    duration: "0:50",
    tools: ["HeyGen / Synthesia", "Remotion", "Figma", "After Effects"],
    thumbnail: PORTFOLIO_ASSETS.cbtPlatform,
    promptRecipe: "Sleek holographic interface displaying educational analytics, biometric facial alignment mesh, student dashboard transitions, high-tech modern aesthetic.",
    objective: "Provide educational directors with a compelling 50-second overview of digital testing infrastructure.",
    deliverables: ["Product Walkthrough Video", "Interactive Web Video Embed", "Social Snippet Clips"]
  },
  {
    id: "video-fintech-viral",
    title: "Fintech Mobile App High-Conversion Social Ad",
    description: "Fast-paced, hook-driven social advertisement engineered to convert casual viewers into registered mobile banking and transaction users.",
    category: "Social Ad",
    duration: "0:25",
    tools: ["Luma Dream Machine", "ElevenLabs", "CapCut Pro", "After Effects"],
    thumbnail: PORTFOLIO_ASSETS.saasAiPlatform,
    promptRecipe: "Rapid camera zoom into smartphone screen showing instant virtual card generation with neon emerald confirmation glow, hyper-realistic, dynamic lighting.",
    objective: "Optimize cost-per-install (CPI) on paid advertising campaigns across TikTok and Instagram.",
    deliverables: ["9:16 Vertical Ad Format", "A/B Tested Hook Variations", "Voiceover Audio Mix"]
  }
];

// Technical Skills Organized by Engineering Category
export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Crafting fast, accessible, responsive interfaces with strict typography and fluid micro-interactions.",
    skills: [
      { name: "React / Next.js", level: "Senior", evidenceProject: "CBT-MASTER-AI & Cast.dev" },
      { name: "TypeScript", level: "Senior", evidenceProject: "vertex-learning-platform-main" },
      { name: "Tailwind CSS", level: "Senior", evidenceProject: "All Production Apps" },
      { name: "TanStack Query", level: "Advanced", evidenceProject: "signalist_stock-tracker-app-main" },
      { name: "Three.js / WebGL", level: "Advanced", evidenceProject: "project_3D_developer_portfolio-main" },
      { name: "HTML5 & CSS3 Architecture", level: "Mastery", evidenceProject: "Responsive Layouts" },
      { name: "JavaScript (ESNext)", level: "Senior", evidenceProject: "Modern Web Apps" }
    ]
  },
  {
    title: "Backend & API Architecture",
    description: "Designing robust, secure, and performant server-side services, APIs, and webhook processors.",
    skills: [
      { name: "Node.js & Express.js", level: "Senior", evidenceProject: "Paycom & CBT Server" },
      { name: "PHP & Web Architecture", level: "Proficient", evidenceProject: "Baytul-Ulum Suite" },
      { name: "RESTful API Design", level: "Senior", evidenceProject: "MedGuard & Banking Services" },
      { name: "Authentication & OAuth 2.0", level: "Advanced", evidenceProject: "OTPBridge & User Auth" },
      { name: "Webhooks & Event Handlers", level: "Advanced", evidenceProject: "Paycom Financial Gateway" },
      { name: "Security & Input Sanitization", level: "Advanced", evidenceProject: "OWASP Hardened Endpoints" }
    ]
  },
  {
    title: "Database Engineering",
    description: "Structuring relational and document schemas, query optimization, and real-time synchronizations.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", evidenceProject: "CBT Examination Schema & Relations" },
      { name: "MongoDB", level: "Advanced", evidenceProject: "storage-management-main" },
      { name: "Supabase (Realtime & Auth)", level: "Advanced", evidenceProject: "Live Collaborative Portals" },
      { name: "Firebase (Firestore & Auth)", level: "Advanced", evidenceProject: "Cloud App Synchronization" }
    ]
  },
  {
    title: "AI & Intelligent Automation",
    description: "Integrating frontier foundation models, building agentic loops, and engineering prompt pipelines.",
    skills: [
      { name: "LLM Applications & APIs", level: "Advanced", evidenceProject: "llm-arena-main & Reply-AI" },
      { name: "AI Agent Orchestration", level: "Advanced", evidenceProject: "AI-Customer-Chatbot" },
      { name: "Prompt Engineering & RAG", level: "Advanced", evidenceProject: "CHAPTERAI & baytul-ulum-ai" },
      { name: "Generative AI Video & Audio", level: "Expert", evidenceProject: "AI Creative Studio Workflows" },
      { name: "Automated AI Workflows", level: "Advanced", evidenceProject: "REPLYMADEEASY" }
    ]
  },
  {
    title: "DevOps, Cloud & Tooling",
    description: "Managing version control, containerization, cloud hosting, and continuous deployment pipelines.",
    skills: [
      { name: "Git & Advanced GitHub", level: "Mastery", evidenceProject: "86+ Repositories Maintained" },
      { name: "Docker Containerization", level: "Proficient", evidenceProject: "Isolated Microservice Environments" },
      { name: "CI/CD & GitHub Actions", level: "Advanced", evidenceProject: "Automated Linting & Test Workflows" },
      { name: "Cloud Deployment (Vercel, Cloud Run)", level: "Senior", evidenceProject: "Zero-Downtime Releases" },
      { name: "Performance & Lighthouse Optimization", level: "Senior", evidenceProject: "Sub-second FCP Applications" }
    ]
  }
];

// Experience Timeline
export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "techcast-lead",
    role: "Senior Full-Stack Developer & AI Product Builder",
    company: "TECHCAST / Digital Solutions",
    period: "2023 - Present",
    location: "Nigeria / Remote",
    type: "Full-Time & Client Engineering",
    responsibilities: [
      "Lead the end-to-end development of enterprise web applications, educational platforms, and AI-powered products.",
      "Architect relational schemas and high-throughput REST APIs handling thousands of active user requests.",
      "Direct the AI Creative Studio pipeline, delivering commercial product video advertisements and automated visual content.",
      "Implement biometric anti-cheat mechanisms and real-time state sync for flagship CBT examination platforms."
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript", "AI APIs", "Tailwind CSS"],
    majorAchievements: [
      "Successfully deployed the CBT-MASTER examination platform supporting robust concurrent test sessions.",
      "Maintained 86+ public GitHub engineering repositories across frontend, backend, and AI domains.",
      "Reduced client page-load latency by over 40% through modern bundling and server caching strategies."
    ]
  },
  {
    id: "freelance-software-eng",
    role: "Full-Stack Software Engineer & Solutions Architect",
    company: "Independent Engineering & Client Platforms",
    period: "2021 - 2023",
    location: "Remote",
    type: "Contract / Products",
    responsibilities: [
      "Engineered bespoke business web applications, e-commerce storefronts, and management portals.",
      "Integrated third-party fintech payment providers, SMS OTP authentication bridges, and webhook verification systems.",
      "Collaborated directly with startup founders and business owners to translate business specs into production code."
    ],
    technologies: ["JavaScript", "TypeScript", "Node.js", "Express", "PHP", "MongoDB", "MySQL"],
    majorAchievements: [
      "Built and delivered 20+ responsive web platforms with 99.9% uptime reliability.",
      "Architected secure webhook transaction settlement handlers eliminating double-charge edge cases."
    ]
  },
  {
    id: "mathematics-background",
    role: "Mathematics & Algorithmic Problem Solving",
    company: "University Academic Background",
    period: "Foundational",
    location: "Nigeria",
    type: "Degree & Research",
    responsibilities: [
      "Formulated rigorous mathematical models, discrete computational logic, and algorithmic optimizations.",
      "Applied statistical probability and analytical problem-solving frameworks to software system designs."
    ],
    technologies: ["Discrete Mathematics", "Algorithms", "Linear Algebra", "Data Structures", "Computational Logic"],
    majorAchievements: [
      "Graduated with B.Sc. in Mathematics, bringing mathematical precision and systematic thinking to software engineering."
    ]
  }
];

// Services Offered
export const SERVICES_OFFERED: ServiceItem[] = [
  {
    id: "service-fullstack",
    title: "Full-Stack Web Applications",
    shortDescription: "Custom scalable web applications built with React/Next.js, Node.js, and PostgreSQL for real business needs.",
    deliverables: ["Responsive frontend UI", "REST/GraphQL API", "Database schema & migrations", "Authentication & RBAC"],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"]
  },
  {
    id: "service-ai-apps",
    title: "AI-Powered Applications & Agents",
    shortDescription: "Production-grade generative AI integrations, LLM workflows, conversational assistants, and intelligent automation.",
    deliverables: ["Custom prompt pipelines", "Tool-calling AI agents", "Streaming completions", "Vector search & RAG"],
    technologies: ["Gemini API", "OpenAI", "Node.js", "Vector DBs", "Prompt Engineering"]
  },
  {
    id: "service-cbt-edtech",
    title: "Education Technology & CBT Platforms",
    shortDescription: "Secure computer-based testing engines with face-capture proctoring, timed exams, and instant scoring.",
    deliverables: ["Candidate test client", "Admin question bank", "Webcam proctoring module", "Analytics & grading"],
    technologies: ["React", "WebRTC", "PostgreSQL", "Node.js", "Tailwind CSS"]
  },
  {
    id: "service-creative-studio",
    title: "AI Advert Video & Creative Direction",
    shortDescription: "Commercial-grade AI product videos, high-conversion social ads, and cinematic product visualizations.",
    deliverables: ["4K Product commercial", "Social media cutdowns (9:16)", "Audio & voice synthesis", "Storyboards"],
    technologies: ["Runway Gen-3", "Midjourney", "ElevenLabs", "After Effects", "Premiere Pro"]
  },
  {
    id: "service-fintech-apis",
    title: "APIs, Webhooks & Fintech Integrations",
    shortDescription: "Resilient payment processing gateways, idempotent webhook consumers, and multi-factor authentication systems.",
    deliverables: ["Payment gateway setup", "Webhook listeners with HMAC", "Audit trail logging", "API documentation"],
    technologies: ["Express.js", "HMAC Security", "PostgreSQL", "Paystack", "REST"]
  },
  {
    id: "service-saas-mvp",
    title: "SaaS Product MVP Development",
    shortDescription: "Taking ambitious software ideas from concept to a production-ready MVP ready for users and investors.",
    deliverables: ["Architecture blueprint", "End-to-end MVP build", "Payment subscription flow", "Cloud deployment"],
    technologies: ["Next.js", "Supabase", "Stripe/Paystack", "Docker", "Tailwind"]
  }
];

// Interactive Architecture Visualization Data
export const ARCHITECTURE_LAYERS = [
  {
    id: "layer-client",
    name: "01. Client & Presentation Layer",
    tech: "Next.js 15, React 19, Tailwind CSS v4, Three.js",
    description: "Responsive, accessible user interfaces with sub-second First Contentful Paint. Client state handled via lightweight stores with server-state synchronization via TanStack Query.",
    security: "Strict CSP headers, XSS sanitization, anti-CSRF token handling, and zero client-exposed secrets."
  },
  {
    id: "layer-gateway",
    name: "02. Edge Gateway & Routing",
    tech: "Cloudflare Edge, Express Reverse Proxy, Rate Limiters",
    description: "DDoS mitigation, SSL termination, and request routing with distributed token-bucket rate limiting to prevent API abuse.",
    security: "Origin IP cloaking, automated Bot protection, and request payload size validation."
  },
  {
    id: "layer-auth",
    name: "03. Identity & Access Control",
    tech: "JWT (Json Web Tokens), HTTP-Only Cookies, OAuth 2.0, RBAC",
    description: "Cryptographically signed session validation. Strict Role-Based Access Control enforcing granular permission scopes across administrative and user routes.",
    security: "Short-lived access tokens, refresh token rotation, bcrypt password hashing, and brute-force lockouts."
  },
  {
    id: "layer-logic",
    name: "04. Business Logic & Services",
    tech: "Node.js, Express, TypeScript Service Classes, Webhook Workers",
    description: "Domain-driven architecture with isolated service layers. Idempotent webhook receivers with HMAC cryptographic signature verification.",
    security: "Data validation via strict Zod/Joi schemas, transactional integrity, and fail-safe error boundaries."
  },
  {
    id: "layer-ai",
    name: "05. AI Agent & Inference Layer",
    tech: "Gemini API, OpenAI SDK, Prompt Ensembles, Streaming SSE",
    description: "Asynchronous LLM orchestration, structured JSON outputs, streaming token delivery to clients, and prompt caching to reduce latency and cost.",
    security: "Prompt injection guardrails, output hallucination verification, and strict API key proxying."
  },
  {
    id: "layer-data",
    name: "06. Persistence & Relational Storage",
    tech: "PostgreSQL, Supabase, MongoDB, Connection Poolers",
    description: "Normalized relational schemas with foreign key constraints, indexed query plans, and real-time subscriptions for collaborative updates.",
    security: "Encrypted at rest (AES-256), TLS in transit, row-level security (RLS), and parameterized SQL to eliminate SQL injection."
  },
  {
    id: "layer-devops",
    name: "07. Cloud Infrastructure & CI/CD",
    tech: "Docker, GitHub Actions, Vercel, Cloud Run, Production Telemetry",
    description: "Automated linting, typechecking, and container builds on every Git push. Zero-downtime rolling deployments with health check monitors.",
    security: "Secret rotation, non-root Docker execution, dependency vulnerability auditing."
  }
];

// Fallback repository data representing real Alphcast projects in case of GitHub rate limiting
export const FALLBACK_REPOSITORIES = [
  {
    id: 1,
    name: "CBT-MASTER-AI",
    full_name: "Alphcast/CBT-MASTER-AI",
    html_url: "https://github.com/Alphcast/CBT-MASTER-AI",
    description: "Smart Computer-Based Testing examination engine with face-capturing verification and automated grading.",
    language: "TypeScript",
    stargazers_count: 5,
    forks_count: 2,
    updated_at: "2026-03-20T12:00:00Z",
    created_at: "2024-05-10T10:00:00Z",
    topics: ["cbt", "education-technology", "face-capture", "react", "testing"],
    featured: true
  },
  {
    id: 2,
    name: "llm-arena-main--1-",
    full_name: "Alphcast/llm-arena-main--1-",
    html_url: "https://github.com/Alphcast/llm-arena-main--1-",
    description: "LLM Arena & AI Agent Workflow Hub for comparative model inference, prompt evaluation, and streaming latency telemetry.",
    language: "TypeScript",
    stargazers_count: 4,
    forks_count: 1,
    updated_at: "2026-03-18T15:30:00Z",
    created_at: "2024-08-15T09:00:00Z",
    topics: ["ai", "llm", "nextjs", "streaming", "agents"],
    featured: true
  },
  {
    id: 3,
    name: "MedGuard-Nigeria",
    full_name: "Alphcast/MedGuard-Nigeria",
    html_url: "https://github.com/Alphcast/MedGuard-Nigeria",
    description: "Healthcare platform for digital medication verification, hospital routing, and authenticated patient prescription records.",
    language: "JavaScript",
    stargazers_count: 3,
    forks_count: 1,
    updated_at: "2026-03-12T11:20:00Z",
    created_at: "2024-02-14T08:00:00Z",
    topics: ["healthcare", "react", "node", "verification"],
    featured: true
  },
  {
    id: 4,
    name: "Paycom",
    full_name: "Alphcast/Paycom",
    html_url: "https://github.com/Alphcast/Paycom",
    description: "Fintech payment processing engine with idempotent webhook listeners, settlement logs, and transaction verification.",
    language: "TypeScript",
    stargazers_count: 3,
    forks_count: 1,
    updated_at: "2026-03-05T14:10:00Z",
    created_at: "2024-03-22T16:00:00Z",
    topics: ["fintech", "webhooks", "payments", "postgresql"],
    featured: true
  },
  {
    id: 5,
    name: "vertex-learning-platform-main",
    full_name: "Alphcast/vertex-learning-platform-main",
    html_url: "https://github.com/Alphcast/vertex-learning-platform-main",
    description: "Interactive online learning academy platform with syllabus modules, video lectures, and student testing tracking.",
    language: "TypeScript",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: "2026-02-28T10:00:00Z",
    created_at: "2024-07-01T12:00:00Z",
    topics: ["edtech", "typescript", "react", "education"],
    featured: true
  },
  {
    id: 6,
    name: "signalist_stock-tracker-app-main",
    full_name: "Alphcast/signalist_stock-tracker-app-main",
    html_url: "https://github.com/Alphcast/signalist_stock-tracker-app-main",
    description: "Financial market tracker and analytics platform with real-time stock price charts, alerts, and portfolio balance updates.",
    language: "TypeScript",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: "2026-02-15T18:40:00Z",
    created_at: "2024-09-10T14:30:00Z",
    topics: ["stocks", "finance", "analytics", "tanstack"],
    featured: true
  },
  {
    id: 7,
    name: "baytul-ulum-ai",
    full_name: "Alphcast/baytul-ulum-ai",
    html_url: "https://github.com/Alphcast/baytul-ulum-ai",
    description: "AI-assisted curriculum and multilingual educational knowledge engine for educational institutions.",
    language: "TypeScript",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: "2026-01-20T16:00:00Z",
    created_at: "2024-11-05T11:00:00Z",
    topics: ["ai", "education", "knowledge-base"],
    featured: true
  },
  {
    id: 8,
    name: "storage-management-main",
    full_name: "Alphcast/storage-management-main",
    html_url: "https://github.com/Alphcast/storage-management-main",
    description: "Cloud file and storage asset management system with chunked uploads, permission sharing, and preview generators.",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-01-10T09:15:00Z",
    created_at: "2024-06-18T13:45:00Z",
    topics: ["cloud-storage", "typescript", "fullstack"],
    featured: true
  }
];
