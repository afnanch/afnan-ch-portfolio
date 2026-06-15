import {
  KPIStat,
  Experience,
  SkillCategory,
  Achievement,
  Project,
  Service,
  Testimonial,
  Certification
} from "./types";

export const HERO_KPIS: KPIStat[] = [
  { id: "kpi-1", metric: "50,000+", label: "Followers Grown", sublabel: "Organic Audience Acquisition" },
  { id: "kpi-2", metric: "10M+", label: "Monthly Views Generated", sublabel: "Viral Content Strategy" },
  { id: "kpi-3", metric: "5000+", label: "Inquiries Generated", sublabel: "Qualified Inbound Actions" },
  { id: "kpi-4", metric: "500+", label: "Videos Produced", sublabel: "High-Retention Reels & Ads" }
];

export const BIOGRAPHY = {
  name: "Afnan CH",
  title: "Digital Marketing Strategist & Performance Marketing Specialist",
  subtitles: [
    "Performance Marketing Expert",
    "SEO & Web Growth Specialist",
    "E-Commerce Growth Architect",
    "Short-Form Video Director"
  ],
  bioText: "A results-oriented growth engine with over 4 years of hands-on experience designing and executing cross-channel digital marketing campaigns that directly impact the bottom line. Specialized in high-ROAS paid media acquisition, technical SEO infrastructure, conversion rate optimization (CRO), and short-format viral video architecture.",
  highlights: [
    { title: "4+ Years Experience", desc: "Driving client volume across B2B, SaaS, Services, and E-commerce sectors." },
    { title: "High ad-spend accountability", desc: "Successfully scaled ad accounts from minor budgets to highly profitable scales." },
    { title: "Team Leadership", desc: "Directed cross-functional marketing squads, developers, content creators, and copywriters." },
    { title: "Trainer & Mentor", desc: "Delivered digital marketing pedagogy to 100+ professional cohorts." }
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Sales and Marketing Strategist",
    company: "DAFO INDUSTRIES PRIVATE LIMITED",
    duration: "Aug 2025 - May 2026",
    location: "Calicut, Kerala",
    achievements: [
      "Led SEO, Meta Ads and PPC campaigns. Grew Sulfi Wooden Life to 50,000+ followers, generated 10+ million monthly views, 5,000+ business inquiries and created 500+ reels and video campaigns."
    ],
    skillsUsed: ["SEO Leadership", "Meta Ads Scaling", "PPC Campaigns", "Viral Short-Form Content", "Lead Gen Pipelines"]
  },
  {
    id: "exp-2",
    role: "Digital Marketing Manager",
    company: "Rahman World Pvt Ltd",
    duration: "Nov 2024 - Apr 2025",
    location: "Kozhikode, Kerala, India",
    achievements: [
      "Developed and implemented digital marketing strategies to drive brand growth and lead generation.",
      "Managed SEO, Meta Ads, Google Ads, and social media campaigns to improve online visibility.",
      "Optimized website performance and marketing campaigns using analytics and performance tracking."
    ],
    skillsUsed: ["Strategic Planning", "Lead Generation", "SEO & Meta Ads", "Google Ads Manager", "GA4 Performance Analytics"]
  },
  {
    id: "exp-3",
    role: "Digital Marketing Faculty Trainer",
    company: "Epic Ventures (On behalf of Skill Mount)",
    duration: "May 2024 - Jan 2025",
    location: "Bur Dubai, Dubai (Hybrid)",
    achievements: [
      "Trained digital marketing students in social media marketing, delivering comprehensive instruction on content creation, social media management, paid advertising, and digital marketing strategies through Epic Ventures on behalf of Skill Mount."
    ],
    skillsUsed: ["Instructional Design", "Content Creation Pedagogy", "Social Media Management", "Paid Ad Strategy Lectures"]
  },
  {
    id: "exp-4",
    role: "Digital Marketing Strategist",
    company: "Softroniics",
    duration: "Aug 2023 - Feb 2024",
    location: "Calicut, Kerala",
    achievements: [
      "Digital marketing strategist completed 3 month probation period within 2 months.",
      "Digital marketing trainer."
    ],
    skillsUsed: ["Marketing Strategy", "Rapid Probation Success", "Digital Marketing Pedagogy", "Campaign Optimization"]
  },
  {
    id: "exp-5",
    role: "Digital Marketing Intern",
    company: "CB Tech",
    duration: "Jan 2022 - Feb 2023",
    location: "Kochi, Kerala, India",
    achievements: [
      "Supported Google Ads, Meta Ads, SEO, and social media marketing campaigns.",
      "Performed market research and audience targeting to optimize campaign performance."
    ],
    skillsUsed: ["PPC Support", "Metadata & Search Ads", "SEO Assets", "Market Research & Targeting"]
  }
];

