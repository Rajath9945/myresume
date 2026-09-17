import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const PROFILE = {
  name: "RAJATH M",
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

const SUN_DEGREE = {
  id: "sun",
  type: "Degree & Core Foundation",
  name: "B.E. Computer Science & Engineering",
  subtitle: "Bangalore Institute of Technology",
  meta: "CGPA 8.17 / 10 • 2023–2027",
  summary:
    "The central foundation powering all engineering skills. Grounded in core computer science theory: Data Structures, Operating Systems, Database Systems, Computer Networks, and Object-Oriented Software Design.",
  bullets: [
    "Bangalore Institute of Technology (BIT), batch of 2023–2027",
    "Strong academic standing with an 8.17 / 10 CGPA",
    "Leading student developer activities as BIT Code Club Team Lead",
    "Paper selected for presentation at an IEEE conference in Mysore",
  ],
  radius: 34,
  color: "#f59e0b",
};

const PLANETS = [
  {
    id: "java",
    type: "Backend Skill",
    name: "Java & Backend",
    meta: "Spring Boot • REST • MySQL",
    orbitRadius: 110,
    speed: 0.00035, // extremely slow
    radius: 14,
    color: "#f97316",
    hasRing: true,
    techs: ["Java", "Spring Boot", "MySQL", "REST APIs", "OOP"],
    summary:
      "Core backend stack for building REST APIs, clean domain models, and relational database persistence with Spring Boot and MySQL.",
    bullets: [
      "Layered MVC design: Controllers, Services, and Repositories",
      "Object-oriented principles, design patterns, and clean code",
      "Relational schema modeling and transaction management",
    ],
  },
  {
    id: "ai",
    type: "AI Skill",
    name: "AI & Machine Learning",
    meta: "ConcierAI Intern • CNN • Python",
    orbitRadius: 165,
    speed: 0.00028,
    radius: 13,
    color: "#a855f7",
    techs: ["Python", "CNN", "Fine-Tuning", "Flask", "OpenCV"],
    summary:
      "Hands-on AI/ML workflows gained through work as a Junior AI Intern at ConcierAI and independent computer vision projects.",
    bullets: [
      "Model fine-tuning pipelines and benchmark evaluation",
      "Convolutional Neural Networks (CNNs) for image & video classification",
      "Data preprocessing, clean test sets, and metric tracking",
    ],
  },
  {
    id: "dsa",
    type: "Core CS Skill",
    name: "Data Structures & DSA",
    meta: "Trees • Graphs • Dynamic Programming",
    orbitRadius: 220,
    speed: 0.00022,
    radius: 12,
    color: "#06b6d4",
    techs: ["Arrays", "Trees", "Graphs", "DP", "Complexity"],
    summary:
      "Algorithmic problem-solving foundation developed through competitive programming and peer mentorship.",
    bullets: [
      "Proficient in Graph algorithms, Trees, and Dynamic Programming",
      "Focus on clean time and space complexity trade-offs",
      "Curate problem sets for university peers in Code Club",
    ],
  },
  {
    id: "sql",
    type: "Database Skill",
    name: "Database Systems & SQL",
    meta: "MySQL • Relational Schema • ACID",
    orbitRadius: 275,
    speed: 0.00018,
    radius: 11,
    color: "#eab308",
    techs: ["MySQL", "Schema Design", "Queries", "Indexing", "Normalization"],
    summary:
      "Relational database design, query optimization, and integration with backend applications.",
    bullets: [
      "Structured normalization up to 3NF/BCNF",
      "Writing performant queries, joins, and indexing strategies",
      "Ensuring ACID compliance in transactional workflows",
    ],
  },
  {
    id: "iot",
    type: "Hardware & Edge",
    name: "IoT & Embedded Logic",
    meta: "Sensors • Embedded C • Automation",
    orbitRadius: 330,
    speed: 0.00014,
    radius: 11,
    color: "#10b981",
    techs: ["Embedded C", "Sensors", "Microcontrollers", "Automation"],
    summary:
      "Bridging software and physical hardware through microcontroller programming and sensor-driven decision systems.",
    bullets: [
      "Sensor polling, debouncing, and threshold automation",
      "Hardware-software integration for real-world IoT use cases",
      "Power consumption optimization in edge devices",
    ],
  },
  {
    id: "tools",
    type: "DevOps & Tools",
    name: "DevOps & Tools",
    meta: "Git • Linux CLI • Jenkins",
    orbitRadius: 385,
    speed: 0.00011,
    radius: 12,
    color: "#94a3b8",
    hasRing: true,
    techs: ["Git", "GitHub", "Linux", "Bash", "Jenkins"],
    summary:
      "Daily tooling for source control, automation pipelines, and comfortable command-line navigation.",
    bullets: [
      "Clean Git branching, PR workflows, and code hygiene",
      "Linux terminal proficiency and shell automation scripts",
      "CI/CD basics with automated build triggers",
    ],
  },
];

const PROJECT_STARS = [
  {
    id: "proj-loan",
    type: "Project Star",
    name: "Loan Management Backend",
    category: "Backend Engine",
    techs: ["Java", "Spring Boot", "MySQL", "REST API"],
    x: -360,
    y: -230,
    color: "#60a5fa",
    summary:
      "A clean REST API backend built to handle customer profiles, loan applications, verification workflows, and repayment schedules.",
    bullets: [
      "Separation of concerns using Controller, Service, and Repository layers",
      "Relational database connectivity with MySQL and parameterized queries",
      "Custom business validation logic for eligibility scoring and loan amortization",
      "Centralized error handling and clean JSON API responses",
    ],
  },
  {
    id: "proj-ai",
    type: "Project Star",
    name: "AI Real-Time Monitoring",
    category: "Computer Vision",
    techs: ["Python", "Flask", "CNN", "OpenCV"],
    x: 360,
    y: -210,
    color: "#f472b6",
    summary:
      "A deep learning monitoring application that analyzes live video feeds to gauge student attention and facial engagement.",
    bullets: [
      "Custom CNN model trained for expression and gaze classification",
      "Frame-efficient OpenCV video processing maintaining 30+ FPS",
      "Flask backend serving real-time analytics to a dashboard",
      "Session summaries to review overall engagement metrics",
    ],
  },
  {
    id: "proj-light",
    type: "Project Star",
    name: "Smart Autonomous Streetlight",
    category: "IoT System",
    techs: ["IoT", "Embedded C", "Sensors", "Hardware"],
    x: 370,
    y: 240,
    color: "#4ade80",
    summary:
      "An automated street lighting prototype that dims during inactivity and brightens when approaching traffic or pedestrians are detected.",
    bullets: [
      "Ambient light sensor and IR proximity sensors integrated with a microcontroller",
      "Standby mode operates at 20% power, instantly ramping to 100% on motion",
      "Demonstrates up to 60% energy savings compared to timer-based lighting",
    ],
  },
  {
    id: "proj-ieee",
    type: "Research Star",
    name: "IEEE Conference Selection",
    category: "Academic Paper",
    techs: ["Machine Learning", "Research Paper", "Mysore Venue"],
    x: -350,
    y: 220,
    color: "#fde047",
    summary:
      "An original research paper on applied machine learning selected for oral presentation at an IEEE international conference in Mysore.",
    bullets: [
      "Peer-reviewed by an IEEE technical program committee",
      "Focuses on practical machine learning models and experimental evaluation",
      "Selected for formal conference presentation",
    ],
  },
  {
    id: "proj-club",
    type: "Leadership Star",
    name: "BIT Code Club Platform",
    category: "Team Leadership",
    techs: ["Java", "DSA Mentorship", "Contest Design"],
    x: 0,
    y: -360,
    color: "#a78bfa",
    summary:
      "Student coding initiative at Bangalore Institute of Technology where Rajath leads technical workshops and problem-solving contests.",
    bullets: [
      "Weekly algorithmic problem discussions on Trees, Graphs, and DP",
      "Mentored junior engineers on coding fundamentals and debugging",
      "Coordinated campus programming contests and peer reviews",
    ],
  },
];

export function App() {
  const [viewMode, setViewMode] = useState("orrery");
  const [isPaused, setIsPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const canvasRef = useRef(null);
  const cameraRef = useRef({
    x: 0,
    y: 0,
    zoom: 1,
    targetX: 0,
    targetY: 0,
    targetZoom: 1,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  const backgroundStarsRef = useRef([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 2400,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }
    backgroundStarsRef.current = stars;
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const copyText = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied ${label} to clipboard`);
    } catch {
      showToast("Unable to copy");
    }
  };

  // Canvas loop
  useEffect(() => {
    if (viewMode !== "orrery") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let angles = {};
    PLANETS.forEach((p) => {
      angles[p.id] = Math.random() * Math.PI * 2;
    });

    let pulseTick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const { width, height } = canvas;
      const cam = cameraRef.current;

      cam.x += (cam.targetX - cam.x) * 0.08;
      cam.y += (cam.targetY - cam.y) * 0.08;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      ctx.translate(width / 2 + cam.x, height / 2 + cam.y);
      ctx.scale(cam.zoom, cam.zoom);

      const tilt = 0.65; // realistic view angle

      // 1. Background stars
      backgroundStarsRef.current.forEach((s) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Orbital rings
      PLANETS.forEach((p) => {
        const isHovered = hoveredItem?.id === p.id;
        const isSelected = selectedItem?.id === p.id;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.orbitRadius, p.orbitRadius * tilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected
          ? "rgba(6, 182, 212, 0.6)"
          : isHovered
          ? "rgba(6, 182, 212, 0.35)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isSelected || isHovered ? 1.5 : 1;
        ctx.stroke();
      });

      // 3. Update slow angles
      if (!isPaused) {
        PLANETS.forEach((p) => {
          angles[p.id] += p.speed; // naturally very slow
        });
      }
      pulseTick += 0.02;

      // 4. Calculate hit targets
      const targets = {};

      targets.sun = { x: 0, y: 0, radius: SUN_DEGREE.radius, data: SUN_DEGREE };

      PLANETS.forEach((p) => {
        const a = angles[p.id];
        const px = Math.cos(a) * p.orbitRadius;
        const py = Math.sin(a) * p.orbitRadius * tilt;
        targets[p.id] = { x: px, y: py, radius: p.radius, data: p };
      });

      PROJECT_STARS.forEach((s) => {
        targets[s.id] = { x: s.x, y: s.y, radius: 14, data: s };
      });

      canvas._targets = targets;

      // 5. Draw Sun (The Degree)
      const sunPulse = 1 + Math.sin(pulseTick) * 0.03;
      const sunRad = SUN_DEGREE.radius * sunPulse;

      const sunGlow = ctx.createRadialGradient(0, 0, sunRad * 0.5, 0, 0, sunRad * 2.2);
      sunGlow.addColorStop(0, "rgba(251, 191, 36, 0.45)");
      sunGlow.addColorStop(0.6, "rgba(245, 158, 11, 0.15)");
      sunGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(0, 0, sunRad * 2.2, 0, Math.PI * 2);
      ctx.fill();

      const sunGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sunRad);
      sunGrad.addColorStop(0, "#fef08a");
      sunGrad.addColorStop(0.7, SUN_DEGREE.color);
      sunGrad.addColorStop(1, "#b45309");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunRad, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.font = "bold 10px Orbitron, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("B.E. DEGREE (BIT)", 0, sunRad + 16);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "9px JetBrains Mono, monospace";
      ctx.fillText("CGPA 8.17", 0, sunRad + 28);

      // 6. Draw Planets (Skills)
      PLANETS.forEach((p) => {
        const pos = targets[p.id];
        const isHovered = hoveredItem?.id === p.id;
        const isSelected = selectedItem?.id === p.id;

        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
          ctx.fill();
        }

        const pGrad = ctx.createRadialGradient(
          pos.x - p.radius * 0.3,
          pos.y - p.radius * 0.3,
          p.radius * 0.1,
          pos.x,
          pos.y,
          p.radius
        );
        pGrad.addColorStop(0, "#ffffff");
        pGrad.addColorStop(0.5, p.color);
        pGrad.addColorStop(1, "#0f172a");

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.hasRing) {
          ctx.beginPath();
          ctx.ellipse(pos.x, pos.y, p.radius * 1.6, p.radius * 0.6, Math.PI / 6, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.fillStyle = isSelected ? "#38bdf8" : "#f1f5f9";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(p.name, pos.x, pos.y + p.radius + 14);
      });

      // 7. Draw Project Stars (Projects indicated as Stars)
      PROJECT_STARS.forEach((s) => {
        const isHovered = hoveredItem?.id === s.id;
        const isSelected = selectedItem?.id === s.id;
        const starPulse = 1 + Math.sin(pulseTick * 1.5 + s.x) * 0.15;
        const starSize = (isHovered || isSelected ? 8 : 6) * starPulse;

        // Glow
        const starGlow = ctx.createRadialGradient(s.x, s.y, 1, s.x, s.y, starSize * 3);
        starGlow.addColorStop(0, s.color);
        starGlow.addColorStop(0.5, s.color + "33");
        starGlow.addColorStop(1, "transparent");
        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, starSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // 4-point star spike
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, starSize * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x - starSize * 1.8, s.y);
        ctx.lineTo(s.x + starSize * 1.8, s.y);
        ctx.moveTo(s.x, s.y - starSize * 1.8);
        ctx.lineTo(s.x, s.y + starSize * 1.8);
        ctx.stroke();

        // Label
        ctx.fillStyle = isSelected ? "#fff" : "#cbd5e1";
        ctx.font = "bold 10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`★ ${s.name}`, s.x, s.y + starSize + 14);
      });

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [viewMode, isPaused, hoveredItem, selectedItem]);

  // Drag & zoom
  const onMouseDown = (e) => {
    cameraRef.current.isDragging = true;
    cameraRef.current.lastX = e.clientX;
    cameraRef.current.lastY = e.clientY;
  };

  const onMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (cameraRef.current.isDragging) {
      const dx = e.clientX - cameraRef.current.lastX;
      const dy = e.clientY - cameraRef.current.lastY;
      cameraRef.current.targetX += dx;
      cameraRef.current.targetY += dy;
      cameraRef.current.lastX = e.clientX;
      cameraRef.current.lastY = e.clientY;
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cam = cameraRef.current;

    const wx = (mx - canvas.width / 2 - cam.x) / cam.zoom;
    const wy = (my - canvas.height / 2 - cam.y) / cam.zoom;

    const targets = canvas._targets;
    if (!targets) return;

    let found = null;
    for (const key of Object.keys(targets)) {
      const item = targets[key];
      const d = Math.hypot(wx - item.x, wy - item.y);
      if (d <= item.radius + 12) {
        found = item.data;
        break;
      }
    }
    setHoveredItem(found);
  };

  const onMouseUp = () => {
    cameraRef.current.isDragging = false;
  };

  const onWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    cameraRef.current.targetZoom = Math.max(0.4, Math.min(2.5, cameraRef.current.targetZoom * factor));
  };

  const onClick = () => {
    if (hoveredItem) {
      setSelectedItem(hoveredItem);
      focusOn(hoveredItem.id);
    }
  };

  const focusOn = (id) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas._targets) return;
    const pos = canvas._targets[id];
    if (pos) {
      cameraRef.current.targetX = -pos.x * cameraRef.current.zoom;
      cameraRef.current.targetY = -pos.y * cameraRef.current.zoom;
      cameraRef.current.targetZoom = id === "sun" ? 1.2 : 1.4;
    }
  };

  const resetView = () => {
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
    setSelectedItem(null);
  };

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      {/* Header */}
      <header className="nav">
        <div className="brand">
          <div className="brand-sun-icon" />
          <div>
            <div className="brand-name">RAJATH M</div>
            <div className="brand-role">PORTFOLIO ORRERY</div>
          </div>
        </div>

        <div className="nav-right">
          <span className="nav-tag">BIT CSE • CGPA 8.17</span>
          <button
            className="btn btn-primary"
            onClick={() => setViewMode(viewMode === "orrery" ? "dossier" : "orrery")}
          >
            {viewMode === "orrery" ? "View Summary Dossier" : "Explore Orrery"}
          </button>
          <button className="btn btn-ghost" onClick={() => setIsContactOpen(true)}>
            Contact
          </button>
        </div>
      </header>

      {/* Mode 1: Orrery Canvas */}
      {viewMode === "orrery" && (
        <div className="canvas-wrap">
          <canvas
            ref={canvasRef}
            className="space-canvas"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onWheel={onWheel}
            onClick={onClick}
          />

          {/* Simple clean legend */}
          <div className="legend-box">
            <div className="legend-row">
              <span className="legend-pip sun" />
              <span><strong>The Sun</strong>: B.E. Degree (BIT)</span>
            </div>
            <div className="legend-row">
              <span className="legend-pip planet" />
              <span><strong>Planets</strong>: Engineering Skills</span>
            </div>
            <div className="legend-row">
              <span className="legend-pip star" />
              <span><strong>Stars (★)</strong>: Featured Projects</span>
            </div>
            <div className="legend-tip">
              Drag to pan • Scroll to zoom • Click any object for details
            </div>
          </div>

          {/* Target Quick Jump list */}
          <div className="quick-select">
            <button
              className={`jump-chip ${selectedItem?.id === "sun" ? "active" : ""}`}
              onClick={() => {
                setSelectedItem(SUN_DEGREE);
                focusOn("sun");
              }}
            >
              <span>☀️</span>
              <span>Degree (Sun)</span>
            </button>
            {PLANETS.slice(0, 4).map((p) => (
              <button
                key={p.id}
                className={`jump-chip ${selectedItem?.id === p.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedItem(p);
                  focusOn(p.id);
                }}
              >
                <span>🪐</span>
                <span>{p.name.split(" ")[0]}</span>
              </button>
            ))}
            {PROJECT_STARS.slice(0, 3).map((s) => (
              <button
                key={s.id}
                className={`jump-chip ${selectedItem?.id === s.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedItem(s);
                  focusOn(s.id);
                }}
              >
                <span>★</span>
                <span>{s.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Minimal Controls dock (no speeds, simple and clean) */}
          <div className="controls-dock">
            <button
              className={`dock-btn ${isPaused ? "active" : ""}`}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button
              className="dock-btn"
              onClick={() => {
                cameraRef.current.targetZoom = Math.min(2.5, cameraRef.current.zoom * 1.25);
              }}
            >
              + Zoom
            </button>
            <button
              className="dock-btn"
              onClick={() => {
                cameraRef.current.targetZoom = Math.max(0.4, cameraRef.current.zoom * 0.8);
              }}
            >
              - Zoom
            </button>
            <button className="dock-btn" onClick={resetView}>
              Center
            </button>
          </div>

          {/* Detail card when clicked */}
          {selectedItem && (
            <aside className="detail-card">
              <div className="detail-top">
                <div>
                  <div className="detail-kind">{selectedItem.type}</div>
                  <h2 className="detail-title">{selectedItem.name}</h2>
                </div>
                <button
                  className="detail-close"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {selectedItem.meta && (
                <div className="detail-meta-row">
                  <span className="detail-meta-pill">{selectedItem.meta}</span>
                </div>
              )}

              <p className="detail-desc">{selectedItem.summary}</p>

              {selectedItem.techs && (
                <div className="tags-row">
                  {selectedItem.techs.map((t) => (
                    <span className="tag-item" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {selectedItem.bullets && (
                <ul className="detail-bullets">
                  {selectedItem.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setIsContactOpen(true)}
                >
                  Connect
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => copyText(PROFILE.email, "Email")}
                >
                  Copy Email
                </button>
              </div>
            </aside>
          )}
        </div>
      )}

      {/* Mode 2: Summary Dossier View */}
      {viewMode === "dossier" && (
        <div className="dossier-wrap">
          <div className="dossier-intro">
            <h1>Rajath M — Software & AI Engineer</h1>
            <p>
              Computer Science student at <strong>Bangalore Institute of Technology (BIT)</strong> with
              focus on <strong>Java backend development, Data Structures & Algorithms</strong>, and hands-on
              AI model fine-tuning as a <strong>Junior AI Intern at ConcierAI</strong>.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button className="btn btn-primary" onClick={() => setViewMode("orrery")}>
                Open Orrery View
              </button>
              <button className="btn btn-ghost" onClick={() => copyText(PROFILE.email, "Email")}>
                Copy {PROFILE.email}
              </button>
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "16px" }}>
            The Sun: Academic Degree
          </h2>
          <div className="card" style={{ marginBottom: "30px" }}>
            <h3>{SUN_DEGREE.name}</h3>
            <div className="card-sub">{SUN_DEGREE.subtitle} • {SUN_DEGREE.meta}</div>
            <p>{SUN_DEGREE.summary}</p>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "16px" }}>
            Planets: Technical Skills
          </h2>
          <div className="dossier-grid">
            {PLANETS.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedItem(p);
                  setViewMode("orrery");
                  setTimeout(() => focusOn(p.id), 150);
                }}
              >
                <h3>{p.name}</h3>
                <div className="card-sub">{p.meta}</div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "16px" }}>
            Project Stars: Work & Research
          </h2>
          <div className="dossier-grid">
            {PROJECT_STARS.map((s) => (
              <div
                key={s.id}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedItem(s);
                  setViewMode("orrery");
                  setTimeout(() => focusOn(s.id), 150);
                }}
              >
                <h3>★ {s.name}</h3>
                <div className="card-sub">{s.category} • {s.techs.join(", ")}</div>
                <p>{s.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact modal */}
      {isContactOpen && (
        <div className="modal-bg" onClick={() => setIsContactOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              style={{ position: "absolute", top: "14px", right: "14px", fontSize: "16px" }}
              onClick={() => setIsContactOpen(false)}
            >
              ✕
            </button>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "12px" }}>
              Get in Touch
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "20px" }}>
              Feel free to reach out for software engineering opportunities, backend development, or collaboration.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                className="btn btn-primary"
                style={{ justifyContent: "center" }}
                href={`mailto:${PROFILE.email}`}
              >
                Send Email to {PROFILE.email}
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => copyText(PROFILE.phone, "Phone number")}
              >
                Copy Phone: {PROFILE.phone}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);