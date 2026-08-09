import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// Initialize Gemini client lazily
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "zainab-web-studio",
      },
    },
  });
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", studio: "Zainab Web Studio" });
});

// Contact & Strategy Call Booking Route
app.post("/api/contact", (req, res) => {
  const { name, email, phone, service, budget, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const bookingId = "ZWS-" + Math.floor(100000 + Math.random() * 900000);
  res.json({
    success: true,
    bookingId,
    message: `Thank you ${name}! Your consultation request has been received. Our senior strategy team at Zainab Web Studio will reach out to ${email} within 24 hours.`,
    details: { name, service, budget, bookingId }
  });
});

// AI Service Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Smart Fallback Response
      const lower = message.toLowerCase();
      let reply = "Welcome to Zainab Web Studio! We specialize in custom web development, SEO, SMM, PPC ads, and content creation. How can we help scale your business online today?";
      
      if (lower.includes("seo") || lower.includes("search") || lower.includes("google")) {
        reply = "Our SEO services focus on high-intent keyword ranking, technical page speed audits, topic cluster content, and quality backlink building to drive organic revenue.";
      } else if (lower.includes("web") || lower.includes("design") || lower.includes("site") || lower.includes("development")) {
        reply = "We craft bespoke, high-converting websites optimized for speed, mobile responsiveness, and conversion architecture tailored to your brand identity.";
      } else if (lower.includes("social") || lower.includes("smm") || lower.includes("facebook") || lower.includes("instagram")) {
        reply = "Our Social Media Marketing (SMM) campaigns build engaged audiences on Meta, Instagram, and LinkedIn with targeted visual creative and performance analytics.";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp")) {
        reply = "You can contact Zainab Web Studio directly via WhatsApp at +923324357459, Email at shakeelammar59@gmail.com, or visit ZainabwebStudio.online!";
      } else if (lower.includes("developer") || lower.includes("abdullah") || lower.includes("hashmi")) {
        reply = "This platform is engineered and developed by Muhammad Abdullah Hashmi. You can view his developer portfolio at hashmerdev.vercel.app!";
      }

      return res.json({ reply });
    }

    const systemPrompt = `You are the chief AI Growth Strategist for Zainab Web Studio (Website: ZainabwebStudio.online, Email: shakeelammar59@gmail.com, WhatsApp: +923324357459).
Services offered:
1. Website Design & Optimization
2. Search Engine Optimization (SEO)
3. Social Media Marketing (SMM)
4. Pay-Per-Click Advertising (PPC)
5. Content Creation & Copywriting
6. Canva Ads & Video Production

Platform Developer Credit: Engineered by Muhammad Abdullah Hashmi (Portfolio: https://hashmerdev.vercel.app).

Respond clearly, professionally, and concisely using rich Markdown formatting (e.g. **bold text** for key highlights, bullet points for lists, and formatted links or subheadings where helpful) to provide well-structured advice to clients asking about services, pricing strategies, or consultation requests.`;

    const contents = [
      ...(conversationHistory || []).map((c: any) => `${c.role === 'user' ? 'Client' : 'Assistant'}: ${c.content}`),
      `Client: ${message}`
    ].join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    res.json({ reply: response.text || "Thank you for reaching out! How else can Zainab Web Studio assist your growth?" });
  } catch (error: any) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Chat service unavailable", details: error.message });
  }
});

export default app;
