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
  type: "Academic Foundation",
  name: "B.E. Computer Science & Engineering",
  subtitle: "Bangalore Institute of Technology (BIT)",
  meta: "CGPA 8.17 / 10 • Batch 2023–2027",
  summary:
    "The central foundation powering all engineering skills. Grounded in core computer science theory: Data Structures, Operating Systems, Database Systems, Computer Networks, and Object-Oriented Software Design.",
  bullets: [
    "Bangalore Institute of Technology (BIT), batch of 2023–2027",
    "Strong academic performance with an 8.17 / 10 CGPA",
    "Core coursework in Algorithms, OS, DBMS, Networks, and OOP",
    "Student leader coordinating problem-solving activities as Code Club Team Lead",
  ],
  radius: 34,
  color: "#f59e0b",
};

const BLACK_HOLE_INTERNSHIP = {
  id: "blackhole",
  type: "AI Internship",
  name: "Junior AI Intern — ConcierAI",
  subtitle: "ConcierAI • Model Fine-Tuning & Evaluation",
  meta: "2026 – Present • AI Engineering",
  x: -360,
  y: -220,
  radius: 24,
  summary:
    "Active internship at ConcierAI working directly on applied AI systems: fine-tuning models, building benchmark evaluation pipelines, and curating dataset workflows.",
  bullets: [
    "Model fine-tuning workflows and metric evaluation benchmarks",
    "Dataset curation, data cleaning, and validation pipelines",
    "Prompt engineering and model performance optimization",
    "Hands-on debugging of latency and inference behavior",
  ],
};

