import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/80"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand/Availability Indicator */}
        <div className="flex items-center gap-4">
          <button 
            id="nav-logo"
            onClick={() => handleScrollTo("home")}
            className="text-white font-extrabold text-xl tracking-tight flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            AFNAN <span className="text-[#00FF88]">CH</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 bg-[#151515] border border-white/5 px-3 py-1 rounded-full shadow-inner shadow-black">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]"></span>
            </span>
            <span className="text-[11px] font-mono font-medium text-white/70 tracking-wide uppercase">
              Available for Contracts
            </span>
          </div>
        </div>

        {/* Desktop Menu Items */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-150 relative py-1.5 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF88] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-cta"
            onClick={() => handleScrollTo("contact")}
            className="px-5 py-2.5 border border-[#00FF88] text-[#00FF88] text-[11px] uppercase tracking-widest hover:bg-[#00FF88] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-300 rounded-full font-bold cursor-pointer"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#A0A0A0] hover:text-white transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Glassmorphic Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="lg:hidden absolute top-full left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/5 py-6 px-6 shadow-2xl">
          <div className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`text-left text-lg py-2 font-medium tracking-wider border-b border-white/5 pb-2 transition-all ${
                  activeSection === item.id ? "text-[#00FF88] pl-2 font-bold" : "text-[#A0A0A0]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleScrollTo("contact")}
              className="mt-4 flex items-center justify-center gap-1.5 w-full bg-[#00FF88] text-black font-bold text-sm uppercase py-3.5 rounded-full hover:bg-white transition-all duration-300"
            >
              Let's Talk <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
