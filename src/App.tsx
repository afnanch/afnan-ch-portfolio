import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Flame,
  UserCheck,
  DollarSign,
  Video,
  Search,
  Facebook,
  Target,
  Cpu,
  Award,
  Mail,
  Linkedin,
  Clock,
  ArrowUpRight,
  Download,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Info
} from "lucide-react";

import {
  HERO_KPIS,
  BIOGRAPHY,
  EXPERIENCES,
  SKILLS_SET,
  METRIC_ACHIEVEMENTS,
  SERVICES,
  CERTIFICATIONS
} from "./data";

import GlowEffect from "./components/GlowEffect";
import Navbar from "./components/Navbar";
import AIConsultant from "./components/AIConsultant";
import InquiryDashboard from "./components/InquiryDashboard";
import ProjectGrid from "./components/ProjectGrid";
import TestimonialCarousel from "./components/TestimonialCarousel";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeExpId, setActiveExpId] = useState("exp-1");
  const [cvDownloaded, setCvDownloaded] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formBudget, setFormBudget] = useState("₹5 Lakh - ₹15 Lakh");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [refreshInquiriesTrigger, setRefreshInquiriesTrigger] = useState(0);

  // Robust, stateful list of image path variants for the profile.
  // The website will automatically search through all of these if uploaded.
  const PORTRAIT_SOURCES = [
    "/afnan_portrait.jpg",
    "/afnan_portrait.png",
    "/afnan_portrait.jpeg",
    "/afnan.jpg",
    "/afnan.png",
    "/afnan.jpeg",
    "/profile.jpg",
    "/profile.png",
    "/profile.jpeg",
    "/portrait.jpg",
    "/portrait.png",
    "/portrait.jpeg",
    "/image.jpg",
    "/image.png",
    "/image.jpeg",
    "/assets/afnan_portrait.jpg",
    "/assets/afnan_portrait.png",
    "/assets/afnan.jpg",
    "/assets/afnan.png",
    "/assets/profile.jpg",
    "/assets/profile.png",
  ];
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitFailed, setPortraitFailed] = useState(false);

  // ROI Calculator states inside Hero Section
  const [adSpend, setAdSpend] = useState(300000); // 3 Lakhs Default
  const [conversionRate, setConversionRate] = useState(2.2); // 2.2% Default
  const [averageOrderValue, setAverageOrderValue] = useState(1500); // ₹1500 Default

  // Auto-update clock in UTC formatting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section Observer to highlight navbar links on scroll
  useEffect(() => {
    const sections = ["home", "about", "experience", "skills", "projects", "services", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // spotlight center of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ROI Calculator formulas
  const calculatedClicks = Math.round(adSpend / 15); // Avg ₹15 CPC
  const calculatedConversions = Math.round((calculatedClicks * conversionRate) / 100);
  const calculatedRevenue = Math.round(calculatedConversions * averageOrderValue);
  const calculatedROAS = adSpend > 0 ? (calculatedRevenue / adSpend).toFixed(2) : "0.00";
  const calculatedCAC = calculatedConversions > 0 ? Math.round(adSpend / calculatedConversions) : 0;

  // Contact form submission handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          company: formCompany || "Independent LLC",
          budget: formBudget,
          message: formMessage,
        }),
      });

      if (res.ok) {
        setFormSuccess(true);
        setRefreshInquiriesTrigger((prev) => prev + 1);
        // Clear inputs
        setFormName("");
        setFormEmail("");
        setFormCompany("");
        setFormMessage("");
        setTimeout(() => setFormSuccess(false), 8000);
      }
    } catch (err) {
      console.error("Failed to post inquiry form", err);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Simulated CV Download triggers fine visual reaction
  const handleDownloadCV = () => {
    setCvDownloaded(true);
    // Create direct mock file save event with full real PDF resume content
    const cvText = `AFNAN CH
------------------------------------------------------------
Digital Marketing Manager | Performance Marketing | SEO | PPC | E-Commerce Growth
Email: afnan@afnanch.in | LinkedIn: linkedin.com/in/afnanch | Website: www.afnanch.in
------------------------------------------------------------

PROFESSIONAL SUMMARY
Results-driven Digital Marketing Strategist with expertise in Google Ads, Meta Ads, SEO, PPC, Social Media Marketing, E-commerce Marketing, and Performance Marketing. Proven success in scaling audiences from 100 to 50,000+ followers, generating 10+ million monthly views, creating 5,000+ business inquiries, and managing advertising budgets across multiple organizations.

============================================================
WORK EXPERIENCE
============================================================

Sales and Marketing Strategist                                             Aug 2025 - May 2026
DAFO INDUSTRIES PRIVATE LIMITED                                            Calicut, Kerala, India
• Led SEO, Meta Ads, and PPC campaigns. 
• Grew Sulfi Wooden Life to 50,000+ followers.
• Generated 10+ million monthly views and 5,000+ business inquiries.
• Created 500+ reels and video campaigns.

Digital Marketing Manager                                                  Nov 2024 - Apr 2025
Rahman World Pvt Ltd                                                       Kozhikode, Kerala, India
• Developed and implemented digital marketing strategies to drive brand growth and lead generation.
• Managed SEO, Meta Ads, Google Ads, and social media campaigns to improve online visibility.
• Optimized website performance and marketing campaigns using analytics and performance tracking.

Digital Marketing Faculty Trainer                                          May 2024 - Jan 2025
Epic Ventures (On behalf of Skill Mount) - Hybrid                          Bur Dubai, Dubai
• Trained digital marketing students in social media marketing, delivering comprehensive instruction on content creation, social media management, paid advertising, and digital marketing strategies through Epic Ventures on behalf of Skill Mount.

Digital Marketing Strategist                                               Aug 2023 - Feb 2024
Softroniics                                                                Calicut, Kerala, India
• Completed 3-month probation period within 2 months as a digital marketing strategist.
• Managed client campaigns and worked as a digital marketing trainer.

Digital Marketing Intern                                                   Jan 2022 - Feb 2023
CB Tech                                                                    Kochi, Kerala, India
• Supported Google Ads, Meta Ads, SEO, and social media marketing campaigns.
• Performed market research and audience targeting to optimize campaign performance.

============================================================
EDUCATION
============================================================

Diploma in Digital Marketing
CbTech at Ernakulam                                                        2022 August

Diploma in Automobile Engineering
Orphanagepolytechnic College at Edavanna                                   2019 - 2022

============================================================
SKILLS
============================================================

• Core Capabilities:
  Digital Marketing Strategy, Performance Marketing, SEO, SEM, Google Ads, Meta Ads, Google Analytics, SEMrush, Marketing Analytics.

• Content Creation & Branding:
  Social Media Marketing, Content Strategy, Copywriting, Video Capturing & Editing, Reel Production, Brand Building.

• Business & Tools:
  E-Commerce Marketing, Lead Generation, WordPress, Shopify, Email Marketing, Campaign Management, Budget Management, Data Analysis.
`;
    const blob = new Blob([cvText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Afnan_CH_CV.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setCvDownloaded(false), 4000);
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6 text-[#00FF88]" />;
      case "Flame":
        return <Flame className="h-6 w-6 text-[#00FF88]" />;
      case "UserCheck":
        return <UserCheck className="h-6 w-6 text-[#00FF88]" />;
      case "DollarSign":
        return <DollarSign className="h-6 w-6 text-[#00FF88]" />;
      case "Video":
        return <Video className="h-6 w-6 text-[#00FF88]" />;
      default:
        return <TrendingUp className="h-6 w-6 text-[#00FF88]" />;
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5" />;
      case "Search":
        return <Search className="h-5 w-5" />;
      case "Facebook":
        return <Facebook className="h-5 w-5" />;
      case "Target":
        return <Target className="h-5 w-5" />;
      case "Cpu":
        return <Cpu className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  return (
    <div className="text-white font-sans min-h-screen selection:bg-[#00FF88] selection:text-black antialiased">
      {/* 1. Global Interactive Glowing Background elements */}
      <GlowEffect />

      {/* 2. Transparent glass-filter sticky navbar */}
      <Navbar activeSection={activeSection} />

      {/* Floating Active Indicator on bottom corner - elegant and subtle */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-3 bg-black/80 border border-white/5 px-4 py-2 rounded-full backdrop-blur-md text-[10px] font-mono text-white/50">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF88]"></span>
        </span>
        <span className="uppercase text-[9px] tracking-widest text-[#00FF88]">Active Live Clock</span>
        <span className="text-white/20">|</span>
        <span className="text-white/80">{currentTime}</span>
      </div>

      {/* Primary Page Sections Wrapper */}
      <main className="pt-24 pb-16">
        
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="min-h-screen px-6 flex items-center pt-8 md:pt-16 pb-12 max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-left" id="hero-pitch-column">
              {/* Premium Top Line */}
              <div className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full select-none">
                <Sparkles className="h-4.5 w-4.5 text-[#00FF88] animate-spin" style={{ animationDuration: "3s" }} />
                <span className="text-xs font-mono font-bold uppercase text-[#00FF88] tracking-widest leading-none">
                  Performance-First Growth Architect
                </span>
              </div>

              {/* Bold Display Heading */}
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Digital Marketing Strategist Driving{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#01C853] relative">
                  Growth & Revenue
                </span>
              </h1>

              {/* Supporting Subheadline */}
              <p className="text-[#A0A0A0] text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
                Helping businesses scale with Google Ads, Meta Ads, Technical SEO, E-Commerce CRO, High-Impact short videos, and Conversion Tracking Attribution.
              </p>

              {/* Immediate KPI Counters row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                {HERO_KPIS.map((kpi) => (
                  <div key={kpi.id} className="text-left">
                    <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                      {kpi.metric}
                    </span>
                    <span className="text-[#A0A0A0] text-[11px] font-mono uppercase tracking-wider block mt-1 leading-snug">
                      {kpi.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Responsive CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-[#00FF88] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white transition-all shadow-[0_0_25px_rgba(0,255,136,0.2)] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] transform hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  Let's Work Together
                </button>
                <button
                  onClick={handleDownloadCV}
                  className="bg-transparent border border-white/10 hover:border-white/30 text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" /> 
                  {cvDownloaded ? "Ready for Print..." : "Download CV"}
                </button>
              </div>
            </div>

            {/* Right Interactive Mockup Dashboard & Calculator Column */}
            <div className="lg:col-span-5" id="hero-calculator-column">
              <div className="bg-[#151515] border border-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Simulated Tab Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    <div className="flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <div className="flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#00FF88] bg-[#00FF88]/10 px-2.5 py-0.5 rounded-md border border-[#00FF88]/15 font-bold">
                    Target ROAS Simulator
                  </span>
                </div>

                <h3 className="text-white font-extrabold text-base tracking-tight mb-1 flex items-center gap-1.5">
                  Performance Growth Engine
                </h3>
                <p className="text-[#A0A0A0] text-xs font-mono mb-6">Drag input parameters to calculate your ad funnel ROI</p>

                {/* Slider Inputs */}
                <div className="space-y-4 mb-6">
                  {/* Slider 1: Ad budget input */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                      <span>Monthly Ad Capital:</span>
                      <span className="text-white font-bold">₹{(adSpend / 100000).toFixed(1)} Lakh</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={50000}
                      value={adSpend}
                      onChange={(e) => setAdSpend(Number(e.target.value))}
                      className="w-full accent-[#00FF88] bg-black/50 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Slider 2: Conversion rate input */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-white/70 mb-2">
                      <span>Store Conversion Rate (CRO):</span>
                      <span className="text-[#00FF88] font-bold">{conversionRate}%</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={6.0}
                      step={0.1}
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full accent-[#00FF88] bg-black/50 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>
                </div>

                {/* Estimated Outputs */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50 text-xs">Estimated Link Cliques (₹15 CPC):</span>
                    <span className="text-white font-mono font-medium">{calculatedClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50 text-xs">Expected Buyers:</span>
                    <span className="text-white font-mono font-medium">{calculatedConversions.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-[#00FF88] font-bold text-xs uppercase tracking-wider">Estimated Revenue:</span>
                    <span className="text-[#00FF88] font-mono font-bold text-base">₹{calculatedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs">Customer Acquisition Cost (CAC):</span>
                    <span className="text-white font-mono font-medium">₹{calculatedCAC}</span>
                  </div>
                </div>

                {/* Final ROAS Display Meter */}
                <div className="bg-gradient-to-tr from-[#00C853]/15 to-[#00FF88]/5 border border-[#00FF88]/20 rounded-2xl p-5 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-3 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    Scaled Index
                  </div>
                  <span className="text-[#00FF88] text-[34px] font-black tracking-tight block font-sans">
                    {calculatedROAS}x <span className="text-white text-sm font-semibold">ROAS</span>
                  </span>
                  <p className="text-[#A0A0A0] text-[11px] font-mono leading-normal mt-1 max-w-[280px] mx-auto">
                    {Number(calculatedROAS) >= 3.0
                      ? "Afnan's target parameters prove sustainable scaling capabilities."
                      : "We recommend restructuring ad creative to scale target conversion indices to 2.5%+"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="py-24 px-6 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto">
            {/* Tagline Heading */}
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                THE BIO GRAPH
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
                About Me
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Column 1: Premium Portrait image card with live self-healing cascade */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div className="relative group overflow-hidden rounded-3xl border border-white/5 bg-[#151515] p-2 aspect-[3/4] h-full shadow-2xl hover:border-[#00FF88]/20 transition-all duration-500 flex flex-col justify-between">
                  {/* Ambient overlay shadows */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                  
                  {/* Retro decorative dot mesh in the background */}
                  <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Glow effect at top right */}
                  <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#00FF88] opacity-5 blur-[50px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />

                  <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0d0d0d] flex items-center justify-center">
                    {/* Self-Healing High-End Vector Fallback showing underneath or if image fails */}
                    <div
                      id="portrait-vector-fallback"
                      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#151515] to-[#0d0d0d] p-6 z-0"
                    >
                      {/* Decorative avatar icon */}
                      <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/15 animate-pulse" />
                        <div className="absolute inset-2 rounded-full bg-black/80 border border-white/5 flex items-center justify-center text-3xl font-extrabold text-[#00FF88] font-sans">
                          A
                        </div>
                      </div>
                      <div className="text-center px-4">
                        <span className="text-[#00FF88] text-[9px] uppercase tracking-[0.2em] font-mono font-black py-0.5 px-2 bg-[#00FF88]/10 rounded-full border border-[#00FF88]/10">Image Fallback Active</span>
                        <h4 className="text-white font-extrabold text-sm tracking-tight mt-3">Afnan CH</h4>
                        <p className="text-[#A0A0A0] text-[11px] leading-relaxed max-w-[200px] mx-auto mt-1.5">
                          Upload your image to the File explorer as <code className="text-xs text-[#00FF88] font-mono bg-black/30 px-1 py-0.5 rounded">afnan_portrait.jpg</code> to view your portrait here!
                        </p>
                      </div>
                    </div>

                    {/* Real Image of Afnan CH overlay */}
                    {!portraitFailed && (
                      <img
                        src={PORTRAIT_SOURCES[portraitIndex]}
                        alt="Afnan CH - Performance Strategist"
                        onError={() => {
                          if (portraitIndex < PORTRAIT_SOURCES.length - 1) {
                            setPortraitIndex((prev) => prev + 1);
                          } else {
                            setPortraitFailed(true);
                          }
                        }}
                        className="absolute inset-0 w-full h-full object-cover z-10 filter contrast-[1.03] brightness-[0.98] group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  {/* Overlay bottom badge */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                    <div>
                      <h4 className="text-white font-extrabold text-lg tracking-tight leading-none drop-shadow-md">Afnan CH</h4>
                      <span className="text-white/50 text-xs mt-1.5 block drop-shadow-md">4+ Years Growth Excellence</span>
                    </div>
                    <div className="px-2.5 py-1 bg-[#00FF88]/15 border border-[#00FF88]/25 rounded text-[9px] text-[#00FF88] uppercase font-mono tracking-widest font-bold">
                      Live Profile
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Bio Text details column */}
              <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
                <span className="text-xs font-mono text-[#00FF88] tracking-widest uppercase block font-bold">
                  About Afnan CH
                </span>
                <h3 className="text-white font-extrabold text-2xl tracking-tight leading-snug">
                  I craft automated conversion pipelines that convert viewers into high-value revenue.
                </h3>
                <p className="text-[#A0A0A0] text-[14px] leading-relaxed">
                  {BIOGRAPHY.bioText}
                </p>

                {/* Subtitles labels */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {BIOGRAPHY.subtitles.map((sub, i) => (
                    <span
                      key={i}
                      className="text-white text-[10px] uppercase tracking-wider font-mono bg-[#151515] border border-white/5 px-3.5 py-1.5 rounded-full font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column 3: Career Achievements milestones vertical stack */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                {BIOGRAPHY.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="bg-[#151515] border border-white/5 hover:border-[#00FF88]/10 p-5 rounded-2xl shadow-md transition-all flex-1 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="h-6 w-6 rounded-md bg-[#00FF88]/10 text-[#00FF88] text-[10px] font-mono flex items-center justify-center font-black">
                        0{i + 1}
                      </span>
                      <h4 className="text-white font-extrabold text-sm tracking-tight">{hl.title}</h4>
                    </div>
                    <p className="text-[#A0A0A0] text-xs leading-relaxed">{hl.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE SECTION ================= */}
        <section id="experience" className="py-24 px-6 border-t border-white/5 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
              CAREER CHRONOLOGY
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
              Interactive Career Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selection sidebar list of companies (Timeline nodes) */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 scrollbar-none">
              {EXPERIENCES.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExpId(exp.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col items-start min-w-[240px] cursor-pointer shrink-0 ${
                    activeExpId === exp.id
                      ? "bg-white/[0.03] border-[#00FF88] text-white shadow-xl shadow-black"
                      : "bg-[#151515] border-white/5 text-[#A0A0A0] hover:bg-white/[0.01] hover:border-white/10"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase mb-1 ${
                    activeExpId === exp.id ? "text-[#00FF88]" : ""
                  }`}>
                    {exp.duration}
                  </span>
                  <span className="text-white font-extrabold text-sm tracking-tight">{exp.role}</span>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <span className="text-xs text-white/50">{exp.company}</span>
                    {exp.location && (
                      <span className="text-[10px] text-white/30 italic font-medium">{exp.location}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Detailed card pane for selected timeline experience */}
            <div className="lg:col-span-8">
              {(() => {
                const selectedExp = EXPERIENCES.find((e) => e.id === activeExpId);
                if (!selectedExp) return null;

                return (
                  <div
                    id={`active-experience-details-${selectedExp.id}`}
                    className="bg-[#151515] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl relative min-h-[300px]"
                  >
                    {/* Corner badge indicating active card */}
                    <div className="absolute top-6 right-6 text-xs text-[#00FF88] bg-[#00FF88]/15 border border-[#00FF88]/25 pl-2.5 pr-3 py-1 rounded-full font-mono flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Briefcase className="h-3 w-3" /> Historical Timeline
                    </div>

                    <span className="text-xs font-mono text-[#00FF88] tracking-widest uppercase block mb-1">
                      {selectedExp.duration}
                    </span>
                    <h3 className="text-white font-extrabold text-2xl tracking-tight mb-1">
                      {selectedExp.role}
                    </h3>
                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 items-center text-[#A0A0A0] text-sm font-semibold mb-6">
                      <span>{selectedExp.company}</span>
                      {selectedExp.location && (
                        <>
                          <span className="text-white/20 select-none">•</span>
                          <span className="text-white/40 font-medium italic">{selectedExp.location}</span>
                        </>
                      )}
                    </div>

                    {/* Achievements List */}
                    <h4 className="text-white/80 font-bold text-xs uppercase tracking-wider mb-3">
                      Key Highlights & ROAS Deliverables:
                    </h4>
                    <ul className="space-y-3.5 mb-8">
                      {selectedExp.achievements.map((ach, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="h-4.5 w-4.5 text-[#00FF88] shrink-0 mt-0.5" />
                          <p className="text-slate-300 text-[14px] leading-relaxed">{ach}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies/skills list tags */}
                    <h4 className="text-white/80 font-bold text-xs uppercase tracking-wider mb-2.5">
                      Strategic Focus Points:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.skillsUsed.map((sk) => (
                        <span
                          key={sk}
                          className="text-xs text-white/70 font-mono bg-black/40 border border-white/5 px-3 py-1 rounded-lg"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ================= SKILLS SECTION ================= */}
        <section id="skills" className="py-24 px-6 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                TACTICAL PROFILE
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
                Skill Domain Architecture
              </h2>
            </div>

            {/* Structured categories for marketing skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS_SET.map((category, index) => (
                <div
                  key={index}
                  id={`skill-category-${index}`}
                  className="bg-[#151515] border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:border-[#00FF88]/10 shadow-lg relative flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-white font-extrabold text-base tracking-tight mb-5 pb-3 border-b border-white/5 flex items-center justify-between">
                      {category.title}
                      <span className="text-[10px] text-[#A0A0A0] font-mono font-medium">Domain Verified</span>
                    </h3>

                    {/* Skills list inside category */}
                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => {
                        const score = skill.proficiency || 90;
                        return (
                          <div key={sIdx} className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs font-mono text-white/80">
                              <span>{skill.name}</span>
                              <span className="text-[#00FF88] font-bold">{score}%</span>
                            </div>
                            <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${score}%` }}
                                className="h-full bg-gradient-to-r from-[#00C853] to-[#00FF88] rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/10 rounded-br-lg" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HIGH-LEVEL ACHIEVEMENTS SECTION ================= */}
        <section className="py-24 px-6 border-t border-white/5 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
              QUANTIFIABLE DELIVERABLES
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
              Major Marketing Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {METRIC_ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                id={`achievement-card-${ach.id}`}
                className="bg-[#151515] border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between group hover:border-[#00FF88]/20 transition-all shadow-md"
              >
                <div className="mb-4">
                  <div className="h-11 w-11 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#00FF88] group-hover:text-black transition-all">
                    {getMetricIcon(ach.iconName)}
                  </div>
                  <span className="text-white font-extrabold text-3xl tracking-tight block">
                    {ach.value}
                  </span>
                  <span className="text-[#00FF88] text-[13px] font-mono uppercase tracking-wider block mt-1 font-bold">
                    {ach.title}
                  </span>
                </div>
                <p className="text-[#A0A0A0] text-xs leading-relaxed">
                  {ach.description}
                </p>

                {/* Ambient glow corner inside areach */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-[#00FF88]/2 blur-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="py-24 px-6 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                METRIC PROVEN CASES
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Strategic Portfolio Grid
              </h2>
              <p className="text-[#A0A0A0] font-mono text-xs">A collection of quantitative results driven for actual businesses</p>
            </div>

            {/* Render filterable project grid */}
            <ProjectGrid />
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="services" className="py-24 px-6 border-t border-white/5 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
              WHAT I GENERATE
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
              Services Offered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((serv) => (
              <div
                key={serv.id}
                id={`service-card-${serv.id}`}
                className="bg-[#151515] border border-white/5 rounded-3xl p-6.5 hover:border-[#00FF88]/20 transition-all shadow-md relative group flex flex-col justify-between"
              >
                <div>
                  {/* Icon & title bar */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center border border-[#00FF88]/10 group-hover:bg-[#00FF88] group-hover:text-black transition-all">
                      {getServiceIcon(serv.iconName)}
                    </div>
                    <h3 className="text-white font-extrabold text-base tracking-tight">{serv.title}</h3>
                  </div>

                  <p className="text-[#A0A0A0] text-xs leading-relaxed mb-6 font-sans">
                    {serv.description}
                  </p>

                  {/* Bullet perks details row */}
                  <div className="space-y-2 mb-6">
                    {serv.perks.map((p, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-[11px] font-mono text-white/70">
                        <ChevronRight className="h-3 w-3 text-[#00FF88] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call-to-action pointer */}
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-left text-white/50 group-hover:text-[#00FF88] font-mono font-bold flex items-center gap-1 transition-colors mt-auto"
                >
                  Request Consultation <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS SECTION ================= */}
        <section className="py-24 px-6 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                CLIENT CONVERSIONS
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
                Client Testimonials
              </h2>
            </div>

            {/* Testimonials Swiper list */}
            <TestimonialCarousel />
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section className="py-24 px-6 border-t border-white/5 max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
              COMPETENCY VERIFICATIONS
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Verified Certifications
            </h2>
            <p className="text-[#A0A0A0] text-xs font-mono font-medium">Globally standardized credentials confirming performance authority</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                id={`cert-item-${cert.id}`}
                className="bg-[#151515] border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between group hover:border-[#00FF88]/20 transition-all shadow-lg"
              >
                {/* Horizontal Gradient Strip colored badge */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.badgeColor}`} />

                <div>
                  <div className="h-10 w-10 rounded-xl bg-white/[0.02] border border-white/5 text-slate-300 flex items-center justify-center mb-6">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-extrabold text-[15px] tracking-tight leading-snug mb-1 group-hover:text-[#00FF88] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-xs font-mono">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-white/30">Acquired Date</span>
                  <span className="text-[10px] uppercase font-mono font-bold bg-[#0A0A0A] px-2.5 py-0.5 rounded text-[#00FF88]">
                    {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTERACTIVE CONSULTATION DESK & PIPELINE ================= */}
        <section className="py-24 px-6 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                AI COGNITIVE DESK
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                Test My Marketing Strategy Live
              </h2>
              <p className="text-[#A0A0A0] text-xs font-mono">Simulate custom scaling ideas directly with Afnan's AI twin</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Chat Bot widget */}
              <div className="lg:col-span-7">
                <AIConsultant />
              </div>
              
              {/* Right Column: Mini explanation of consultation benefits */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#151515] border border-white/5 p-6 rounded-3xl tracking-wide">
                  <div className="flex items-center gap-2 mb-4 text-[#00FF88]">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest font-bold">Strategy Audit Checklist</span>
                  </div>
                  <h3 className="text-white font-extrabold text-lg tracking-tight mb-4">
                    Custom Funnel Playbook
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-md bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center font-bold text-xs shrink-0 font-mono">1</div>
                      <p className="text-[#A0A0A0] text-[13px] leading-relaxed">
                        Input actual website challenges (e.g., high landing page bounce rates or slow Shopify scales).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-md bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center font-bold text-xs shrink-0 font-mono">2</div>
                      <p className="text-[#A0A0A0] text-[13px] leading-relaxed">
                        The Gemini-driven neural twin analyzes standard metrics (LTV, ROAS, CPA) to advise optimal channel splits.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-md bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center font-bold text-xs shrink-0 font-mono">3</div>
                      <p className="text-[#A0A0A0] text-[13px] leading-relaxed">
                        Convert the generated advice into a solid strategic execution by reserving a slot via the inquiry cards below.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="bg-black/30 border border-emerald-500/10 p-5 rounded-2xl flex gap-3 text-slate-300 transform hover:scale-[1.01] transition-transform">
                  <Info className="h-5 w-5 text-[#00FF88] shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed font-mono">
                    Afnan's model twin maps Google search trends and event-based tracking frameworks to build customized multi-million rupee campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION & LIVE PIPELINE ================= */}
        <section id="contact" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-extrabold bg-[#00FF88]/10 px-3 py-1 rounded-full mb-3 inline-block">
                REVENUE INBOUND
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
                Let's Build Something Amazing Together
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Traditional contact card and Interactive submit form */}
              <div className="lg:col-span-6 space-y-8">
                {/* Contact Information block */}
                <div className="bg-[#151515] border border-white/5 p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                  <div>
                    <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block mb-1">Direct Communication</span>
                    <a href="mailto:afnan@afnanch.in" className="text-white hover:text-[#00FF88] font-bold text-base transition-colors block">
                      afnan@afnanch.in
                    </a>
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block mb-1">LinkedIn Network</span>
                    <a
                      href="https://linkedin.com/in/afnanch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00FF88] font-bold text-base transition-colors flex items-center gap-1.5"
                    >
                      linkedin.com/in/afnanch <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block mb-1">Operational Site</span>
                    <a
                      href="https://www.afnanch.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#00FF88] font-bold text-base transition-colors block"
                    >
                      www.afnanch.in
                    </a>
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block mb-1">Geo Targets Focus</span>
                    <span className="text-[#00FF88] font-bold text-sm block font-sans">
                      India • Middle East (UAE / Saudi / Qatar)
                    </span>
                  </div>
                </div>

                {/* Inquiry Form */}
                <form onSubmit={handleInquirySubmit} id="contact-form-component" className="bg-[#151515] border border-white/5 p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl">
                  <h4 className="text-white font-extrabold text-base tracking-tight mb-2 flex items-center gap-2">
                    Funnel Launch Card
                  </h4>

                  {/* Field: Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/60 block" htmlFor="form-client-name">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Green"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#00FF88]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF88]/20 transition-colors"
                      id="form-client-name"
                    />
                  </div>

                  {/* Row fields: Email & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60 block" htmlFor="form-client-email">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="rachel@brands.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#00FF88]/50 focus:outline-none transition-colors"
                        id="form-client-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/60 block" htmlFor="form-client-company">Company / Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Elite Apparel LLC"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#00FF88]/50 focus:outline-none transition-colors"
                        id="form-client-company"
                      />
                    </div>
                  </div>

                  {/* Budget Selector Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-white/60 block">Planned Quarterly Ad Capital Budget:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "₹2 Lakh - ₹5 Lakh",
                        "₹5 Lakh - ₹15 Lakh",
                        "₹15 Lakh - ₹30 Lakh",
                        "₹30 Lakh+"
                      ].map((budgetOption) => (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() => setFormBudget(budgetOption)}
                          className={`text-xs p-3 rounded-xl border text-center font-medium font-semibold transition-all cursor-pointer ${
                            formBudget === budgetOption
                              ? "bg-[#00FF88]/10 border-[#00FF88] text-[#00FF88]"
                              : "bg-black/50 border-white/5 text-white/70 hover:bg-black/80"
                          }`}
                        >
                          {budgetOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field: Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/60 block" htmlFor="form-client-message">Brief Growth Objectives</label>
                    <textarea
                      rows={3}
                      placeholder="Outline your acquisition hurdles, monthly spend expectations, or key campaign issues..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#00FF88]/50 focus:outline-none transition-colors resize-none"
                      id="form-client-message"
                    />
                  </div>

                  {/* Success notification panel inside the form blocks */}
                  {formSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-500/20 px-4 py-3.5 rounded-2xl flex items-start gap-2.5 text-[#00FF88]">
                      <Sparkles className="h-5 w-5 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <span className="text-xs font-mono uppercase font-black block">Inbound Action Pipeline Synchronized!</span>
                        <p className="text-[12px] opacity-90 mt-0.5 leading-relaxed">
                          Your query is queued on our active server database! Scroll right or look at the Live Client Funnel panel to see your budget deal scale in real-time.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-[#00FF88] text-black font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {formSubmitting ? (
                      "Initializing Conversion Webhook..."
                    ) : (
                      <>
                        Submit Budgets & Inquire <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Live pipeline status pipeline list */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-[#151515] border border-white/5 p-6 rounded-3xl">
                  <h4 className="text-white font-extrabold text-base tracking-tight mb-2">
                    Why hire Afnan CH?
                  </h4>
                  <p className="text-[#A0A0A0] text-xs font-mono mb-4">Direct solutions mapped to business scalability metrics:</p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center text-xs shrink-0 font-bold">✓</div>
                      <div>
                        <h5 className="text-white font-bold text-xs">No Vanity Metrics</h5>
                        <p className="text-[#A0A0A0] text-xs mt-0.5">Focus is purely on cash flows, conversion rates, customer lists metrics, and cost-per-lead.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center text-xs shrink-0 font-bold">✓</div>
                      <div>
                        <h5 className="text-white font-bold text-xs">Omnichannel Integration</h5>
                        <p className="text-[#A0A0A0] text-xs mt-0.5">Bridges SEO ranking setups with dynamic creative Meta Ads so conversion costs stay optimized.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-[#00FF88]/15 text-[#00FF88] flex items-center justify-center text-xs shrink-0 font-bold">✓</div>
                      <div>
                        <h5 className="text-white font-bold text-xs">Proven Server Attribution CAPI</h5>
                        <p className="text-[#A0A0A0] text-xs mt-0.5">Solves iOS data gaps by routing conversions securely using Node/Express direct setups.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard rendered here directly */}
                <InquiryDashboard refreshTrigger={refreshInquiriesTrigger} />
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black/60 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-white font-black text-lg tracking-tight">
              AFNAN <span className="text-[#00FF88]">CH</span>
            </span>
            <p className="text-white/45 text-xs font-mono mt-1">
              © {new Date().getFullYear()} Afnan CH. All rights reserved. Designed for Premium Authority.
            </p>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:afnan@afnanch.in"
              className="h-10 w-10 rounded-full border border-white/5 bg-white/5 hover:bg-[#00FF88] hover:text-black flex items-center justify-center text-white/70 transition-all"
              aria-label="Direct Email"
            >
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a
              href="https://linkedin.com/in/afnanch"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-white/5 bg-white/5 hover:bg-[#00FF88] hover:text-black flex items-center justify-center text-white/70 transition-all"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