const PLANETS = [
  {
    id: "java",
    type: "Backend Skill",
    name: "Java & Backend",
    meta: "Spring Boot • REST • MySQL",
    orbitRadius: 105,
    speed: 0.0003, // slow, peaceful orbit
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
    meta: "Deep Learning • CNN • Python",
    orbitRadius: 155,
    speed: 0.00024,
    radius: 13,
    color: "#a855f7",
    techs: ["Python", "CNN", "Fine-Tuning", "Flask", "OpenCV"],
    summary:
      "Practical AI and deep learning workflows including computer vision, CNN architectures, and inference microservices.",
    bullets: [
      "Convolutional Neural Networks (CNNs) for image & video classification",
      "Model fine-tuning pipelines and benchmark evaluation",
      "Data preprocessing, clean test sets, and metric tracking",
    ],
  },
  {
    id: "dsa",
    type: "Core CS Skill",
    name: "Data Structures & DSA",
    meta: "Trees • Graphs • Dynamic Programming",
    orbitRadius: 205,
    speed: 0.00019,
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
    orbitRadius: 255,
    speed: 0.00015,
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
    orbitRadius: 305,
    speed: 0.00012,
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
    orbitRadius: 355,
    speed: 0.00009,
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

const PROJECT_GALAXIES = [
  {
    id: "proj-loan",
    type: "Working Project",
    name: "Loan Management Backend",
    category: "Active Backend Service",
    techs: ["Java", "Spring Boot", "MySQL", "REST API"],
    x: 370,
    y: -210,
    color: "#60a5fa",
    summary:
      "A complete REST backend orchestrating loan applications, customer profiles, validation logic, and repayment schedules.",
    bullets: [
      "Clean multi-tier architecture: Controller, Service, and Repository",
      "MySQL database connectivity with parameterized queries & transactional logic",
      "Custom business validation logic for eligibility scoring and amortization",
      "Centralized error handling with standardized JSON response payloads",
    ],
  },
  {
    id: "proj-ai",
    type: "Working Project",
    name: "AI Real-Time Monitoring",
    category: "Live Computer Vision",
    techs: ["Python", "Flask", "CNN", "OpenCV"],
    x: 380,
    y: 220,
    color: "#f472b6",
    summary:
      "Deep learning monitoring tool processing live video streams to measure student attention and engagement levels in real time.",
    bullets: [
      "Custom CNN model trained for expression and gaze classification",
      "High-throughput OpenCV video processing maintaining 30+ FPS",
      "Flask microservice backend delivering real-time telemetry",
      "Structured summary reports generated at session end",
    ],
  },
  {
    id: "proj-light",
    type: "Working Project",
    name: "Smart Autonomous Streetlight",
    category: "IoT Hardware Prototype",
    techs: ["IoT", "Embedded C", "Sensors", "Hardware"],
    x: -370,
    y: 220,
    color: "#4ade80",
    summary:
      "An automated street lighting prototype that dims during inactivity and brightens when approaching traffic or pedestrians are detected.",
    bullets: [
      "Ambient light sensor and IR proximity sensors integrated with a microcontroller",
      "Standby mode operates at 20% power, instantly ramping to 100% on motion",
      "Demonstrates up to 60% energy savings compared to static streetlamps",
    ],
  },
  {
    id: "proj-club",
    type: "Working Project",
    name: "BIT Code Club Platform",
    category: "Developer Community",
    techs: ["Java", "DSA Mentorship", "Contest Design"],
    x: 0,
    y: -360,
    color: "#c084fc",
    summary:
      "Student coding platform and mentorship program at Bangalore Institute of Technology where Rajath coordinates technical problem-solving.",
    bullets: [
      "Weekly algorithmic problem discussions on Trees, Graphs, and DP",
      "Mentoring junior students on programming fundamentals and debugging",
      "Coordinating campus programming contests and peer reviews",
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
  const hoveredIdRef = useRef(null);

  // Persistent orbital angles — NEVER reset on hover or re-render
  const anglesRef = useRef({
    java: 0.5,
    ai: 1.8,
    dsa: 3.2,
    sql: 4.5,
    iot: 5.6,
    tools: 0.9,
    blackholeRotation: 0,
    galaxyRotation: 0,
  });

  const backgroundStarsRef = useRef([]);

  // Generate realistic space background once on mount
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2600,
        y: (Math.random() - 0.5) * 2600,
        size: Math.random() * 1.6 + 0.3,
        alpha: Math.random() * 0.7 + 0.15,
        color: Math.random() > 0.8 ? "#93c5fd" : Math.random() > 0.6 ? "#fde68a" : "#ffffff",
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

  // Main canvas rendering loop
  useEffect(() => {
    if (viewMode !== "orrery") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let pulseTick = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const { width, height } = canvas;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Permanently centered, fixed scale (no moving or zooming)
      ctx.translate(width / 2, height / 2);

      const tilt = 0.65; // gentle 3D isometric inclination

      // 1. Deep space background stars
      backgroundStarsRef.current.forEach((s) => {
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Orbital rings for planets
      PLANETS.forEach((p) => {
        const isHovered = hoveredItem?.id === p.id;
        const isSelected = selectedItem?.id === p.id;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.orbitRadius, p.orbitRadius * tilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected
          ? "rgba(6, 182, 212, 0.6)"
          : isHovered
          ? "rgba(6, 182, 212, 0.35)"
          : "rgba(255, 255, 255, 0.07)";
        ctx.lineWidth = isSelected || isHovered ? 1.5 : 1;
        ctx.stroke();
      });

      // 3. Increment orbital angles steadily (never reset on hover)
      if (!isPaused) {
        PLANETS.forEach((p) => {
          anglesRef.current[p.id] += p.speed;
        });
        anglesRef.current.blackholeRotation += 0.008;
        anglesRef.current.galaxyRotation += 0.006;
      }
      pulseTick += 0.02;

      // 4. Calculate hit targets
      const targets = {};
      targets.sun = { x: 0, y: 0, radius: SUN_DEGREE.radius, data: SUN_DEGREE };

      // Planet coordinates
      PLANETS.forEach((p) => {
        const a = anglesRef.current[p.id];
        const px = Math.cos(a) * p.orbitRadius;
        const py = Math.sin(a) * p.orbitRadius * tilt;
        targets[p.id] = { x: px, y: py, radius: p.radius, data: p };
      });

      // Black hole coordinates
      targets.blackhole = {
        x: BLACK_HOLE_INTERNSHIP.x,
        y: BLACK_HOLE_INTERNSHIP.y,
        radius: BLACK_HOLE_INTERNSHIP.radius,
        data: BLACK_HOLE_INTERNSHIP,
      };

      // Project Galaxies coordinates
      PROJECT_GALAXIES.forEach((g) => {
        targets[g.id] = { x: g.x, y: g.y, radius: 24, data: g };
      });

      canvas._targets = targets;

      // 5. Draw THE SUN (Academic Degree Core)
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

      // 6. Draw THE BLACK HOLE (ConcierAI Internship)
      const bh = targets.blackhole;
      const bhIsHovered = hoveredItem?.id === "blackhole";
      const bhIsSelected = selectedItem?.id === "blackhole";

      ctx.save();
      ctx.translate(bh.x, bh.y);

      // Swirling accretion disk
      const bhRot = anglesRef.current.blackholeRotation;
      ctx.rotate(bhRot);

      const diskGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 48);
      diskGrad.addColorStop(0, "rgba(56, 189, 248, 0.8)");
      diskGrad.addColorStop(0.4, "rgba(168, 85, 247, 0.5)");
      diskGrad.addColorStop(0.8, "rgba(6, 182, 212, 0.15)");
      diskGrad.addColorStop(1, "transparent");

      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 50, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Swirling particles around black hole
      for (let i = 0; i < 8; i++) {
        const pAng = (i * Math.PI) / 4 + bhRot * 2;
        const pDist = 24 + (i % 3) * 8;
        ctx.fillStyle = i % 2 === 0 ? "#38bdf8" : "#f472b6";
        ctx.beginPath();
        ctx.arc(Math.cos(pAng) * pDist, Math.sin(pAng) * (pDist * 0.45), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Photon ring
      ctx.beginPath();
      ctx.arc(bh.x, bh.y, bh.radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(224, 242, 254, 0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pitch black event horizon
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2);
      ctx.fill();

      // Black hole label
      ctx.fillStyle = bhIsSelected || bhIsHovered ? "#38bdf8" : "#e2e8f0";
      ctx.font = "bold 10px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillText("🕳️ ConcierAI (AI Intern)", bh.x, bh.y + bh.radius + 26);

      // 7. Draw PLANETS (Core Skills)
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

      // 8. Draw PROJECT GALAXIES (Swirling active mini-galaxies)
      const galRot = anglesRef.current.galaxyRotation;

      PROJECT_GALAXIES.forEach((g) => {
        const isHovered = hoveredItem?.id === g.id;
        const isSelected = selectedItem?.id === g.id;

        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(galRot);

        // Swirling galaxy arms
        for (let arm = 0; arm < 2; arm++) {
          const armOffset = arm * Math.PI;
          ctx.strokeStyle = g.color + "99";
          ctx.lineWidth = 1.8;
          ctx.beginPath();

          for (let step = 0; step < 25; step++) {
            const theta = (step / 25) * Math.PI * 1.6 + armOffset;
            const dist = 5 + step * 1.1;
            const gx = Math.cos(theta) * dist;
            const gy = Math.sin(theta) * (dist * 0.65);

            if (step === 0) ctx.moveTo(gx, gy);
            else ctx.lineTo(gx, gy);

            // Particle nodes along arms
            if (step % 5 === 0) {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(gx - 1, gy - 1, 2, 2);
            }
          }
          ctx.stroke();
        }

        // Luminous galaxy core
        const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 12);
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.5, g.color);
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Galaxy label
        ctx.fillStyle = isSelected || isHovered ? "#fff" : "#cbd5e1";
        ctx.font = "bold 10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`🌌 ${g.name}`, g.x, g.y + 24);
      });

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [viewMode, isPaused]); // Clean dependency: NEVER reset on hover!

  // Mouse move hover detection on static centered canvas
  const onMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    // Centered coordinates relative to canvas center
    const wx = mx - canvas.width / 2;
    const wy = my - canvas.height / 2;

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

    canvas.style.cursor = found ? "pointer" : "default";

    if (found?.id !== hoveredIdRef.current) {
      hoveredIdRef.current = found?.id || null;
      setHoveredItem(found);
    }
  };

  const onClick = () => {
    if (hoveredItem) {
      setSelectedItem(hoveredItem);
    }
  };

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      {/* Header Navigation */}
      <header className="nav">
        <div className="brand">
          <div className="brand-sun-icon" />
          <div>
            <div className="brand-name">RAJATH M</div>
            <div className="brand-role">INTERPLANETARY PORTFOLIO</div>
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

      {/* Mode 1: Interactive Orrery Canvas */}
      {viewMode === "orrery" && (
        <div className="canvas-wrap">
          <canvas
            ref={canvasRef}
            className="space-canvas"
            onMouseMove={onMouseMove}
            onClick={onClick}
          />

          {/* System Index Panel (Direct Guide Showing What Everything Represents) */}
          <aside className="system-index">
            <div className="index-header">
              <span className="index-title">SYSTEM DIRECTORY</span>
              <span className="index-sub">CLICK TO SELECT</span>
            </div>

            <div className="index-group-label">Stellar Core (Degree)</div>
            <div
              className={`index-item ${selectedItem?.id === "sun" ? "active" : ""}`}
              onClick={() => setSelectedItem(SUN_DEGREE)}
            >
              <div className="index-item-left">
                <span className="index-dot sun" />
                <span>The Sun</span>
              </div>
              <span className="index-item-role">B.E. Degree (BIT)</span>
            </div>

            <div className="index-group-label">Gravitational Core (Internship)</div>
            <div
              className={`index-item ${selectedItem?.id === "blackhole" ? "active" : ""}`}
              onClick={() => setSelectedItem(BLACK_HOLE_INTERNSHIP)}
            >
              <div className="index-item-left">
                <span className="index-dot blackhole" />
                <span>The Black Hole</span>
              </div>
              <span className="index-item-role">ConcierAI (AI Intern)</span>
            </div>

            <div className="index-group-label">Planets (Technical Skills)</div>
            {PLANETS.map((p) => (
              <div
                key={p.id}
                className={`index-item ${selectedItem?.id === p.id ? "active" : ""}`}
                onClick={() => setSelectedItem(p)}
              >
                <div className="index-item-left">
                  <span className="index-dot planet" />
                  <span>{p.name}</span>
                </div>
                <span className="index-item-role">Skill</span>
              </div>
            ))}

            <div className="index-group-label">Galaxies (Working Projects)</div>
            {PROJECT_GALAXIES.map((g) => (
              <div
                key={g.id}
                className={`index-item ${selectedItem?.id === g.id ? "active" : ""}`}
                onClick={() => setSelectedItem(g)}
              >
                <div className="index-item-left">
                  <span className="index-dot galaxy" />
                  <span>{g.name}</span>
                </div>
                <span className="index-item-role">Project</span>
              </div>
            ))}
          </aside>

          {/* Minimal Controls Dock (No Zooming or Moving) */}
          <div className="controls-dock">
            <button
              className={`dock-btn ${isPaused ? "active" : ""}`}
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? "▶ Resume Orbit" : "⏸ Pause Orbit"}
            </button>
          </div>

          {/* Holographic Detail Card */}
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
              hands-on focus on <strong>Java backend development, Data Structures & Algorithms</strong>, and active
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
          <div className="card" style={{ marginBottom: "26px" }}>
            <h3>{SUN_DEGREE.name}</h3>
            <div className="card-sub">{SUN_DEGREE.subtitle} • {SUN_DEGREE.meta}</div>
            <p>{SUN_DEGREE.summary}</p>
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "16px" }}>
            The Black Hole: AI Internship
          </h2>
          <div className="card" style={{ marginBottom: "26px" }}>
            <h3>🕳️ {BLACK_HOLE_INTERNSHIP.name}</h3>
            <div className="card-sub">{BLACK_HOLE_INTERNSHIP.subtitle} • {BLACK_HOLE_INTERNSHIP.meta}</div>
            <p>{BLACK_HOLE_INTERNSHIP.summary}</p>
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
                }}
              >
                <h3>{p.name}</h3>
                <div className="card-sub">{p.meta}</div>
                <p>{p.summary}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", marginBottom: "16px" }}>
            Working Project Galaxies
          </h2>
          <div className="dossier-grid">
            {PROJECT_GALAXIES.map((g) => (
              <div
                key={g.id}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedItem(g);
                  setViewMode("orrery");
                }}
              >
                <h3>🌌 {g.name}</h3>
                <div className="card-sub">{g.category} • {g.techs.join(", ")}</div>
                <p>{g.summary}</p>
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