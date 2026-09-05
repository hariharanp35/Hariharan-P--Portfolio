import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import process from "node:process";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5175;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const portfolioContext = `
You are HP AI, the Personal Portfolio Assistant for Hariharan P's personal portfolio website.

Portfolio owner details:
- Name: Hariharan P
- Role: Data, AI, Code, Design
- Education: B.Tech in Artificial Intelligence and Data Science at Annapoorana Engineering College, Salem (2023-2027), CGPA 8.18 as of Semester 6; Higher Secondary 60%; Secondary School pass result.
- Skills: Python, SQL, MySQL, Microsoft Excel, Power BI, Java, C, JavaScript, HTML5, CSS3, Data Analytics, Data Visualization, EDA, ETL/ELT, Tableau, Pandas, NumPy, Matplotlib, Seaborn, REST APIs, API integration, Frontend development, Backend development, UI/UX design, Git/GitHub, Figma.
- Projects: Sales Performance Analysis Dashboard (Power BI + Excel + MySQL), Trick Bills (Python/HTML/CSS/JS expense tracking app), Shoe Store Website UI/UX Prototype (Figma prototype).
- Achievements: Visionary Innovators Award at Hack Fest 2K25; Third Prize for Shoe Website Prototype during Intra-Symposium.
- Certifications: L&T Fundamentals of Agile Methodology with DevOps Integration, George Academy Front-End Web Development, IBM C Programming.
- Experience: Data Science Internship at OdugaaTech Pvt. Ltd. (Jun-Jul 2026), Front-End Web Development Internship at ALGOJAXION Global Soft Pvt. Ltd. (Jun-Jul 2025).
- Contact: email hariharanp3506@gmail.com, phone +91 9047733143, address Ammapet, Salem, Tamil Nadu-636003, GitHub https://github.com/hariharanp35, LinkedIn https://www.linkedin.com/in/phariharan.

Rules:
- You are a general-purpose AI assistant as well as Hariharan's portfolio and technology/career assistant.
- Answer broad educational, informational, technical, career, and everyday questions using your available knowledge. Do not use a topic whitelist or reject a question because it is outside technology.
- Answer questions about Computer Science, full-stack development, data analytics, UI/UX, AI/ML, programming, cloud, DevOps, databases, cybersecurity, science, mathematics, business, history, geography, and general knowledge when asked.
- Answer in a clear, concise, professional, friendly tone and adapt explanations to the user's apparent level.
- Maintain conversation context and resolve follow-up references such as "it", "this", "he", and "his" from the recent messages.
- For Hariharan-specific facts, use only the portfolio facts above. Never invent personal information, experience, companies, projects, certifications, achievements, education, skills, or contact details.
- If a Hariharan-specific fact is unavailable, say: "I don't have that information available in Hariharan's portfolio."
- Stay accurate, acknowledge uncertainty, and avoid generic filler.
`;

const getOfflineReply = (question) => {
  const normalized = question.toLowerCase();
  if (normalized.includes("data science")) {
    return "Data Science combines statistics, programming, and domain knowledge to collect, clean, analyze, and model data. It turns raw information into insights, predictions, and better decisions using tools such as Python, SQL, and visualization platforms.";
  }
  if (normalized.includes("python")) {
    return "Python is a general-purpose programming language with readable syntax and a large ecosystem. It is widely used for automation, web development, data analysis, machine learning, APIs, and scripting.";
  }
  if (normalized.includes("sql")) {
    return "SQL, or Structured Query Language, is used to work with relational databases. It can retrieve, filter, join, group, insert, update, and analyze structured data in systems such as MySQL.";
  }
  if (
    normalized.includes("machine learning") ||
    normalized.includes("what is ml")
  ) {
    return "Machine learning is a branch of AI in which algorithms learn patterns from data to make predictions or decisions. A typical workflow includes preparing data, training a model, evaluating it, and improving its performance.";
  }
  if (normalized.includes("power bi")) {
    return "Power BI is Microsoft's business intelligence platform for connecting to data, transforming it, building data models, and creating interactive reports and dashboards. DAX is used for calculated columns and measures.";
  }
  if (normalized.includes("skill") || normalized.includes("technology")) {
    return "Hariharan works across programming, databases, tools and technologies, backend, frontend, and data analytics. Core skills include Python, SQL, MySQL, Microsoft Excel, Power BI, JavaScript, REST APIs, Git, GitHub, Figma, Pandas, NumPy, and data visualization.";
  }
  if (normalized.includes("project") || normalized.includes("portfolio")) {
    return "Hariharan's featured projects are a Sales Performance Analysis Dashboard using Power BI, Excel, and MySQL; Trick Bills, an expense tracking application using Python, HTML, CSS, and JavaScript; and a Shoe Store Website UI/UX Prototype created in Figma.";
  }
  if (normalized.includes("education") || normalized.includes("study")) {
    return "Hariharan is pursuing a B.Tech in Artificial Intelligence and Data Science at Annapoorana Engineering College, Salem, from 2023 to 2027. His CGPA is 8.18 as of Semester 6.";
  }
  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("reach")
  ) {
    return "Hariharan can be contacted at hariharanp3506@gmail.com or +91 9047733143. He is based in Ammapet, Salem, Tamil Nadu. His GitHub is https://github.com/hariharanp35 and LinkedIn is https://www.linkedin.com/in/phariharan.";
  }
  if (normalized.includes("certif")) {
    return "Hariharan has certifications from L&T in Fundamentals of Agile Methodology with DevOps Integration, George Academy in Front-End Web Development, and IBM in C Programming.";
  }
  if (normalized.includes("experience") || normalized.includes("internship")) {
    return "Hariharan completed a Data Science Internship at OdugaaTech Pvt. Ltd. in Jun-Jul 2026 and a Front-End Web Development Internship at ALGOJAXION Global Soft Pvt. Ltd. in Jun-Jul 2025.";
  }
  if (normalized.includes("hariharan") || normalized.includes("who are you")) {
    return "Hariharan P is an engineering student focused on Data, AI, Code, and Design. He enjoys turning complex systems into useful, thoughtful digital experiences.";
  }
  return "Sorry, I couldn't process that request right now. The general AI service is not configured on this server. Please try again later or ask about Hariharan's portfolio information.";
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "HP AI API is running." });
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "Please provide at least one message.",
    });
  }

  const cleanMessages = messages
    .filter((message) => message && typeof message.content === "string")
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.content.trim(),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-20);

  if (cleanMessages.length === 0) {
    return res.status(400).json({
      error: "Please provide a non-empty message.",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.warn(
      "OPENAI_API_KEY is not configured; using HP AI offline fallback.",
    );
    return res.json({
      reply: getOfflineReply(cleanMessages.at(-1).content),
      source: "local",
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 250,
        messages: [
          { role: "system", content: portfolioContext },
          ...cleanMessages,
        ],
      }),
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(
        `OpenAI returned ${response.status}: ${await response.text()}`,
      );
      return res.status(response.status).json({
        error:
          "The AI service is temporarily unavailable. Please try again in a moment.",
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({
        error: "The AI response was empty. Please try again.",
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return res.status(500).json({
      error:
        error?.name === "AbortError"
          ? "The AI request timed out. Please try again."
          : "Something went wrong while contacting the AI assistant. Please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`HP AI API listening on http://localhost:${port}`);
});
