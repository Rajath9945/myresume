import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const profile = {
  name: "RAJATH M",
  role: "Computer Science Engineer • Junior AI Intern",
  email: "rajath9945@gmail.com",
  phone: "+91 8088574482",
  location: "Bangalore, India",
  cgpa: "8.17",
  batch: "2023–2027",
};

const skills = [
  { name: "Java", group: "Programming", level: 88 },
  { name: "Data Structures", group: "CS Core", level: 90 },
  { name: "Algorithms", group: "CS Core", level: 86 },
  { name: "OOP", group: "CS Core", level: 90 },
  { name: "SQL / DBMS", group: "Backend", level: 82 },
  { name: "Spring Boot", group: "Backend", level: 70 },
  { name: "REST APIs", group: "Backend", level: 72 },
  { name: "Python", group: "Programming", level: 86 },
  { name: "Git / GitHub", group: "Tools", level: 84 },
  { name: "Linux", group: "Tools", level: 70 },
  { name: "Jenkins", group: "Tools", level: 64 },
  { name: "CNN / ML", group: "AI", level: 84 },
];

const projects = [
  {
    id: "loan",
    title: "Loan Management Backend",
    subtitle: "Java • Spring Boot • MySQL",
    tag: "Backend",
    status: "Building",
    summary:
      "A focused REST backend for customers, loan applications, loan records and repayment status.",
    details: [
      "Java and Spring Boot REST endpoints",
      "Object-oriented domain models and basic CRUD workflows",
      "Relational database connectivity with MySQL",
      "Request validation and exception handling",
      "Maven and Git with clean, maintainable business logic",
    ],
    architecture: ["Controller", "Service", "Repository", "MySQL"],
  },
  {
    id: "ai",
    title: "AI-Based Real-Time Monitoring",
    subtitle: "Flask • CNN • Real-time Analytics",
    tag: "AI / ML",
    status: "Project",
    summary:
      "Real-time student monitoring and behaviour analysis with session-level analytics.",
    details: [
      "Flask-based application for real-time monitoring",
      "CNN models for behaviour and emotion analysis",
      "Real-time video processing and analysis",
      "Session summaries and engagement insights",
      "Interactive dashboard visualization",
    ],
    architecture: ["Video Input", "CNN", "Flask", "Analytics Dashboard"],
  },
  {
    id: "streetlight",
    title: "Automatic Streetlight",
    subtitle: "IoT • Sensors • Embedded Control",
    tag: "IoT",
    status: "Project",
    summary:
      "An IoT prototype that automatically controls lighting based on surrounding conditions.",
    details: [
      "Sensor-driven control logic",
      "Basic electronics and embedded programming",
      "Automatic switching based on environmental conditions",
      "Hardware-software integration",
    ],
    architecture: ["Sensor", "Controller", "Decision Logic", "Light"],
  },
];

