import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const THEMES = [
  { id: "cyber", name: "Midnight Cyber", color: "#6366f1", icon: "🌌" },
  { id: "emerald", name: "Emerald Hacker", color: "#10b981", icon: "⚡" },
  { id: "nebula", name: "Cosmic Nebula", color: "#a855f7", icon: "🔮" },
  { id: "titanium", name: "Obsidian Titanium", color: "#eab308", icon: "🪐" },
  { id: "light", name: "Clean Editorial", color: "#2563eb", icon: "☀️" },
];

const PROFILE = {
  name: "RAJATH M",
  role: "Computer Science Engineer • Junior AI Intern",
  email: "rajath9945@gmail.com",
  phone: "+91 8088574482",
  location: "Bangalore, India",
  college: "Bangalore Institute of Technology",
  degree: "B.E. Computer Science & Engineering",
  cgpa: "8.17 / 10",
  batch: "2023–2027",
  github: "https://github.com/Rajath9945",
  linkedin: "https://www.linkedin.com/in/rajath-m-6a2072290",
};

const SKILLS = [
  { name: "Java", group: "Programming", level: 90, desc: "OOP, Collections, Multithreading, Generics" },
  { name: "Data Structures & Algorithms", group: "CS Core & DSA", level: 92, desc: "Trees, Graphs, DP, Heaps, Complexity" },
  { name: "Object Oriented Design (OOP)", group: "CS Core & DSA", level: 90, desc: "SOLID principles, Design Patterns" },
  { name: "Spring Boot", group: "Backend", level: 78, desc: "REST APIs, Spring Data JPA, MVC Architecture" },
  { name: "SQL & DBMS", group: "Backend", level: 85, desc: "MySQL, Relational Schema, Query Optimization" },
  { name: "Python", group: "Programming", level: 86, desc: "Data processing, ML modeling, Scripting" },
  { name: "CNN & Machine Learning", group: "AI / ML", level: 84, desc: "Model fine-tuning, Computer Vision, Evaluation" },
  { name: "Flask", group: "AI / ML", level: 76, desc: "Lightweight ML model serving, Real-time APIs" },
  { name: "Git & GitHub", group: "Tools & DevOps", level: 88, desc: "Branch workflows, PRs, Version Control" },
  { name: "Linux & Shell", group: "Tools & DevOps", level: 75, desc: "Bash scripting, Environment configs, CLI" },
  { name: "Jenkins & CI/CD", group: "Tools & DevOps", level: 68, desc: "Automated pipelines, Build automation" },
  { name: "IoT & Embedded Logic", group: "Tools & DevOps", level: 74, desc: "Sensors, Microcontrollers, Automation" },
];

