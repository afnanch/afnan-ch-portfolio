import { useState } from "react";
import { PROJECTS } from "../data";
import { ArrowUpRight, CheckCircle2, Cpu, BarChart3, HelpCircle } from "lucide-react";

const CATEGORIES = [
  "All",
  "Google Ads Campaigns",
  "Meta Ads Campaigns",
  "SEO Projects",
  "Shopify Stores",
  "Brand Growth Projects",
  "Content Creation Campaigns"
];

export default function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div id="project-catalog-component" className="w-full">
      {/* Category Selection Filter Pill list */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-5 py-2.5 rounded-full font-semibold border transition-all duration-300 whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#00FF88] text-black border-transparent shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                : "bg-[#151515] text-[#A0A0A0] border-white/5 hover:text-white hover:bg-white/5 hover:border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const isHovered = hoveredId === p.id;

          return (
            <div
              key={p.id}
              id={`project-card-${p.id}`}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-[#151515] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full shadow-lg hover:shadow-black/90 hover:border-[#00FF88]/30"
            >
              {/* Image banner with high-contrast filter */}
              <div className="relative h-44 overflow-hidden bg-black shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/20 to-transparent z-10" />
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 z-20 text-[10px] font-mono tracking-widest font-extrabold uppercase bg-black/60 backdrop-blur-md text-[#00FF88] border border-[#00FF88]/20 px-3 py-1 rounded-full">
                  {p.industry}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-white font-extrabold text-lg tracking-tight mb-4 group-hover:text-[#00FF88] transition-colors flex items-center justify-between">
                    {p.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#A0A0A0] group-hover:text-[#00FF88] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h4>

                  {/* Quantitative structured Challenge, Strategy, Results metrics panel */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-black/30 border border-white/5 p-3 rounded-2xl flex items-start gap-2.5">
                      <HelpCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white/40 text-[9px] uppercase font-mono tracking-wider block">THE CHALLENGE</span>
                        <p className="text-white/80 text-[12.5px] leading-relaxed line-clamp-2 md:line-clamp-3">
                          {p.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-white/5 p-3 rounded-2xl flex items-start gap-2.5">
                      <Cpu className="h-4 w-4 text-[#00FF88] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white/40 text-[9px] uppercase font-mono tracking-wider block">THE STRATEGY</span>
                        <p className="text-white/80 text-[12.5px] leading-relaxed line-clamp-2 md:line-clamp-3">
                          {p.strategy}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-950/20 to-black/30 border border-emerald-500/20 p-3 rounded-2xl flex items-start gap-2.5">
                      <BarChart3 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <span className="text-[#00FF88] text-[9px] uppercase font-mono tracking-wider block font-bold">THE RESULTS</span>
                        <p className="text-[#00FF88] font-semibold text-[13px] leading-snug">
                          {p.results}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Tools used tags */}
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {p.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono font-medium text-white/50 bg-[#0A0A0A] border border-white/5 px-2.5 py-1 rounded-md"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glowing highlight ring on hover */}
              <div className="absolute inset-0 rounded-3xl border border-[#00FF88]/0 group-hover:border-[#00FF88]/20 pointer-events-none transition-colors duration-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