const timeline = [
  {
    year: "2026",
    title: "Junior AI Intern — ConcierAI",
    text: "Hands-on work with model fine-tuning workflows, experimentation, evaluation, data preparation and debugging.",
  },
  {
    year: "2026",
    title: "Code Club — Team Lead",
    text: "Leading a student coding team, coordinating problem-solving activities and supporting peers with programming and DSA.",
  },
  {
    year: "2023–2027",
    title: "B.E. Computer Science & Engineering",
    text: "Bangalore Institute of Technology • Current CGPA 8.17",
  },
  {
    year: "Research",
    title: "IEEE Conference Selection",
    text: "Research paper selected for presentation at an IEEE Conference in Mysore.",
  },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [activeSkill, setActiveSkill] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const heroRef = useRef(null);

  useReveal();

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const groups = ["All", ...new Set(skills.map((s) => s.group))];
  const filteredSkills = useMemo(
    () => activeSkill === "All" ? skills : skills.filter((s) => s.group === activeSkill),
    [activeSkill]
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const tilt = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 7;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -7;
    el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const resetTilt = () => {
    if (heroRef.current) heroRef.current.style.transform = "";
  };

  return (
    <div className="app">
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />
      <div className="noise" />

      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")}>
          <span className="brand-mark">R</span>
          <span>RAJATH<span className="accent">.</span></span>
        </button>

        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["about", "experience", "skills", "projects", "contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {id}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☼" : "☾"}
          </button>
          <button className="menu-btn" onClick={() => setMenu(!menu)}>☰</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <div className="orb orb-a" />
          <div className="orb orb-b" />

          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="pulse" /> AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES</div>
            <h1>Building software<br /><span>that thinks.</span></h1>
            <p className="hero-text">
              Computer Science Engineering student focused on <strong>Java, DSA, backend engineering</strong> and
              practical AI systems. Currently working as a <strong>Junior AI Intern at ConcierAI</strong>.
            </p>
            <div className="hero-cta">
              <button className="primary-btn" onClick={() => scrollTo("projects")}>Explore work <span>↗</span></button>
              <button className="ghost-btn" onClick={copyEmail}>{copied ? "Email copied ✓" : "Copy email"}</button>
            </div>
            <div className="hero-meta">
              <span>📍 Bangalore</span><span>🎓 BIT • 2027</span><span>⚡ CGPA {profile.cgpa}</span>
            </div>
          </div>

          <div
            className="hero-card-wrap reveal"
            onMouseMove={tilt}
            onMouseLeave={resetTilt}
          >
            <div className="hero-card" ref={heroRef}>
              <div className="card-top">
                <span className="status-dot" /> SOFTWARE ENGINEERING PROFILE
                <span className="card-id">RM / 2026</span>
              </div>
              <div className="terminal">
                <div className="terminal-bar"><i /><i /><i /><span>rajath@dev:~</span></div>
                <div className="terminal-body">
                  <p><em>const</em> developer = {'{'}</p>
                  <p className="indent"><span>focus:</span> <b>"Java + Backend"</b>,</p>
                  <p className="indent"><span>core:</span> <b>"DSA + CS Fundamentals"</b>,</p>
                  <p className="indent"><span>currently:</span> <b>"AI Fine-Tuning"</b>,</p>
                  <p className="indent"><span>leadership:</span> <b>"Code Club"</b></p>
                  <p>{'}'}</p>
                  <p className="comment">// turning problems into systems_</p>
                </div>
              </div>
              <div className="mini-stats">
                <div><strong>8.17</strong><span>CGPA</span></div>
                <div><strong>Java</strong><span>PRIMARY</span></div>
                <div><strong>AI</strong><span>INTERN</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-heading reveal">
            <span className="section-no">01</span>
            <div><p className="eyebrow">PROFILE</p><h2>Engineering mindset,<br /><span>hands-on execution.</span></h2></div>
          </div>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                I am a Computer Science Engineering student at Bangalore Institute of Technology with a strong
                foundation in <strong>Java, Data Structures & Algorithms, OOP, DBMS and debugging</strong>.
              </p>
              <p>
                My current internship at ConcierAI gives me practical exposure to AI/ML workflows, including model
                fine-tuning, experimentation, evaluation, data preparation and debugging.
              </p>
              <p>
                Alongside engineering, I lead a student coding team through Code Club, coordinating problem-solving
                activities and helping peers with programming and DSA.
              </p>
            </div>
            <div className="about-panel reveal">
              <div className="panel-line"><span>Degree</span><b>B.E. CSE</b></div>
              <div className="panel-line"><span>Institute</span><b>Bangalore Institute of Technology</b></div>
              <div className="panel-line"><span>Batch</span><b>2023–2027</b></div>
              <div className="panel-line"><span>CGPA</span><b>8.17 / 10</b></div>
              <div className="panel-line"><span>Research</span><b>IEEE Conference — Mysore</b></div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-heading reveal">
            <span className="section-no">02</span>
            <div><p className="eyebrow">JOURNEY</p><h2>Experience & <span>leadership.</span></h2></div>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <article className="timeline-item reveal" key={i}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-node" />
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading reveal">
            <span className="section-no">03</span>
            <div><p className="eyebrow">STACK</p><h2>Technical <span>arsenal.</span></h2></div>
          </div>

          <div className="skill-tabs reveal">
            {groups.map((group) => (
              <button className={activeSkill === group ? "active" : ""} key={group} onClick={() => setActiveSkill(group)}>
                {group}
              </button>
            ))}
          </div>

          <div className="skill-grid">
            {filteredSkills.map((skill) => (
              <div className="skill-card reveal" key={skill.name}>
                <div className="skill-card-top"><span>{skill.name}</span><small>{skill.group}</small></div>
                <div className="skill-track"><span style={{ width: `${skill.level}%` }} /></div>
                <div className="skill-foot"><span>PROFICIENCY</span><b>{skill.level}%</b></div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects">
          <div className="section-heading reveal">
            <span className="section-no">04</span>
            <div><p className="eyebrow">SELECTED WORK</p><h2>Projects built to<br /><span>solve problems.</span></h2></div>
          </div>

          <div className="project-grid">
            {projects.map((project, i) => (
              <article
                className={`project-card reveal project-${i}`}
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-glow" />
                <div className="project-head">
                  <span className="project-tag">{project.tag}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <div className="project-icon">{i === 0 ? "⌘" : i === 1 ? "◉" : "⌁"}</div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p>{project.summary}</p>
                <div className="architecture">
                  {project.architecture.map((a, j) => <React.Fragment key={a}><span>{a}</span>{j < project.architecture.length - 1 && <b>→</b>}</React.Fragment>)}
                </div>
                <button className="project-open">Inspect project ↗</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section research">
          <div className="research-card reveal">
            <div>
              <p className="eyebrow">RESEARCH</p>
              <h2>IEEE Conference<br /><span>Selection.</span></h2>
              <p>A research paper has been selected for presentation at an IEEE Conference in Mysore.</p>
            </div>
            <div className="research-badge">
              <span>IEEE</span>
              <b>SELECTED</b>
              <small>MYSORE</small>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="contact-inner reveal">
            <p className="eyebrow">05 / LET'S CONNECT</p>
            <h2>Have a problem<br /><span>worth solving?</span></h2>
            <p className="contact-copy">Open to software engineering opportunities, backend development and meaningful technical collaborations.</p>
            <div className="contact-actions">
              <a className="primary-btn" href={`mailto:${profile.email}`}>Start a conversation ↗</a>
              <button className="ghost-btn" onClick={copyEmail}>{copied ? "Copied ✓" : profile.email}</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>RAJATH M</span>
        <span>JAVA • BACKEND • AI • DSA</span>
        <span>© 2026</span>
      </footer>

      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <span className="project-tag">{selectedProject.tag}</span>
            <h2>{selectedProject.title}</h2>
            <p className="modal-subtitle">{selectedProject.subtitle}</p>
            <p>{selectedProject.summary}</p>
            <div className="modal-section">
              <small>IMPLEMENTATION FOCUS</small>
              <ul>{selectedProject.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
            <div className="architecture large">
              {selectedProject.architecture.map((a, j) => <React.Fragment key={a}><span>{a}</span>{j < selectedProject.architecture.length - 1 && <b>→</b>}</React.Fragment>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);