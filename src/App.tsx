import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Braces,
  Check,
  ExternalLink,
  FileDown,
  Github,
  Heart,
  Database,
  Linkedin,
  Mail,
  MessageCircle,
  Menu,
  Mic,
  MicOff,
  MapPin,
  Moon,
  Phone,
  Send,
  Volume2,
  VolumeX,
  Server,
  Sparkles,
  Sun,
  Wrench,
  X,
  Monitor,
} from "lucide-react";

type Project = {
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  outcome: string;
  date?: string;
  mini?: boolean;
};
type ChatMessage = {
  id: number;
  text: string;
  sender: "bot" | "visitor";
  time: string;
};

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}
const projects: Project[] = [
  {
    title: "Sales Performance Analysis Dashboard",
    category: "Data Analytics",
    desc: "A Power BI dashboard built to analyze sales performance and identify trends across products, customers, and regions for data-driven decisions.",
    tags: ["Excel", "MySQL", "Power BI", "DAX"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    outcome: "Generated actionable business insights through KPI-led analysis.",
    date: "Sep 2025",
  },
  {
    title: "Trick Bills",
    category: "Full-Stack",
    desc: "A smart bill analysis web application designed to simplify expense tracking, automate bill categorization, and generate organized spending insights.",
    tags: ["Python", "HTML", "CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
    outcome: "Made everyday expense tracking more organized and efficient.",
    date: "Feb 2026",
    mini: true,
  },
  {
    title: "Shoe Store Website UI/UX Prototype",
    category: "UI/UX",
    desc: "A simple, user-friendly shoe shopping experience shaped through wireframes and an interactive Figma prototype focused on navigation, usability, and accessibility.",
    tags: ["Figma"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    outcome: "Created a clear and engaging prototype for online shopping.",
    date: "Apr 2025",
    mini: true,
  },
];
const skillCategories = [
  {
    title: "Programming Languages",
    icon: Braces,
    skills: ["Python", "Java", "C", "JavaScript"],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      "MySQL",
      "SQL",
      "Database Management",
      "SQL Queries",
      "Joins",
      "Aggregations",
      "CTEs",
      "Window Functions",
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Microsoft Excel",
      "Power BI",
      "Tableau",
      "Figma",
      "Google Sheets",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Python",
      "REST APIs",
      "API Integration",
      "Backend Development",
      "CRUD Operations",
      "Database Connectivity",
    ],
  },
  {
    title: "Frontend",
    icon: Monitor,
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "UI/UX Design",
      "Figma",
      "Component-Based Development",
    ],
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    skills: [
      "Data Cleaning",
      "Exploratory Data Analysis (EDA)",
      "Data Visualization",
      "Statistical Analysis",
      "KPI Reporting",
      "Dashboard Development",
      "Excel Analytics",
      "Power BI",
      "DAX",
      "Tableau",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "ETL / ELT",
      "OLTP vs OLAP",
      "CRM",
      "Data Modeling",
    ],
  },
];
const coreSkills = new Set([
  "Python",
  "SQL",
  "Microsoft Excel",
  "Power BI",
  "MySQL",
  "Data Analytics",
]);
const filters = ["All", "Data Analytics", "Full-Stack", "UI/UX"];
const profile = {
  name: "Hariharan P",
  firstName: "Hariharan",
  role: "Data • AI • Code • Design",
  email: import.meta.env.VITE_CONTACT_EMAIL || "hariharanp3506@gmail.com",
  phone: "+91 9047733143",
  address: "Ammapet, Salem, Tamil Nadu-636003",
  githubUrl:
    import.meta.env.VITE_GITHUB_URL || "https://github.com/hariharanp35",
  linkedinUrl:
    import.meta.env.VITE_LINKEDIN_URL ||
    "https://www.linkedin.com/in/phariharan",
  summary:
    "I’m Hariharan P, an engineering student turning complex systems into useful, thoughtful digital experiences.",
};
const contactEmail = profile.email;
const contactPhone = profile.phone;
const contactAddress = profile.address;
const githubUrl = profile.githubUrl;
const linkedinUrl = profile.linkedinUrl;
const resumeUrl = new URL(
  "../Assets/Hariharan.P  Resume  (2).pdf",
  import.meta.url,
).href;
const portraitUrl = new URL("../Assets/Black1.jpeg", import.meta.url).href;
const navSectionIds = [
  "about",
  "skills",
  "education",
  "certifications",
  "achievements",
  "projects",
  "experience",
  "contact",
];
const chatbotName = "HP AI";
const chatbotFullName = "HP AI Assistant";
const initialChatMessage: ChatMessage = {
  id: 1,
  sender: "bot",
  text: "Hi! 👋 I'm HP AI, your personal portfolio assistant. Ask me anything about Hariharan's skills, projects, education, certifications, technologies, or career interests.",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};
const hpAiSuggestedQuestions = [
  "👋 Who is Hariharan?",
  "💻 What are his skills?",
  "🚀 Tell me about his projects",
  "📊 What data analytics skills does he have?",
  "🛠️ What technologies does he use?",
  "📜 What certifications does he have?",
  "🎓 What is his education?",
  "📞 How can I contact him?",
];
const getChatReply = (question: string) => {
  const normalized = question.toLowerCase();
  if (
    normalized.includes("what is data science") ||
    normalized.includes("define data science")
  ) {
    return "Data Science combines statistics, programming, and domain knowledge to collect, clean, analyze, and model data. It helps turn raw information into insights, predictions, and better decisions using tools such as Python, SQL, Pandas, and visualization platforms.";
  }
  if (
    normalized.includes("what is python") ||
    normalized.includes("define python")
  ) {
    return "Python is a general-purpose programming language known for readable syntax and a large ecosystem. It is widely used for automation, web development, data analysis, machine learning, APIs, and scripting.";
  }
  if (normalized.includes("what is sql") || normalized.includes("define sql")) {
    return "SQL, or Structured Query Language, is used to work with relational databases. You can use it to retrieve, filter, join, group, insert, update, and analyze structured data in systems such as MySQL.";
  }
  if (
    normalized.includes("machine learning") ||
    normalized.includes("what is ml")
  ) {
    return "Machine learning is a branch of AI in which algorithms learn patterns from data to make predictions or decisions. A typical workflow includes preparing data, training a model, evaluating it, and improving its performance.";
  }
  if (normalized.includes("power bi")) {
    return "Power BI is Microsoft's business intelligence platform for connecting to data, transforming it, building data models, and creating interactive reports and dashboards. DAX is commonly used for calculated columns and measures.";
  }
  if (
    normalized.includes("sql and excel") ||
    normalized.includes("excel and sql")
  ) {
    return "SQL is best for querying and transforming structured data in a database, especially when datasets are large or shared across systems. Excel is best for quick analysis, formulas, exploration, and presentation. They are often used together: SQL prepares the data and Excel helps communicate or inspect it.";
  }
  if (normalized.includes("education") || normalized.includes("study")) {
    return `${profile.firstName} is pursuing a B.Tech in Artificial Intelligence and Data Science at Annapoorana Engineering College, Salem, from 2023 to 2027. His CGPA is 8.18 as of Semester 6. He completed Higher Secondary with 60% and Secondary School with a Pass result at Municipal Boys Higher Secondary School, Ammapet, Salem.`;
  }
  if (
    normalized.includes("skill") ||
    normalized.includes("technology") ||
    normalized.includes("tech")
  ) {
    return `${profile.firstName} works across ${skillCategories.map((category) => category.title).join(", ")}. Core skills include Python, SQL, MySQL, Microsoft Excel, Power BI, and Data Analytics.`;
  }
  if (
    normalized.includes("achievement") ||
    normalized.includes("accomplish") ||
    normalized.includes("outcome")
  ) {
    return `${profile.firstName} received the Visionary Innovators Award at Hack Fest 2K25 for developing an innovative solution with impactful implementation. He also secured Third Prize for developing a Shoe Website Prototype during the Intra-Symposium.`;
  }
  if (normalized.includes("certif")) {
    return `${profile.firstName} has certifications from L&T in Fundamentals of Agile Methodology with DevOps Integration, George Academy in Front-End Web Development, and IBM in C Programming.`;
  }
  if (normalized.includes("experience") || normalized.includes("work")) {
    return `${profile.firstName} completed a Data Science Internship at OdugaaTech Pvt. Ltd., Salem, in Jun–Jul 2026, and a Front-End Web Development Internship at ALGOJAXION Global Soft Pvt. Ltd., Salem, in Jun–Jul 2025.`;
  }
  if (normalized.includes("project") || normalized.includes("portfolio")) {
    return `Featured work includes ${projects.map((project) => project.title).join(", ")}.`;
  }
  if (
    normalized.includes("contact") ||
    normalized.includes("email") ||
    normalized.includes("reach")
  ) {
    return `You can contact ${profile.firstName} at ${contactEmail} or ${contactPhone}. He is based in ${contactAddress}. The Contact section also includes the resume, GitHub, LinkedIn, and a message form.`;
  }
  if (
    normalized.includes("who") ||
    normalized.includes("about") ||
    normalized.includes("personality")
  ) {
    return `${profile.firstName} works where data, AI, code, and design overlap, with a focus on turning complex systems into useful, thoughtful digital experiences.`;
  }
  return `I can help with general questions about data science, Python, SQL, machine learning, Power BI, and Excel, as well as ${profile.firstName}'s portfolio, skills, projects, education, certifications, experience, and contact details.`;
};
const createTimeStamp = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const askPortfolioAssistant = async (
  history: ChatMessage[],
  question: string,
): Promise<string> => {
  const sanitizedQuestion = question.trim();

  if (!sanitizedQuestion) {
    return "Please enter a question before sending it.";
  }

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history
          .filter((message) => message.text.trim())
          .map((message) => ({
            role: message.sender === "bot" ? "assistant" : "user",
            content: message.text,
          })),
      }),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as {
        error?: string;
      };
      throw new Error(errorData?.error || "AI service unavailable");
    }

    const data = (await response.json()) as { reply?: string };
    return data.reply?.trim() || getChatReply(sanitizedQuestion);
  } catch (error) {
    console.error(`${chatbotName} request failed:`, error);
    return getChatReply(sanitizedQuestion);
  }
};
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    if (!pointerQuery.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const render = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, [role=button]",
      );
      const project = target?.closest(".project-card");
      const image = target?.closest("img, .project-image");
      const hovering = Boolean(interactive || image);
      ringRef.current?.classList.toggle("cursor-hover", hovering);
      dotRef.current?.classList.toggle("cursor-hover", hovering);
      ringRef.current?.classList.toggle("cursor-project", Boolean(project));
    };

    const onClick = () => {
      ringRef.current?.classList.remove("cursor-click");
      void ringRef.current?.offsetWidth;
      ringRef.current?.classList.add("cursor-click");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    frame = requestAnimationFrame(render);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <span ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatTyping, setChatTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    initialChatMessage,
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setPageLoading(false), 420);
    return () => window.clearTimeout(loadingTimer);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(
        Math.min(
          100,
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100,
        ),
      );
      if (window.scrollY < 120) setActiveSection("top");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSection) setActiveSection(visibleSection.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const SpeechRecognitionClass =
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      null;
    setVoiceSupported(Boolean(SpeechRecognitionClass));

    if (!SpeechRecognitionClass) return;

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      if (transcript) setChatInput(transcript);
    };

    recognition.onerror = () => {
      setSpeechError("Voice recognition is unavailable right now.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatTyping]);
  const shown =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const nav = [
    { label: "Home", id: "top" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Certifications", id: "certifications" },
    { label: "Achievements", id: "achievements" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Contact", id: "contact" },
  ];
  const startVoiceCapture = () => {
    if (!voiceSupported || !recognitionRef.current) {
      setSpeechError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setSpeechError("");
    recognitionRef.current.start();
    setIsListening(true);
  };
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setSpeechError("Text-to-speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    setSpeechError("");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechError("Unable to play the AI response.");
    };
    window.speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };
  const sendChatMessage = async (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || chatTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "visitor",
      text: trimmed,
      time: createTimeStamp(),
    };
    const historySnapshot = [...chatMessages, userMessage];

    setChatMessages(historySnapshot);
    setChatInput("");
    setSpeechError("");
    setChatTyping(true);

    const reply = await askPortfolioAssistant(historySnapshot, trimmed);

    setChatMessages((current) => [
      ...current,
      {
        id: Date.now() + 1,
        sender: "bot",
        text: reply,
        time: createTimeStamp(),
      },
    ]);
    setChatTyping(false);
  };
  return (
    <div className="app">
      <CustomCursor />
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            className="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-label="Loading portfolio"
          >
            <span className="page-loader-mark">HP</span>
            <span className="page-loader-line" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scroll-progress" style={{ width: `${scrolled}%` }} />
      <header className="nav-wrap">
        <nav className="nav container">
          <motion.a
            className="brand brand-name"
            href="#top"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {"Hariharan P".split("").map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={character === "P" ? "brand-accent" : ""}
              >
                {character === " " ? "\u00a0" : character}
              </motion.span>
            ))}
          </motion.a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {nav.map((item) => (
              <a
                key={item.id}
                className={activeSection === item.id ? "active" : ""}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-tools">
            <button
              className="icon-btn menu-btn"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
            <button
              className="icon-btn theme-btn"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <div className="nav-socials" aria-label="Social links">
              <a
                className="icon-btn social-btn"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                className="icon-btn social-btn"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open LinkedIn profile"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <a
              className="nav-cta"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let's talk <ArrowUpRight size={13} />
            </a>
          </div>
        </nav>
      </header>
      <main id="top">
        <div className="ai-field" aria-hidden="true">
          <span className="ai-node node-one" />
          <span className="ai-node node-two" />
          <span className="ai-node node-three" />
          <span className="ai-node node-four" />
          <span className="ai-connection connection-one" />
          <span className="ai-connection connection-two" />
          <span className="ai-connection connection-three" />
        </div>
        <section className="hero container">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI &amp; Data Science / Portfolio
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {["Hariharan", "P."].map((word) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <p className="hero-role">
              AI &amp; Data Science Student <span>|</span> Aspiring Data Analyst
            </p>
            <motion.p
              className="hero-lede"
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              {profile.summary}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a className="button button-primary" href="#projects">
                View Projects <ArrowDown size={17} />
              </a>
              <a className="button button-secondary" href={resumeUrl} download>
                Download resume <FileDown size={17} />
              </a>
              <a className="text-link" href="#contact">
                Contact Me <ArrowUpRight size={17} />
              </a>
            </motion.div>
          </div>
          <div className="hero-visual">
            <div className="visual-grid" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <motion.div
              className="signal-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="signal-top">
                <span>LIVE SIGNAL</span>
                <span className="live-dot" />
              </div>
              <div className="signal-value">
                +42.8<span>%</span>
              </div>
              <div className="signal-label">clarity gained</div>
              <div className="bars">
                {[36, 50, 43, 72, 58, 88, 76, 96].map((h, i) => (
                  <i
                    key={i}
                    style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
            </motion.div>
            <span className="float-tag tag-python">Python</span>
            <span className="float-tag tag-ai">
              <Sparkles size={13} /> Gen AI
            </span>
            <span className="float-tag tag-figma">Figma</span>
            <div className="visual-caption">
              <span>01</span>
              <span>Curious by default.</span>
            </div>
          </div>
        </section>
        <section className="marquee">
          <div className="marquee-track">
            DATA ANALYTICS <span>✳</span> AI ENGINEERING <span>✳</span>{" "}
            FULL-STACK <span>✳</span> PRODUCT DESIGN <span>✳</span> DATA
            ANALYTICS <span>✳</span>
          </div>
        </section>
        <section id="about" className="section container about">
          <motion.div
            className="section-label"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            01 / About
          </motion.div>
          <div className="about-grid">
            <motion.div
              className="portrait"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, rotate: -1 }}
              viewport={{ once: true }}
            >
              <div className="portrait-inner">
                <img src={portraitUrl} alt="Hariharan P" />
                <div className="portrait-shade" />
                <span className="portrait-scan" />
                <span className="portrait-corner corner-top-left" />
                <span className="portrait-corner corner-top-right" />
                <span className="portrait-corner corner-bottom-left" />
                <span className="portrait-corner corner-bottom-right" />
              </div>
              <div className="portrait-orbit" aria-hidden="true" />
              <div className="portrait-meta" aria-hidden="true">
                <span>HM / 26</span>
                <span>DATA × AI</span>
              </div>
              <div className="availability">
                <i /> Available for meaningful work
              </div>
            </motion.div>
            <motion.div
              className="about-copy"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2>
                Building with data.
                <br />
                <em>Designing with purpose.</em>
              </h2>
              <p>
                I like working where disciplines overlap. My practice moves
                between analytics, software, AI, and interface design, always
                looking for the clearest path from a messy problem to a useful
                outcome.
              </p>
              <p>
                Right now I’m deepening my engineering foundations, shipping
                small experiments, and learning how intelligent tools can make
                digital products feel more human.
              </p>
              <div className="about-meta">
                <span>
                  <strong>Based in</strong> India / open to the world
                </span>
                <span>
                  <strong>Currently</strong> learning in public
                </span>
              </div>
            </motion.div>
          </div>
        </section>
        <section id="skills" className="section section-tint">
          <div className="container">
            <motion.div
              className="section-heading"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="section-label">02 / Toolkit</div>
              <h2>
                A versatile <em>toolkit</em>
                <br />
                for real problems.
              </h2>
            </motion.div>
            <div className="skill-categories">
              {skillCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.article
                    className={`skill-category-card ${category.title === "Data Analytics" ? "core-category" : ""}`}
                    key={category.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.07 }}
                    viewport={{ once: true }}
                  >
                    <div className="skill-category-header">
                      <span className="skill-category-icon">
                        <CategoryIcon size={19} />
                      </span>
                      <span className="skill-category-number">
                        0{categoryIndex + 1}
                      </span>
                    </div>
                    <h3>{category.title}</h3>
                    <div className="skill-badges">
                      {category.skills.map((skill) => (
                        <span
                          className={coreSkills.has(skill) ? "core-skill" : ""}
                          key={`${category.title}-${skill}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
        <section id="education" className="section container education">
          <motion.div
            className="section-heading"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <div className="section-label">03 / Education</div>
              <h2>
                Foundations for
                <br />
                <em>better systems.</em>
              </h2>
            </div>
            <p>
              Learning the fundamentals behind useful, intelligent software.
            </p>
          </motion.div>
          <div className="education-timeline">
            {[
              {
                period: "2023 — 2027",
                level: "Undergraduate degree",
                title: "B.Tech - Artificial Intelligence and Data Science",
                institution:
                  "Annapoorana Engineering College, Salem, Tamil Nadu",
                result: "CGPA: 8.18 (as of Semester 6)",
              },
              {
                period: "2022 — 2023",
                level: "Higher Secondary (12th)",
                title: "Municipal Boys Higher Secondary School",
                institution: "Ammapet, Salem, Tamil Nadu",
                result: "Percentage: 60%",
              },
              {
                period: "2020 — 2021",
                level: "Secondary School (10th)",
                title: "Municipal Boys Higher Secondary School",
                institution: "Ammapet, Salem, Tamil Nadu",
                result: "Result: Pass",
              },
            ].map((education, index) => (
              <motion.article
                className="education-card"
                key={education.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="education-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="education-details">
                  <div className="education-topline">
                    <span className="education-period">{education.period}</span>
                    <span className="education-level">{education.level}</span>
                  </div>
                  <h3>{education.title}</h3>
                  <p>{education.institution}</p>
                  <strong>{education.result}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="certifications" className="section certifications">
          <div className="container">
            <motion.div
              className="section-heading"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <div className="section-label">04 / Certifications</div>
                <h2>
                  Learning that
                  <br />
                  <em>ships.</em>
                </h2>
              </div>
              <p>
                Practical credentials across Agile, web development, and
                programming.
              </p>
            </motion.div>
            <div className="certification-grid">
              {[
                {
                  provider: "L&T",
                  title:
                    "Fundamentals of Agile Methodology with DevOps Integration",
                  detail:
                    "Learned Agile and DevOps fundamentals with hands-on practice using Git and Git Bash to manage and push projects to GitHub.",
                },
                {
                  provider: "George Academy",
                  title: "Front-End Web Development",
                  detail:
                    "Gained practical knowledge of HTML, CSS, JavaScript, and responsive web development.",
                },
                {
                  provider: "IBM",
                  title: "C Programming",
                  detail:
                    "Learned C programming fundamentals and applied them by writing code and solving basic programming problems.",
                },
              ].map((certification, index) => (
                <motion.article
                  className="certification-card"
                  key={certification.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="certification-number">0{index + 1}</div>
                  <div className="certification-provider">
                    {certification.provider}
                  </div>
                  <h3>{certification.title}</h3>
                  <p>{certification.detail}</p>
                  <span className="certification-mark">
                    CERTIFIED / PRACTICAL
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="achievements"
          className="section section-tint achievements"
        >
          <div className="container">
            <motion.div
              className="section-heading"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <div className="section-label">05 / Achievements</div>
                <h2>
                  Curiosity turned
                  <br />
                  into <em>outcomes.</em>
                </h2>
              </div>
            </motion.div>
            <div className="achievement-list">
              {[
                {
                  title: "Visionary Innovators Award",
                  event: "Hack Fest 2K25",
                  detail:
                    "Received the Visionary Innovators Award at Hack Fest 2K25 for developing an innovative solution with impactful implementation.",
                },
                {
                  title: "Third Prize",
                  event: "Intra-Symposium",
                  detail:
                    "Secured Third Prize for developing a Shoe Website Prototype during the Intra-Symposium.",
                },
              ].map((achievement, index) => (
                <motion.article
                  className="achievement-row"
                  key={achievement.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.14 }}
                  viewport={{ once: true }}
                >
                  <div className="achievement-badge">
                    <span>0{index + 1}</span>
                    <i />
                  </div>
                  <div className="achievement-content">
                    <div className="achievement-event">{achievement.event}</div>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.detail}</p>
                    <span className="achievement-mark">
                      RECOGNITION / VERIFIED
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="section container projects">
          <motion.div
            className="section-heading projects-head"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <div className="section-label">06 / Selected work</div>
              <h2>
                Small steps,
                <br />
                <em>useful outcomes.</em>
              </h2>
            </div>
            <p>
              A growing collection of projects that sit at the intersection of
              curiosity and craft.
            </p>
          </motion.div>
          <div className="filters">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <motion.div layout className="project-grid">
            {shown.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                className={`project-card ${index === 0 ? "featured" : ""} ${project.mini ? "mini-project" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="project-image">
                  <img src={project.image} alt="" loading="lazy" />
                  <span className="project-index">0{index + 1}</span>
                  <a
                    href="#contact"
                    className="project-link"
                    aria-label={`Open ${project.title}`}
                  >
                    <ArrowUpRight />
                  </a>
                </div>
                <div className="project-info">
                  <div className="project-category">
                    {project.category}
                    {project.date && (
                      <span className="project-date">{project.date}</span>
                    )}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-foot">
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="outcome">{project.outcome}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
        <section id="experience" className="section section-dark">
          <div className="container experience">
            <motion.div
              className="section-label"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              07 / Work experience
            </motion.div>
            <div className="experience-grid">
              <div>
                <h2>
                  Real-world
                  <br />
                  <em>experience.</em>
                </h2>
                <p className="experience-lede">
                  Turning classroom foundations into practical work across data
                  science and front-end development.
                </p>
              </div>
              <div className="timeline">
                {[
                  {
                    period: "Jun 2026 — Jul 2026",
                    role: "Data Science Intern",
                    company: "OdugaaTech Pvt. Ltd., Salem",
                    highlights: [
                      "Analyzed real-world datasets using Python and data analysis tools to identify meaningful insights.",
                      "Performed data cleaning, preprocessing, and visualization to support data-driven analysis.",
                      "Strengthened analytical, problem-solving, and data interpretation skills through structured datasets.",
                    ],
                  },
                  {
                    period: "Jun 2025 — Jul 2025",
                    role: "Front-End Web Development Intern",
                    company: "ALGOJAXION Global Soft Pvt. Ltd., Salem",
                    highlights: [
                      "Developed responsive website interfaces using HTML, CSS, and JavaScript.",
                      "Improved user experience by implementing responsive design principles.",
                      "Collaborated with the team to enhance application functionality and performance.",
                    ],
                  },
                ].map((internship, index) => (
                  <motion.article
                    className="timeline-item internship-item"
                    key={internship.role}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.14 }}
                    viewport={{ once: true }}
                  >
                    <div className="internship-marker">0{index + 1}</div>
                    <div className="internship-content">
                      <div className="internship-topline">
                        <span>{internship.period}</span>
                        <span>INTERNSHIP</span>
                      </div>
                      <h3>{internship.role}</h3>
                      <p className="internship-company">{internship.company}</p>
                      <ul>
                        {internship.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="section contact container">
          <motion.div
            className="contact-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="section-label">08 / Contact</div>
            <h2>
              Have a good
              <br />
              <em>question?</em>
            </h2>
            <p>
              I’m always interested in thoughtful problems, new perspectives,
              and work that leaves things better than it found them.
            </p>
            <div className="contact-links">
              <a href={resumeUrl} download>
                <FileDown size={17} /> Download resume
              </a>
              <a href={`tel:${contactPhone.replace(/\s/g, "")}`}>
                <Phone size={17} /> {contactPhone}
              </a>
              <a href={`mailto:${contactEmail}`}>
                <Mail size={17} /> {contactEmail}
              </a>
              <a
                href="https://maps.google.com/?q=Ammapet,Salem,Tamil+Nadu+636003"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={17} /> {contactAddress}
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <Github size={17} /> GitHub <ExternalLink size={13} />
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> LinkedIn <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
          <motion.form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const subject = encodeURIComponent("Portfolio enquiry");
              const body = encodeURIComponent(
                `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`,
              );
              window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
              setSent(true);
            }}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <label>
              Name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              What are you thinking about?
              <textarea
                required
                name="message"
                rows={4}
                placeholder="A project, a collaboration, a hello..."
              />
            </label>
            <button className="button button-primary" type="submit">
              {sent ? (
                <>
                  Message sent <Check size={17} />
                </>
              ) : (
                <>
                  Send message <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </section>
      </main>
      <div className="chatbot">
        <AnimatePresence>
          {chatOpen && (
            <motion.section
              className="chat-panel"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              aria-label={`${chatbotFullName}, Personal Portfolio Assistant`}
            >
              <div className="chat-header">
                <div
                  className="chat-avatar chat-avatar-symbol"
                  aria-hidden="true"
                >
                  ⌬
                </div>
                <div>
                  <strong>{chatbotName}</strong>
                  <span>
                    <i /> Personal Portfolio Assistant
                  </span>
                </div>
                <span className="chat-status-badge">⌬ ONLINE</span>
                <button
                  className="chat-close"
                  type="button"
                  title="Close HP AI"
                  aria-label="Close HP AI chat"
                  onClick={() => setChatOpen(false)}
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="chat-messages" aria-live="polite">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`chat-message ${message.sender}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="chat-bubble-content">{message.text}</div>
                    <span className="chat-time">{message.time}</span>
                    {message.sender === "bot" && (
                      <button
                        type="button"
                        className="chat-speaker"
                        aria-label="Read HP AI reply aloud"
                        onClick={() =>
                          isSpeaking ? stopSpeaking() : speakText(message.text)
                        }
                      >
                        {isSpeaking ? (
                          <VolumeX size={12} />
                        ) : (
                          <Volume2 size={12} />
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
                {chatTyping && (
                  <div className="chat-typing" aria-label="HP AI is thinking">
                    <span className="chat-typing-label">HP AI thinking</span>
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>
              <div className="chat-quick-replies">
                {hpAiSuggestedQuestions.map((prompt) => (
                  <button key={prompt} onClick={() => sendChatMessage(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
              <form
                className="chat-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendChatMessage(chatInput);
                }}
              >
                <button
                  type="button"
                  className={`voice-toggle ${isListening ? "active" : ""}`}
                  aria-label={
                    isListening
                      ? "Stop HP AI voice input"
                      : "Start HP AI voice input"
                  }
                  onClick={startVoiceCapture}
                  disabled={!voiceSupported}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <textarea
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder={
                    voiceSupported
                      ? "Ask a question..."
                      : "Voice input unavailable"
                  }
                  aria-label="Ask a question"
                  rows={1}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendChatMessage(chatInput);
                    }
                  }}
                />
                <button type="submit" aria-label="Send question">
                  <Send size={16} />
                </button>
              </form>
              {(isListening || isSpeaking || speechError) && (
                <div
                  className={`chat-voice-status ${isListening ? "listening" : ""} ${isSpeaking ? "speaking" : ""}`}
                  role="status"
                  aria-live="polite"
                >
                  {isListening ? (
                    <>
                      <Mic size={13} /> <strong>HP AI Listening...</strong>
                      <span className="voice-wave" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    </>
                  ) : isSpeaking ? (
                    <>
                      <Volume2 size={13} />{" "}
                      <strong>HP AI is speaking...</strong>
                      <span className="voice-wave" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    </>
                  ) : (
                    <span>{speechError}</span>
                  )}
                </div>
              )}
              <button
                className="chat-reset"
                onClick={() => {
                  setChatMessages([initialChatMessage]);
                  stopSpeaking();
                }}
              >
                Reset conversation
              </button>
            </motion.section>
          )}
        </AnimatePresence>
        <button
          className="chat-launcher"
          onClick={() => setChatOpen(!chatOpen)}
          title={chatOpen ? "Close HP AI" : "Open HP AI"}
          aria-label={chatOpen ? "Close HP AI chat" : "Open HP AI chat"}
        >
          <span className="chat-symbol" aria-hidden="true">
            ⌬
          </span>
          {!chatOpen && <span className="chat-pulse" />}
        </button>
      </div>
      <footer>
        <div className="container footer">
          <motion.span
            className="brand brand-name"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {"Hariharan P".split("").map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={character === "P" ? "brand-accent" : ""}
              >
                {character === " " ? "\u00a0" : character}
              </motion.span>
            ))}
          </motion.span>
          <span className="footer-quote">
            The journey of a thousand miles begins with a single step
            <Heart size={12} fill="currentColor" aria-label="with heart" />
          </span>
          <span className="footer-role">
            AI &amp; Data Science | Data Analytics | Technology
          </span>
          <a href="#top">
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}
export default App;
