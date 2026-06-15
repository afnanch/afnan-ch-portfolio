import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  createdAt: string;
  status: "Active Lead" | "Proposal Sent" | "Meeting Scheduled";
}

// In-Memory leads list (seeded with some simulated representative target clients to show visual dashboard depth)
const databaseInquiries: Inquiry[] = [
  {
    id: "lead-1",
    name: "Omar Al-Mansoori",
    email: "omar@ecomdubai.ae",
    company: "Falcon Elite E-Commerce",
    budget: "₹15 Lakh+",
    message: "Looking for an expert to revamp our Google Shopping ads and setup high-converting meta retargeting. We scale fast.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
    status: "Proposal Sent",
  },
  {
    id: "lead-2",
    name: "Sarah Jenkins",
    email: "sarah@clickventures.co",
    company: "ClickVentures London",
    budget: "₹10 Lakh+",
    message: "Heard about Afnan's video and reel marketing results. Need 30 converting reels for our SaaS launch next month.",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
    status: "Meeting Scheduled",
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Contact Form Submissions
  app.get("/api/leads", (req, res) => {
    res.json(databaseInquiries);
  });

  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, company, budget, message } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
      }

      const newInquiry: Inquiry = {
        id: `lead-${Date.now()}`,
        name: String(name),
        email: String(email),
        company: String(company || "Independent"),
        budget: String(budget || "Not Specified"),
        message: String(message || ""),
        createdAt: new Date().toISOString(),
        status: "Active Lead",
      };

      databaseInquiries.unshift(newInquiry);
      res.status(201).json({ success: true, lead: newInquiry });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to submit lead" });
    }
  });

  // API Route: AI Strategy Consultant Twin (Gemini API)
  app.post("/api/gemini/consult", async (req, res) => {
    try {
      const { message, chatHistory } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Consultation prompt is required" });
      }

      // System instruction explaining Afnan's professional persona, values, skills, and approach
      const systemInstruction = `You are "Afnan's AI Strategy Consultant Twin", an interactive AI expert representing Afnan CH, a elite Digital Marketing Strategist & Performance Marketing Specialist with 4+ years of growth expertise.
Afnan CH is a marketer who focuses strictly on performance marketing, customer acquisition cost (CAC), return on ad spend (ROAS), lifetime value (LTV), search engine optimization (SEO), e-commerce conversion rate optimization (CRO) and modern content production.

Key facts about Afnan CH to inject into conversations naturally:
1. Professional credentials:
   - Positions held: Digital Marketing Intern (CB Tech), Digital Marketing Strategist (Softroniics), Digital Marketing Faculty (Skill Mount / Epic Ventures), Digital Marketing Manager (Rahman World), Sales & Marketing Strategist (DAFO Industries).
   - Core Stats/KPIs: 50,000+ Followers Grown, 10M+ Monthly Views Generated, 5000+ Business Inquiries Generated, 500+ Marketing Videos Created, ₹10 Lakh+ Ad Budget Managed.
   - Core Skills: Google Ads, Meta Ads (PPC, Lead Generation), SEO (Technical, On-Page, Off-Page, SEMRush), Social Media (Content Creation, Reels Strategy, Video Marketing), Web & E-Commerce (Shopify, WordPress, CRO), Analytics (Google Analytics GA4, Conversion Tracking, Event Tracking, Reporting).
   - Certifications: Google Ads Certification, Meta Certified Marketing Professional, Digital Marketing Executive Diploma.

Rules for your tone & assistance:
- Be highly strategic, performance-driven, analytical, energetic, and professional.
- Talk like a seasoned marketing general manager who cares about cash flow, lead volume, and business scale, not amateur buzzwords.
- Whenever asked a marketing question, provide actual tactical insights (e.g., recommend restructuring Google Ads keyword match types, setting up broad match + smart bidding, optimizing landing page headlines, or implementing custom GA4 conversion events).
- Keep responses relatively brief (2-3 short, highly impactful paragraphs) under a professional tone. Mention "My name is Afnan CH (and I am representing his AI twin model today)" or refer to things as "I did this in my Rahman World role" or "At Softroniics...".
- Keep formatting clean, using bold terms for scannability.
- Suggest joining a quick call or filling out the contact form below to get a custom dashboard built for their business.`;

      // Format conversation history for Gemini if present
      const formattedContents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          formattedContents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.85,
        },
      });

      const replyText = response.text || "I am currently optimizing our ad strategies. Let's discuss directly!";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini Consult Error:", error);
      res.status(500).json({
        error: "I am currently adjusting my performance servers. Let's connect directly via the inquiry form below!",
        details: error.message || String(error),
      });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Afnan CH Portfolio Backend] Running on http://localhost:${PORT}`);
  });
}

startServer();