export const SKILLS_SET: SkillCategory[] = [
  {
    title: "Performance Marketing",
    skills: [
      { name: "Google Ads (Search/Shopping)", proficiency: 98 },
      { name: "Meta Ads (IG & Facebook)", proficiency: 96 },
      { name: "PPC Bid & Budget Scaling", proficiency: 94 },
      { name: "High-Intent Lead Gen", proficiency: 95 }
    ]
  },
  {
    title: "SEO - Search Acquisition",
    skills: [
      { name: "Technical SEO Audits", proficiency: 92 },
      { name: "On-Page Keyword Optimization", proficiency: 95 },
      { name: "Off-Page Backlink Strategy", proficiency: 88 },
      { name: "SEMRush & Ahrefs Mining", proficiency: 93 }
    ]
  },
  {
    title: "Social Media & Video",
    skills: [
      { name: "Short-Form Video Production", proficiency: 97 },
      { name: "Instagram Reels Strategy", proficiency: 96 },
      { name: "Growth Content Copywriting", proficiency: 94 },
      { name: "Viral Hook Formulation", proficiency: 95 }
    ]
  },
  {
    title: "Web & E-Commerce",
    skills: [
      { name: "Shopify Store Infrastructure", proficiency: 90 },
      { name: "WordPress & Elementor Dev", proficiency: 92 },
      { name: "Conversion Rate Optimization (CRO)", proficiency: 94 },
      { name: "Landing Page Visual Hierarchy", proficiency: 95 }
    ]
  },
  {
    title: "Analytics & Attribution",
    skills: [
      { name: "Google Analytics (GA4)", proficiency: 95 },
      { name: "Conversion Tracking Pixels", proficiency: 96 },
      { name: "Server-Side Tagging API", proficiency: 88 },
      { name: "Data Studio / Looker Dashboards", proficiency: 91 }
    ]
  }
];

