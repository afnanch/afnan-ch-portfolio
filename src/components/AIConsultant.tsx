import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, RefreshCw, Cpu, User, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

const SAMPLE_PROMPTS = [
  "How can we scale our Shopify store purchase conversions?",
  "Suggest a high-retention 30-sec reel video script.",
  "What is your strategy for optimizing high-intent Google Ads keyword bids of ₹500+?"
];

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I am Afnan CH's AI twin model, configured with his metrics, case histories, and performance marketing strategies. Ask me anything about scaling your audience, optimizing Google/Meta ads, executing Technical SEO audits, or building a viral video pipeline!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Gather context history for the past 5 turns
      const chatHistory = messages.map((m) => ({
        role: m.role,
        text: m.text,
      })).slice(-6);

      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, chatHistory }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: data.error || "I experienced some minor visual distortion. Please retry!"
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "My digital core was disconnected from the ad network. Let's communicate directly using the lead form below!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "model",
        text: "Strategy terminal rebooted. Ask me anything about setting up server-side conversion tracking APIs, structuring technical audits, or optimizing search campaigns!"
      }
    ]);
  };

  return (
    <div id="ai-twin-widget" className="relative bg-[#151515] border border-white/5 rounded-3xl p-6 lg:p-8 overflow-hidden shadow-2xl shadow-black/80">
      {/* Decorative radial spotlight inside the card */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#00FF88]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C853] to-[#00FF88] text-black">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-extrabold text-lg tracking-tight flex items-center gap-1.5">
              Afnan's AI Strategy Twin
              <span className="bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20 text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full">
                Gemini-Powered
              </span>
            </h3>
            <p className="text-[#A0A0A0] text-xs font-mono">Simulate a high-ROAS strategic marketing review</p>
          </div>
        </div>

        <button
          onClick={resetChat}
          className="flex items-center justify-center gap-1.5 text-xs text-[#A0A0A0] hover:text-[#00FF88] border border-white/5 bg-white/5 hover:bg-[#00FF88]/10 px-3 py-1.5 rounded-full transition-all font-mono"
        >
          <RefreshCw className="h-3 w-3" /> Reset Session
        </button>
      </div>

      {/* Terminal View area */}
      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto mb-6 pr-2 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
        id="ai-history-viewport"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
            }`}
          >
            {/* Avatar block */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                msg.role === "user" ? "bg-white/10 text-white" : "bg-[#00FF88]/10 text-[#00FF88]"
              }`}
            >
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>

            {/* Chat bubble body */}
            <div
              className={`p-4 rounded-2xl text-[14px] leading-relaxed transition-all duration-300 font-sans ${
                msg.role === "user"
                  ? "bg-[#00FF88] text-black rounded-tr-none font-medium"
                  : "bg-white/[0.03] border border-white/5 text-slate-200 rounded-tl-none font-normal"
              }`}
            >
              {msg.text.split("\n").map((para, i) => (
                <p key={i} className="mb-2 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 self-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-[#00FF88]/10 text-[#00FF88]">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 rounded-tl-none text-xs text-[#A0A0A0] font-mono flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF88]"></span>
              </span>
              Formulating conversion strategy framework...
            </div>
          </div>
        )}
      </div>

      {/* Preset Strategy Prompts */}
      <div className="mb-5">
        <span className="text-[11px] uppercase font-mono font-bold tracking-widest text-white/40 block mb-2">
          Select standard audit queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="text-xs text-left text-white/70 bg-white/[0.02] border border-white/5 hover:border-[#00FF88]/30 hover:bg-[#00FF88]/5 hover:text-white px-3 py-2 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 bg-black border border-white/10 rounded-full p-1.5 pr-2 pl-4 focus-within:border-[#00FF88]/50 transition-colors"
      >
        <MessageSquare className="h-4 w-4 text-[#A0A0A0]" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about conversion rates, ad structures, SEO..."
          disabled={loading}
          className="bg-transparent flex-1 border-none focus:outline-none text-[14px] text-white placeholder-white/30 disabled:opacity-50"
          id="ai-consultant-prompt-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#00FF88] text-black h-9 px-4 rounded-full flex items-center justify-center font-bold hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Send Consultation inquiry"
        >
          <Send className="h-3.5 w-3.5 mr-1" />
          <span className="hidden sm:inline text-xs uppercase tracking-wider">Analyze</span>
        </button>
      </form>
    </div>
  );
}