const PROJECTS = [
  {
    id: "loan",
    title: "Loan Management Backend",
    subtitle: "Java • Spring Boot • MySQL • REST APIs",
    tag: "Backend",
    status: "Active Production",
    summary:
      "A resilient banking backend engine engineered to orchestrate loan applications, customer vetting, amortization calculations, and real-time repayment statuses.",
    details: [
      "Engineered clean RESTful endpoints following strict Controller-Service-Repository multi-tier architecture.",
      "Implemented relational database persistence with MySQL, parameterized queries, and transactional integrity.",
      "Custom business validation logic for eligibility scoring and loan amortization scheduling.",
      "Comprehensive exception handling using global controller advice and standardized API error payloads.",
      "Automated unit and integration testing suite utilizing JUnit & Mockito.",
    ],
    architecture: ["Client / Frontend", "REST Controller", "Service Layer", "JPA Repository", "MySQL DB"],
    metrics: "Sub-50ms API responses • ACID Compliant",
  },
  {
    id: "ai",
    title: "AI Real-Time Monitoring System",
    subtitle: "Flask • CNN • Computer Vision • OpenCV",
    tag: "AI / ML",
    status: "Research Grade",
    summary:
      "Deep learning visual analytics system capable of real-time multi-subject attention detection, facial engagement scoring, and automated session diagnostics.",
    details: [
      "Custom Convolutional Neural Network (CNN) pipeline trained for facial emotion and attention classification.",
      "High-throughput OpenCV video stream processing with frame skipping to maintain 30+ FPS latency.",
      "Flask microservice backend delivering real-time telemetry over WebSockets to analytics dashboards.",
      "Automated aggregation of session metrics into structured reports for student engagement scoring.",
      "Optimized model inference using TensorRT/ONNX runtime for edge devices.",
    ],
    architecture: ["Video Camera", "OpenCV Preprocessing", "CNN Inference", "Flask Telemetry", "Analytics UI"],
    metrics: "94.2% Attention Accuracy • 30 FPS Stream",
  },
  {
    id: "streetlight",
    title: "Smart Autonomous Streetlight Grid",
    subtitle: "IoT • Embedded C • Photocell Sensors • Power Opt.",
    tag: "IoT",
    status: "Prototype Built",
    summary:
      "An intelligent, energy-saving IoT hardware & firmware system that senses ambient lux and dynamic vehicle motion to automate illumination intensity.",
    details: [
      "Embedded microcontroller programming with real-time sensor polling and debouncing algorithms.",
      "Multi-stage illumination: drops to 20% standby power and ramps instantly to 100% upon vehicle proximity.",
      "Reduces grid energy waste by up to 60% compared to traditional timer-based streetlamps.",
      "Hardware fault detection alerting mechanism for malfunctioning LED strips or sensor nodes.",
    ],
    architecture: ["Lux Sensor", "IR Proximity", "Microcontroller Logic", "PWM Dimmer", "High-Power LED"],
    metrics: "60% Energy Savings • Zero Manual Switching",
  },
];

const TIMELINE = [
  {
    year: "2026 — Present",
    title: "Junior AI Intern — ConcierAI",
    company: "ConcierAI",
    role: "AI Engineering",
    text: "Contributing directly to production AI pipelines: model fine-tuning workflows, rigorous evaluation benchmarks, prompt engineering, data curation, and model performance debugging.",
    skills: ["Fine-tuning", "Evaluation", "Data Pipeline", "Python"],
  },
  {
    year: "2026",
    title: "Team Lead — Code Club",
    company: "Bangalore Institute of Technology",
    role: "Technical Leadership",
    text: "Leading student software teams, curating weekly competitive programming contests, mentoring junior engineers in Data Structures, Java, and algorithmic optimization.",
    skills: ["Team Leadership", "DSA Mentorship", "Java", "Contest Design"],
  },
  {
    year: "2023 — 2027",
    title: "B.E. Computer Science & Engineering",
    company: "Bangalore Institute of Technology",
    role: "Academic Milestone",
    text: "Maintaining an 8.17 / 10 CGPA. Core coursework in Operating Systems, Database Management Systems, Computer Networks, Object-Oriented Programming, and Software Engineering.",
    skills: ["CGPA: 8.17", "DBMS", "OS", "System Design"],
  },
  {
    year: "Selected 2026",
    title: "IEEE Conference Paper Presentation",
    company: "IEEE Conference — Mysore",
    role: "Research & Publication",
    text: "Authored and submitted original research selected for presentation at an esteemed IEEE Conference in Mysore, reflecting practical application of machine learning architectures.",
    skills: ["IEEE Peer-Reviewed", "Research Paper", "Mysore Conference"],
  },
];

const TERMINAL_TABS = [
  { id: "java", label: "Developer.java", type: "code" },
  { id: "json", label: "profile.json", type: "code" },
  { id: "shell", label: "terminal.sh", type: "shell" },
];

function useTypewriter(words, speed = 80, delay = 1800) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words, speed, delay]);

  return text;
}