export const METRIC_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    value: "50,000+",
    title: "Followers Growth",
    description: "Built high-authority organic audiences from scratch without relying on superficial ad spend boosters.",
    iconName: "TrendingUp"
  },
  {
    id: "ach-2",
    value: "10 Million+",
    title: "Monthly Organic Views",
    description: "Designed, shot, and edited brand clips optimizing for social platform recommendation algorithms.",
    iconName: "Flame"
  },
  {
    id: "ach-3",
    value: "5,000+",
    title: "Qualified Leads Generated",
    description: "High-intent inbound conversions for direct-to-consumer stores, service structures, and international brands.",
    iconName: "UserCheck"
  },
  {
    id: "ach-4",
    value: "₹10 Lakh+",
    title: "Ad Budget Managed",
    description: "Successfully budgeted and optimized premium ad capital to generate positive net ROI scaling indexes.",
    iconName: "DollarSign"
  },
  {
    id: "ach-5",
    value: "500+",
    title: "Marketing Reels Produced",
    description: "Devised, script-written, shot and processed creative high-converting dynamic brand videos.",
    iconName: "Video"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Scalable E-Commerce Growth Strategy",
    category: "Shopify Stores",
    industry: "Luxury Accessories & Apparel",
    challenge: "High cost-per-purchase (CPA) on Meta combined with severe pixel data drop-off following iOS privacy policies.",
    strategy: "Transitioned tracking to Server-Side Conversion API. Created custom creative video assets oriented for product hooks, and structured performance-max-driven Google Shopping search systems.",
    results: "Boosted Meta Ad purchase match rate by 44%, resulting in flat 4.5x consistent ROAS and 340% increase in net revenue scaling within 4 months.",
    toolsUsed: ["Shopify Plus", "Meta API", "Google Search Ads", "CAPI Tagging", "CapCut Pro"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-2",
    title: "International Lead Acquisition Pipeline",
    category: "Google Ads Campaigns",
    industry: "Heavy Machinery & Cargo Logistics",
    challenge: "Niche industrial keywords had extremely low search volumes and high CPCs (exceeding ₹500 per click) with zero conversion traction.",
    strategy: "Re-engineered landing page structures for ultra-fast load speed (98 block score). Focused strictly on long-tail solution-focused phrases, and added Google Dynamic Search ads paired with Smart Bidding systems.",
    results: "Secured ₹80 Lakh in pipeline contracts from the GCC region, cutting average CPL (Cost-per-Lead) by 58%.",
    toolsUsed: ["Google Ads Search", "Elementor", "Schema Markup", "Event Tracking", "SEMRush"],
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-3",
    title: "Organic SaaS Traffic Blueprint",
    category: "SEO Projects",
    industry: "Developer Tools & Cloud Infrastructure",
    challenge: "The brand ranked poorly on authority terms, facing a high dependency on Paid Media campaigns to obtain newsletter sign-ups.",
    strategy: "Implemented a complete sitewide technical audit, correcting structural canonical errors, and launched a localized high-value 'glossary center' targeting mid-funnel technical search terms.",
    results: "Grew organic search impressions by 12x within 6 months, securing 22,000 monthly unique visits in organic search traffic.",
    toolsUsed: ["Next.js", "SEMRush", "Google Search Console", "Sitemap Optimization", "Markdown Content"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-4",
    title: "Reels Viral Growth Campaign",
    category: "Brand Growth Projects",
    industry: "Online Academy & FinTech",
    challenge: "Brand page engagement was stagnant with a cold, corporate feel, resulting in poor post reach and organic follower fatigue.",
    strategy: "Concurred on a 90-day high-retention short video program. Addressed fast pacing, custom kinetic typography, visual hooks in the starting 2 seconds, and actionable industry-specific educational lists.",
    results: "Amassed 3.8 Million cumulative organic views, growing the account following base by 18,000 high-intent active sector users.",
    toolsUsed: ["Figma", "Instagram Analytics", "Adobe Premiere", "Audio Soundtracks", "Audience Insights"],
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-5",
    title: "DTC Brand Scaling Campaign",
    category: "Meta Ads Campaigns",
    industry: "Eco-Friendly Consumer Goods",
    challenge: "DTC brand with slow conversion growth, unable to prove sustainable margins past ₹1.5 Lakh ad budget.",
    strategy: "A/B tested custom UGC creatives against direct professional products. Set up robust custom customer segments using first-party lists, and structured cart-abandonment dynamic retargeting loops.",
    results: "Pushed profitability limits, generating ₹11 Lakh in ad scale revenue while maintaining positive 3.82x ROAS bounds.",
    toolsUsed: ["Meta Ads Manager", "GA4 Analytics", "Shopify", "Klaviyo", "Canva Team"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "proj-6",
    title: "Educational Funnel & Video Marketing",
    category: "Content Creation Campaigns",
    industry: "Professional Education Platform",
    challenge: "Traditional lead ads were generating poor-quality student inquiries, resulting in low course enrollment conversion.",
    strategy: "Architected a free value-packed mini-course video funnel prior to checkout. Designed high-resolution customized video modules explaining advanced analytical tools.",
    results: "Generated 1,200+ qualified sign-ups with a 24% conversion scale to paid enterprise cohorts.",
    toolsUsed: ["Wistia", "Vimeo Pro", "Typeform", "Zapier Integrations", "WordPress Plus"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  }
];

export const SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Performance Marketing",
    description: "End-to-end multi-channel growth systems utilizing Facebook, Instagram, and Google Ads designed specifically to scale revenue and cash-on-cash returns.",
    perks: ["ROAS-focused bidding algorithms", "Dynamic creative testing (DCT)", "Server-side tag API integrations", "Budget scale architecture"],
    iconName: "TrendingUp"
  },
  {
    id: "serv-2",
    title: "SEO Optimization",
    description: "Comprehensive technical audits, programmatic keyword architecture, and organic authority campaigns tailored to build durable, cost-free search acquisition assets.",
    perks: ["Advanced schema implementation", "Core Web Vitals acceleration", "Competitor gap targeting", "Local & International ranking"],
    iconName: "Search"
  },
  {
    id: "serv-3",
    title: "Meta Ads Management",
    description: "Precise audience funnel segmenting, custom creative testing workflows, and high-converting retargeting infrastructure mapping the complete digital buyer cycle.",
    perks: ["Custom lookalike structuring", "Instant video ad templates", "Conversion rate diagnostic audits", "Attribution gap correction"],
    iconName: "Facebook"
  },
  {
    id: "serv-4",
    title: "Google Ads Management",
    description: "Strategic Search, Performance Max, and Shopping campaigns optimized for actual profit margins rather than simple raw, superficial ad click clicks.",
    perks: ["Smart Bidding feedback loops", "Negative keywords cleanups", "High-CTR ad copy copywriter testing", "Shopping feed optimization"],
    iconName: "Target"
  },
  {
    id: "serv-5",
    title: "Shopify & WordPress Development",
    description: "High-octane, fast and visually outstanding storefronts and high-converting landing pages built on modern layouts, fully optimized for immediate SEO and checkout.",
    perks: ["Conversion-optimised styling", "Responsive custom components", "Analytics GA4 events configuration", "Lightweight frameworks selection"],
    iconName: "Cpu"
  },
  {
    id: "serv-6",
    title: "Social Media & Video Strategy",
    description: "High-level visual direction blueprints for short-form reels, shorts, and TikTok items to capture user eyeballs and spark viral organic recommendation patterns.",
    perks: ["Retention-hook storyboard lines", "Micro kinetic subtitle setups", "Algorithmic trends scanning", "Community pipeline building"],
    iconName: "Video"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Hassan Al-Zahrani",
    position: "Founder & Director, Riyadh Apex Trading",
    feedback: "Afnan's tactical understanding of how to run Meta ads scaled our direct inquiry leads count by 3x within 60 days. His focus is entirely on cost-per-lead and practical business revenue metrics rather than vanity parameters. An absolute genius!",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: "t-2",
    name: "Malini Krishnan",
    position: "Head of Growth, Softroniics Academy",
    feedback: "Afnan CH is a rare marketer who genuinely blends high-intensity analytical SEO auditing with creative viral reels formulation. He managed and redesigned our organic strategy leading to over 1 Million monthly video views. Highly elite strategy expert.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80"
  },
  {
    id: "t-3",
    name: "Jameson Reynolds",
    position: "Chief Executive, Reynolds SaaS & Co.",
    feedback: "We brought Afnan in to run a complete audit on our search ad scaling friction. His recommendations regarding high-intent negative keyword grouping and tailored conversion events saved us over ₹3 Lakh in wasted budget and immediately lowered CAC by 28%.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c-1",
    title: "Google Ads Certification",
    issuer: "Google Ireland Academy",
    year: "2024",
    badgeColor: "from-blue-600 via-blue-500 to-amber-500"
  },
  {
    id: "c-2",
    title: "Meta Certified Marketing Professional",
    issuer: "Meta Blueprint Global Academy",
    year: "2023",
    badgeColor: "from-sky-700 to-cyan-500"
  },
  {
    id: "c-3",
    title: "Digital Marketing Executive Diploma",
    issuer: "State Board of Professional Studies",
    year: "2021",
    badgeColor: "from-emerald-600 to-teal-500"
  },
  {
    id: "c-4",
    title: "Advanced Technical SEO Program",
    issuer: "Semrush Academy",
    year: "2022",
    badgeColor: "from-orange-600 to-amber-600"
  }
];
