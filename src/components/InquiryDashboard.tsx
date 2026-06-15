import { useEffect, useState } from "react";
import { UserCheck, DollarSign, CalendarCheck, FileCheck, Layers } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  createdAt: string;
  status: "Active Lead" | "Proposal Sent" | "Meeting Scheduled";
}

interface InquiryDashboardProps {
  refreshTrigger: number;
}

export default function InquiryDashboard({ refreshTrigger }: InquiryDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (err) {
        console.error("Failed to load leads list", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [refreshTrigger]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active Lead":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Meeting Scheduled":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Proposal Sent":
        return "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/20";
      default:
        return "bg-white/10 text-white/70 border-white/10";
    }
  };

  const calculateTotalBudgetPipeline = () => {
    // Basic approximate pipeline sizing based on string budgets
    let totalInLakhs = 0;
    leads.forEach((l) => {
      if (l.budget.includes("15")) totalInLakhs += 15;
      else if (l.budget.includes("10")) totalInLakhs += 10;
      else if (l.budget.includes("5")) totalInLakhs += 5;
      else totalInLakhs += 2.5; // default fallback 2.5 Lakhs
    });
    return `₹${totalInLakhs} Lakh+`;
  };

  return (
    <div className="bg-[#151515] border border-white/5 rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FF88]/50 to-transparent" />

      {/* Header Metric Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-white/5 pb-6 mb-6">
        <div className="flex items-center gap-3 bg-black/30 border border-white/5 rounded-2xl p-4">
          <div className="h-10 w-10 rounded-xl bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block">Pipeline Size</span>
            <span className="text-white font-extrabold text-xl font-sans tracking-tight block">
              {loading ? "Calculating..." : calculateTotalBudgetPipeline()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/30 border border-white/5 rounded-2xl p-4">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block">Total Accounts</span>
            <span className="text-white font-extrabold text-xl font-sans tracking-tight block">
              {loading ? "..." : `${leads.length}`} Deals
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/30 border border-white/5 rounded-2xl p-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest block">Primary Market</span>
            <span className="text-[#00FF88] font-bold text-sm font-sans tracking-tight block">
              India / GCC (UAE & KSA)
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <h4 className="text-white font-bold text-base tracking-tight flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]"></span>
          </span>
          Live Client Funnel Traffic (Active Inquiries)
        </h4>
        <span className="text-[10px] text-[#A0A0A0] font-mono border border-white/10 bg-white/5 px-2.5 py-1 rounded-full">
          UTC Live
        </span>
      </div>

      {loading ? (
        <div className="py-10 text-center text-[#A0A0A0] text-xs font-mono animate-pulse">
          Fetching active marketing deals pipeline...
        </div>
      ) : leads.length === 0 ? (
        <div className="py-10 text-center text-white/30 text-xs font-mono border border-dashed border-white/10 rounded-2xl">
          Pipeline is currently clear. Scale yours by filing the inquiry card!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-white/50 font-mono text-[10px] uppercase tracking-wider">
                <th className="pb-3 pt-1">Company / Brand</th>
                <th className="pb-3 pt-1">Ad Budget</th>
                <th className="pb-3 pt-1 hidden md:table-cell">Submitted Time</th>
                <th className="pb-3 pt-1 text-right">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors rounded-xl">
                  <td className="py-3 pr-2">
                    <span className="text-white font-semibold block">{lead.company}</span>
                    <span className="text-white/40 text-[10.5px] block">{lead.name.split(" ")[0]} • {lead.email.substring(0, 15)}...</span>
                  </td>
                  <td className="py-3">
                    <span className="text-[#00FF88] font-mono font-medium block">
                      {lead.budget}
                    </span>
                  </td>
                  <td className="py-3 text-white/40 hidden md:table-cell">
                    {new Date(lead.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 text-right">
                    <span className={`inline-block text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[10.5px] text-[#A0A0A0]/80 font-mono text-center">
            *Submitted inquiries above trigger a secure backend websocket payload instantly.
          </p>
        </div>
      )}
    </div>
  );
}