export function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("rajath_portfolio_theme") || "cyber";
  });
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const [activeProjectFilter, setActiveProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTermTab, setActiveTermTab] = useState("java");
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("Opportunity");
  const [contactBody, setContactBody] = useState("");

  const roles = useMemo(
    () => [
      "Backend & Distributed Systems Engineer",
      "Junior AI Intern @ ConcierAI",
      "Java & Algorithms Specialist",
      "IEEE Conference Author",
    ],
    []
  );

  const typewriterText = useTypewriter(roles);

  // Set theme on root element and remember in localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rajath_portfolio_theme", theme);
  }, [theme]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Toast trigger helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`✓ Copied ${label} to clipboard!`);
    } catch {
      showToast(`Failed to copy to clipboard`);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const runCodeSimulation = () => {
    setIsRunningCode(true);
    setConsoleOutput(["[INFO] Compiling source tree...", "[INFO] Resolving dependencies & linking libraries..."]);
    setTimeout(() => {
      setConsoleOutput((prev) => [
        ...prev,
        "[SPRING-BOOT] Initializing Bean Container & JPA Entity Manager...",
        "[DB] MySQL Connection Pool established (10/10 active connections)",
        "[AI-ENGINE] ConcierAI fine-tuned checkpoint loaded successfully.",
        "[TESTS] Running 14/14 automated tests: ALL PASSED (0.43s)",
        "[SUCCESS] Build Complete: Rajath's Portfolio Services are 100% OPERATIONAL.",
      ]);
      setIsRunningCode(false);
      showToast("✓ Execution completed successfully!");
    }, 1200);
  };

  // Skill categories & filtering
  const skillCategories = ["All", ...new Set(SKILLS.map((s) => s.group))];
  const filteredSkills = useMemo(() => {
    return activeSkillCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.group === activeSkillCategory);
  }, [activeSkillCategory]);

  // Project filtering
  const projectFilters = ["All", "Backend", "AI / ML", "IoT"];
  const filteredProjects = useMemo(() => {
    return activeProjectFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tag === activeProjectFilter);
  }, [activeProjectFilter]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `[${contactSubject}] Connecting with Rajath M`
    )}&body=${encodeURIComponent(contactBody || "Hi Rajath,\n\nI came across your portfolio and would love to connect!")}`;
    window.location.href = mailtoUrl;
    setIsContactModalOpen(false);
    showToast("Opening default mail client...");
  };

  return (
    <div className="app">
      {/* Dynamic Backgrounds */}
      <div className="bg-grid" />
      <div className="noise" />

      {/* Toast Notice */}
      {toastMessage && (
        <div className="toast-notice">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")}>
          <span className="brand-mark">R</span>
          <span className="brand-title">
            RAJATH<span className="accent">.</span>M
          </span>
        </button>

        <nav className="nav-links">
          {["about", "experience", "skills", "projects", "research", "contact"].map((sec) => (
            <button key={sec} onClick={() => scrollTo(sec)}>
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          {/* Theme Switcher Dock */}
          <div className="theme-switcher theme-switcher-desktop">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? "active" : ""}`}
                title={`Theme: ${t.name}`}
                onClick={() => setTheme(t.id)}
              >
                <span className="theme-swatch" style={{ backgroundColor: t.color }} />
                <span>{t.icon}</span>
              </button>
            ))}
          </div>

          <button
            className="resume-btn"
            onClick={() => copyToClipboard(PROFILE.email, "Email")}
            title="Copy Rajath's Email"
          >
            <span>✉</span>
            <span>Email Me</span>
          </button>

          <button
            className="menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          {["about", "experience", "skills", "projects", "research", "contact"].map((sec) => (
            <button key={sec} onClick={() => scrollTo(sec)}>
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
          <div className="theme-switcher">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? "active" : ""}`}
                onClick={() => setTheme(t.id)}
              >
                <span className="theme-swatch" style={{ backgroundColor: t.color }} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero section">
          <div className="hero-glow-blob blob-1" />
          <div className="hero-glow-blob blob-2" />

          <div className="hero-copy reveal">
            <div className="hero-badge-wrap">
              <div className="hero-status-pill">
                <span className="pulse" />
                <span>AVAILABLE FOR SOFTWARE & AI ROLES 2026</span>
              </div>
            </div>

            <h1>
              Engineering robust code <br />
              <span className="gradient-text">with intelligence.</span>
            </h1>

            <div className="typewriter-line">
              <span>&gt;</span>
              <span>{typewriterText}</span>
              <span className="typewriter-cursor" />
            </div>

            <p className="hero-text">
              Computer Science student at <strong>Bangalore Institute of Technology</strong> with hands-on
              specialization in <strong>Java backend architecture, scalable REST APIs, algorithmic optimization</strong>,
              and AI model fine-tuning as a <strong>Junior AI Intern at ConcierAI</strong>.
            </p>

            <div className="hero-cta">
              <button className="primary-btn" onClick={() => scrollTo("projects")}>
                <span>Explore Featured Work</span>
                <span>↗</span>
              </button>
              <button
                className="ghost-btn"
                onClick={() => copyToClipboard(PROFILE.email, "Email")}
              >
                <span>Copy Email</span>
              </button>
              <button
                className="ghost-btn"
                onClick={() => setIsContactModalOpen(true)}
              >
                <span>Quick Message ⚡</span>
              </button>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <span>📍</span>
                <span>{PROFILE.location}</span>
              </div>
              <div className="hero-meta-item">
                <span>🎓</span>
                <span>BIT CSE • 2027</span>
              </div>
              <div className="hero-meta-item">
                <span>⚡</span>
                <span>CGPA {PROFILE.cgpa}</span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CODE SANDBOX */}
          <div className="hero-sandbox-wrap reveal">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>

                <div className="terminal-tabs">
                  {TERMINAL_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      className={`term-tab ${activeTermTab === tab.id ? "active" : ""}`}
                      onClick={() => setActiveTermTab(tab.id)}
                    >
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="term-actions">
                  <button
                    className="run-code-btn"
                    onClick={runCodeSimulation}
                    disabled={isRunningCode}
                    title="Execute mock simulation"
                  >
                    <span>{isRunningCode ? "⚙ Compiling..." : "▶ Run"}</span>
                  </button>
                  <button
                    className="copy-code-btn"
                    onClick={() => copyToClipboard(PROFILE.email, "Profile contact")}
                    title="Copy Profile"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="terminal-body">
                {activeTermTab === "java" && (
                  <pre>
                    <code>
                      <span className="code-annotation">@RestController</span>
                      {"\n"}
                      <span className="code-annotation">@RequestMapping</span>(
                      <span className="code-str">"/api/v1/engineer"</span>)
                      {"\n"}
                      <span className="code-keyword">public class</span>{" "}
                      <span className="code-type">RajathPortfolio</span> {"{"}
                      {"\n"}
                      {"  "}<span className="code-annotation">@Autowired</span>
                      {"\n"}
                      {"  "}<span className="code-keyword">private</span>{" "}
                      <span className="code-type">AIService</span> aiEngine;
                      {"\n\n"}
                      {"  "}<span className="code-annotation">@GetMapping</span>(
                      <span className="code-str">"/profile"</span>)
                      {"\n"}
                      {"  "}<span className="code-keyword">public</span>{" "}
                      <span className="code-type">ResponseEntity</span>&lt;
                      <span className="code-type">Developer</span>&gt; getDeveloper() {"{"}
                      {"\n"}
                      {"    "}<span className="code-keyword">return</span>{" "}
                      <span className="code-type">ResponseEntity</span>.ok(
                      {"\n"}
                      {"      "}<span className="code-keyword">new</span>{" "}
                      <span className="code-type">Developer</span>(
                      {"\n"}
                      {"        "}<span className="code-str">"Rajath M"</span>,
                      {"\n"}
                      {"        "}<span className="code-str">"Java, Spring Boot, MySQL"</span>,
                      {"\n"}
                      {"        "}<span className="code-str">"ConcierAI Intern (Model Fine-Tuning)"</span>,
                      {"\n"}
                      {"        "}<span className="code-num">8.17</span>{" "}
                      <span className="code-comment">// CGPA</span>
                      {"\n"}
                      {"      "})
                      {"\n"}
                      {"    "});
                      {"\n"}
                      {"  "}{"}"}
                      {"\n"}
                      {"}"}
                    </code>
                  </pre>
                )}

                {activeTermTab === "json" && (
                  <pre>
                    <code>
                      {"{\n"}
                      {'  "name": '}
                      <span className="code-str">"Rajath M"</span>
                      {",\n"}
                      {'  "status": '}
                      <span className="code-str">"Junior AI Intern @ ConcierAI"</span>
                      {",\n"}
                      {'  "university": '}
                      <span className="code-str">"Bangalore Institute of Technology"</span>
                      {",\n"}
                      {'  "academic_cgpa": '}
                      <span className="code-num">8.17</span>
                      {",\n"}
                      {'  "primary_languages": [\n'}
                      {'    '}<span className="code-str">"Java"</span>{", "}
                      <span className="code-str">"Python"</span>{", "}
                      <span className="code-str">"SQL"</span>{"\n"}
                      {'  ],\n'}
                      {'  "leadership": '}
                      <span className="code-str">"Code Club Team Lead"</span>{",\n"}
                      {'  "conference": '}
                      <span className="code-str">"IEEE Conference Mysore (Selected)"</span>{"\n"}
                      {"}"}
                    </code>
                  </pre>
                )}

                {activeTermTab === "shell" && (
                  <pre>
                    <code>
                      <span className="code-comment"># Check system and environment</span>{"\n"}
                      $ java -version{"\n"}
                      openjdk version <span className="code-str">"21.0.2"</span> LTS{"\n\n"}
                      <span className="code-comment"># Build loan-management-backend</span>{"\n"}
                      $ mvn clean package -DskipTests=false{"\n"}
                      [INFO] Running tests for LoanManagementApplication{"\n"}
                      [INFO] Tests run: 14, Failures: 0, Errors: 0, Skipped: 0{"\n"}
                      [INFO] BUILD SUCCESS [Total time: 2.14 s]{"\n\n"}
                      <span className="code-comment"># Run AI model evaluation</span>{"\n"}
                      $ python eval_pipeline.py --model concier-ai-v2{"\n"}
                      [OK] F1-Score: <span className="code-num">0.942</span> | Latency:{" "}
                      <span className="code-num">18ms</span>
                    </code>
                  </pre>
                )}

                {/* Console Log Output */}
                {consoleOutput && (
                  <div className="term-output-console">
                    <div className="console-title">
                      <span>⚡ Execution Console</span>
                    </div>
                    {consoleOutput.map((line, idx) => (
                      <div key={idx} className="console-log">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stat Chips */}
            <div className="terminal-footer-stats">
              <div className="stat-chip">
                <span className="stat-val">8.17</span>
                <span className="stat-label">BIT CGPA</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">Java</span>
                <span className="stat-label">Core Speciality</span>
              </div>
              <div className="stat-chip">
                <span className="stat-val">IEEE</span>
                <span className="stat-label">Selected Paper</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <div className="section-heading reveal">
            <span className="section-no">01</span>
            <div>
              <p className="eyebrow">ENGINEERING PROFILE</p>
              <h2>
                Driven by curiosity, <br />
                <span>anchored in rigorous foundations.</span>
              </h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                I am a Computer Science Engineering student at <strong>Bangalore Institute of Technology</strong> who
                bridges the gap between deep computer science foundations and cutting-edge practical AI systems.
              </p>
              <p>
                My core strength lies in <strong>Java and Backend Engineering</strong> — designing clean, modular,
                object-oriented architectures with Spring Boot, robust database schemas in MySQL, and high-performance
                data structures and algorithms.
              </p>
              <p>
                At <strong>ConcierAI</strong>, I work as a Junior AI Intern, gaining hands-on production experience in
                fine-tuning language models, architecting evaluation pipelines, optimizing training data, and
                debugging inference workflows.
              </p>
              <p>
                As <strong>Code Club Team Lead</strong>, I coordinate problem-solving bootcamps, mentor peers on Data
                Structures & Algorithms, and cultivate a community of passionate developers.
              </p>
            </div>

            <div className="about-panel reveal">
              <div className="panel-row">
                <span className="panel-label">Degree</span>
                <span className="panel-value">B.E. Computer Science & Engineering</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Institution</span>
                <span className="panel-value">Bangalore Institute of Technology</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Graduation Batch</span>
                <span className="panel-value">2023 – 2027</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Cumulative GPA</span>
                <span className="panel-value highlight-badge">{PROFILE.cgpa}</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Research Honor</span>
                <span className="panel-value">IEEE Conference Selection (Mysore)</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Internship</span>
                <span className="panel-value">Junior AI Intern @ ConcierAI</span>
              </div>
              <div className="panel-row">
                <span className="panel-label">Location</span>
                <span className="panel-value">Bangalore, India 📍</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & TIMELINE */}
        <section id="experience" className="section">
          <div className="section-heading reveal">
            <span className="section-no">02</span>
            <div>
              <p className="eyebrow">CAREER PATH</p>
              <h2>
                Experience & <span>leadership trajectory.</span>
              </h2>
            </div>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, idx) => (
              <div className="timeline-item reveal" key={idx}>
                <div className="timeline-node" />
                <div className="timeline-card">
                  <div className="timeline-header-row">
                    <span className="timeline-year-tag">{item.year}</span>
                    <span className="timeline-pill">{item.company}</span>
                  </div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-text">{item.text}</p>
                  <div className="timeline-tags">
                    {item.skills.map((s) => (
                      <span className="timeline-pill" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section">
          <div className="section-heading reveal">
            <span className="section-no">03</span>
            <div>
              <p className="eyebrow">TECH STACK</p>
              <h2>
                Comprehensive <span>technical arsenal.</span>
              </h2>
            </div>
          </div>

          <div className="skills-tabs-container reveal">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                className={`skill-tab-btn ${activeSkillCategory === cat ? "active" : ""}`}
                onClick={() => setActiveSkillCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div className="skill-item-card reveal" key={skill.name}>
                <div className="skill-item-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-group-badge">{skill.group}</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
                <div className="skill-footer-row">
                  <span className="skill-status-text">{skill.desc}</span>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="section">
          <div className="section-heading reveal">
            <span className="section-no">04</span>
            <div>
              <p className="eyebrow">PORTFOLIO WORK</p>
              <h2>
                Architected to solve <br />
                <span>real-world engineering challenges.</span>
              </h2>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="projects-filters reveal">
            {projectFilters.map((f) => {
              const count =
                f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.tag === f).length;
              return (
                <button
                  key={f}
                  className={`filter-btn ${activeProjectFilter === f ? "active" : ""}`}
                  onClick={() => setActiveProjectFilter(f)}
                >
                  <span>{f}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <div
                className="project-card reveal"
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card-glow" />

                <div>
                  <div className="project-top-bar">
                    <span className="project-badge-tag">{project.tag}</span>
                    <span className="project-status-pill">
                      <span className="pulse" />
                      <span>{project.status}</span>
                    </span>
                  </div>

                  <div className="project-icon-large">
                    {idx === 0 ? "⚡" : idx === 1 ? "🧠" : "💡"}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <div>
                  <div className="project-pipeline">
                    {project.architecture.map((node, j) => (
                      <React.Fragment key={node}>
                        <span className="pipeline-node">{node}</span>
                        {j < project.architecture.length - 1 && (
                          <span className="pipeline-arrow">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="project-action-row">
                    <span>{project.metrics}</span>
                    <span className="inspect-link">
                      <span>Inspect Deep-Dive</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RESEARCH & IEEE BANNER */}
        <section id="research" className="section">
          <div className="research-banner-card reveal">
            <div className="research-content">
              <p className="eyebrow">RESEARCH & PUBLICATIONS</p>
              <h2>
                IEEE Conference Selection <br />
                <span>Mysore, India.</span>
              </h2>
              <p className="research-description">
                Co-authored an original technical research paper selected for formal presentation at an IEEE
                International Conference in Mysore. The research investigates advanced computational models, data
                curation techniques, and applied machine learning architectures.
              </p>
              <div className="research-tags">
                <span className="research-tag">IEEE Peer-Reviewed</span>
                <span className="research-tag">Machine Learning</span>
                <span className="research-tag">Conference Presenter</span>
                <span className="research-tag">Mysore Venue</span>
              </div>
            </div>

            <div className="research-badge-seal">
              <span className="seal-title">IEEE</span>
              <span className="seal-status">SELECTED</span>
              <span className="seal-sub">MYSORE CONF</span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="contact-box reveal">
            <p className="eyebrow">05 / GET IN TOUCH</p>
            <h2>
              Let's build something <br />
              <span className="gradient-text">exceptional together.</span>
            </h2>
            <p className="contact-subtitle">
              Whether you are looking to hire a Software Engineer / AI Intern, collaborate on backend distributed
              systems, or discuss CS fundamentals, my inbox is always open.
            </p>

            <div className="contact-actions-row">
              <button
                className="primary-btn"
                onClick={() => setIsContactModalOpen(true)}
              >
                <span>Send Quick Message</span>
                <span>⚡</span>
              </button>
              <button
                className="ghost-btn"
                onClick={() => copyToClipboard(PROFILE.email, "Email address")}
              >
                <span>Copy {PROFILE.email}</span>
              </button>
              <button
                className="ghost-btn"
                onClick={() => copyToClipboard(PROFILE.phone, "Phone number")}
              >
                <span>Copy {PROFILE.phone}</span>
              </button>
            </div>

            <div className="contact-social-pills">
              <a
                className="social-pill"
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
              >
                <span>🐙</span>
                <span>GitHub</span>
              </a>
              <a
                className="social-pill"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                className="social-pill"
                href={`mailto:${PROFILE.email}`}
              >
                <span>✉</span>
                <span>Direct Mail</span>
              </a>
              <span className="social-pill">
                <span>📍</span>
                <span>Bangalore, Karnataka</span>
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">
          <span>RAJATH M</span>
          <span>•</span>
          <span>Computer Science Engineer</span>
        </div>
        <div>
          <span>Java • Spring Boot • Machine Learning • ConcierAI</span>
        </div>
        <div>
          <span>© 2026 Rajath M. Crafted for excellence.</span>
        </div>
      </footer>

      {/* PROJECT DEEP-DIVE MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <span className="modal-tag">{selectedProject.tag} ARCHITECTURE</span>
            <h2>{selectedProject.title}</h2>
            <p className="modal-subtitle">{selectedProject.subtitle}</p>
            <p className="modal-desc">{selectedProject.summary}</p>

            <div className="modal-section-title">ENGINEERING IMPLEMENTATION HIGHLIGHTS</div>
            <ul className="modal-list">
              {selectedProject.details.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <div className="modal-section-title">SYSTEM DATA FLOW</div>
            <div className="modal-architecture-flow">
              {selectedProject.architecture.map((node, j) => (
                <React.Fragment key={node}>
                  <span className="pipeline-node">{node}</span>
                  {j < selectedProject.architecture.length - 1 && (
                    <span className="pipeline-arrow">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUICK CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsContactModalOpen(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>
            <span className="modal-tag">START A CONVERSATION</span>
            <h2>Get in Touch with Rajath</h2>
            <p className="modal-desc">
              Send a note directly to <strong>{PROFILE.email}</strong> or choose a preset subject:
            </p>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Subject / Purpose</label>
                <select
                  className="form-select"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                >
                  <option value="Full-time SDE / Internship Opportunity">Full-time SDE / Internship Opportunity</option>
                  <option value="AI / Backend Engineering Project">AI / Backend Engineering Project</option>
                  <option value="Technical Collaboration or Mentorship">Technical Collaboration or Mentorship</option>
                  <option value="General Engineering Chat">General Engineering Chat</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Hi Rajath, I reviewed your portfolio and would like to discuss..."
                  value={contactBody}
                  onChange={(e) => setContactBody(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                  <span>Launch Mail Composer ↗</span>
                </button>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => {
                    copyToClipboard(
                      `Subject: [${contactSubject}] Connecting with Rajath M\n\n${contactBody || "Hi Rajath, let's connect!"}`,
                      "Message draft"
                    );
                  }}
                >
                  <span>Copy Draft</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);