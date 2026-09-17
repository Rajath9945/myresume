import React, { useEffect, useRef, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// ============================================================================
// CELESTIAL METADATA ARCHITECTURE
// ============================================================================

const SUN_DEGREE = {
  id: "sun",
  name: "B.E. Computer Science & Engineering",
  subtitle: "Bangalore Institute of Technology (BIT)",
  classification: "Academic Core • Gravitational Anchor",
  cgpa: "8.17 / 10",
  batch: "2023–2027",
  location: "Bangalore, India",
  summary:
    "The central radiant stellar core fueling Rajath's entire engineering universe. Powers all orbiting skills with foundational computer science theory: Data Structures, Operating Systems, Database Systems, Computer Networks, and Object-Oriented Software Design.",
  highlights: [
    "Current Cumulative GPA: 8.17 / 10",
    "Core CS Curriculum: Algorithms, OS, DBMS, Computer Networks, Discrete Math",
    "Active student leader as Code Club Team Lead",
    "Selected for IEEE International Conference Presentation (Mysore)",
  ],
  radius: 36,
  color: "#f59e0b",
  coreColor: "#fef08a",
};

const PLANETS = [
  {
    id: "java",
    name: "Planet Java & Backend",
    category: "Backend Engineering",
    classification: "Class-J Gas Giant • Ringed",
    skillLevel: 90,
    orbitRadius: 130,
    orbitSpeed: 0.009,
    size: 19,
    color: "#f97316",
    ringColor: "rgba(249, 115, 22, 0.4)",
    hasRing: true,
    techs: ["Java", "Spring Boot", "MySQL", "REST APIs", "OOP", "Maven"],
    summary:
      "A massive high-gravity gas giant representing enterprise backend architecture. Engineered for high-throughput REST APIs, clean modular MVC structure, and reliable transactional persistence.",
    moons: [
      {
        id: "proj-loan",
        name: "Moon: Loan Management Backend",
        projectTitle: "Loan Management Backend Engine",
        techStack: "Java • Spring Boot • MySQL • REST",
        status: "Production Architecture",
        summary:
          "A resilient banking backend engine orchestrating loan applications, customer vetting, amortization calculations, and real-time repayment tracking.",
        highlights: [
          "Controller-Service-Repository multi-tier architectural separation",
          "Relational database persistence with MySQL & ACID compliance",
          "Automated financial validation algorithms for eligibility assessment",
          "Global exception handling with standardized JSON error payloads",
        ],
        orbitRadius: 28,
        orbitSpeed: 0.05,
        size: 5,
        color: "#fdba74",
      },
    ],
  },
  {
    id: "ai",
    name: "Planet AI & Deep Learning",
    category: "Artificial Intelligence",
    classification: "Class-A Super-Earth • Aurora Glow",
    skillLevel: 86,
    orbitRadius: 185,
    orbitSpeed: 0.0068,
    size: 17,
    color: "#a855f7",
    hasRing: false,
    techs: ["Python", "CNN", "Model Fine-Tuning", "Flask", "OpenCV", "Evaluation"],
    summary:
      "An electrified super-earth with vibrant neural auroras. Primary operations hub for Rajath's Junior AI Internship at ConcierAI: fine-tuning models, building benchmark evaluation pipelines, and deploying computer vision models.",
    moons: [
      {
        id: "proj-ai",
        name: "Moon: Real-Time AI Monitor",
        projectTitle: "AI-Based Real-Time Monitoring System",
        techStack: "Flask • CNN • OpenCV • Telemetry",
        status: "Research Grade Prototype",
        summary:
          "Deep learning visual analytics system capable of real-time student engagement scoring, attention detection, and automated session diagnostics.",
        highlights: [
          "Custom Convolutional Neural Network (CNN) for facial emotion & gaze classification",
          "High-throughput OpenCV video stream processing at 30+ FPS",
          "Flask microservice backend delivering real-time telemetry over WebSockets",
          "Automated aggregation of session metrics into structured reports",
        ],
        orbitRadius: 26,
        orbitSpeed: 0.045,
        size: 5,
        color: "#f472b6",
      },
      {
        id: "proj-ieee",
        name: "Probe: IEEE Mysore Research",
        projectTitle: "IEEE Conference Selection (Mysore)",
        techStack: "Research Paper • Machine Learning",
        status: "Formally Accepted",
        summary:
          "Original peer-reviewed machine learning research selected for oral presentation at an IEEE International Conference in Mysore, India.",
        highlights: [
          "Peer-reviewed by international IEEE conference review committee",
          "Investigates cutting-edge computational architectures & neural evaluation",
          "Formal oral presentation scheduled in Mysore, Karnataka",
        ],
        orbitRadius: 36,
        orbitSpeed: 0.03,
        size: 4,
        color: "#38bdf8",
      },
    ],
  },
  {
    id: "dsa",
    name: "Planet Algorithms & DSA",
    category: "Core Computer Science",
    classification: "Class-D Crystalline Ice Giant",
    skillLevel: 92,
    orbitRadius: 240,
    orbitSpeed: 0.0052,
    size: 16,
    color: "#06b6d4",
    hasRing: false,
    techs: ["Data Structures", "Algorithms", "Dynamic Programming", "Graphs", "Trees"],
    summary:
      "A crystalline azure world with supersonic algorithmic winds. Represents mastery of fundamental problem-solving, asymptotic complexity analysis, and competitive programming.",
    moons: [
      {
        id: "proj-codeclub",
        name: "Moon: Code Club Leadership",
        projectTitle: "BIT Code Club — Team Lead",
        techStack: "DSA Mentorship • Competitive Programming",
        status: "Active Leadership Role",
        summary:
          "Leading student software engineering teams, designing weekly algorithmic coding contests, and mentoring junior engineers in Java and advanced data structures.",
        highlights: [
          "Curating algorithmic problem sets on Trees, Graphs, and Dynamic Programming",
          "Mentoring 50+ junior CS students on coding interview fundamentals",
          "Organizing peer hackathons and competitive programming bootcamps",
        ],
        orbitRadius: 25,
        orbitSpeed: 0.04,
        size: 4,
        color: "#67e8f9",
      },
    ],
  },
  {
    id: "sql",
    name: "Planet Database & SQL",
    category: "Data Systems",
    classification: "Class-S Molten Mineral World",
    skillLevel: 85,
    orbitRadius: 295,
    orbitSpeed: 0.0041,
    size: 14,
    color: "#eab308",
    hasRing: false,
    techs: ["SQL", "MySQL", "Relational Schema", "Indexing", "ACID", "Normalization"],
    summary:
      "A dense, molten planet with crystalline relational strata. Specializes in structured database schemas, SQL query tuning, transactional consistency, and storage optimization.",
    moons: [],
  },
  {
    id: "iot",
    name: "Planet IoT & Embedded Systems",
    category: "Hardware & Edge Automation",
    classification: "Class-E Technosphere World",
    skillLevel: 75,
    orbitRadius: 350,
    orbitSpeed: 0.0033,
    size: 15,
    color: "#10b981",
    hasRing: false,
    techs: ["Embedded C", "Sensors", "Microcontrollers", "Automation", "IoT"],
    summary:
      "A technosphere world wrapped in luminous green circuit conduits. Blends hardware microcontrollers, ambient environmental sensors, and autonomous edge decision logic.",
    moons: [
      {
        id: "proj-light",
        name: "Moon: Autonomous Streetlight",
        projectTitle: "Smart Autonomous Streetlight Grid",
        techStack: "IoT • Embedded C • Photocell • Sensors",
        status: "Built Working Prototype",
        summary:
          "An intelligent IoT hardware & firmware system sensing ambient lux and vehicle proximity to automate illumination intensity and eliminate manual operation.",
        highlights: [
          "Embedded microcontroller firmware with debounced sensor polling",
          "Multi-stage illumination: 20% standby power ramps to 100% on motion detection",
          "Reduces grid energy waste by up to 60% compared to static streetlamps",
        ],
        orbitRadius: 24,
        orbitSpeed: 0.038,
        size: 4,
        color: "#a7f3d0",
      },
    ],
  },
  {
    id: "devops",
    name: "Planet DevOps & Tooling",
    category: "Infrastructure & Systems",
    classification: "Class-T Titanium Habitable World",
    skillLevel: 82,
    orbitRadius: 405,
    orbitSpeed: 0.0026,
    size: 15,
    color: "#94a3b8",
    ringColor: "rgba(148, 163, 184, 0.35)",
    hasRing: true,
    techs: ["Git / GitHub", "Linux CLI", "Bash Scripting", "Jenkins", "CI/CD"],
    summary:
      "An industrial titanium-ringed world coordinating automated build pipelines, version control workflows, and Linux environment configurations.",
    moons: [],
  },
];

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

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export function App() {
  const [viewMode, setViewMode] = useState("orrery"); // "orrery" or "dossier"
  const [timeScale, setTimeScale] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(null); // Sun, Planet, or Moon
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const [toast, setToast] = useState(null);
  const [isTransmissionOpen, setIsTransmissionOpen] = useState(false);

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

  const starsRef = useRef([]);

  // Generate background starfield once
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 240; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2600,
        y: (Math.random() - 0.5) * 2600,
        size: Math.random() * 2.2 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color:
          Math.random() > 0.8
            ? "#67e8f9"
            : Math.random() > 0.6
            ? "#fef08a"
            : Math.random() > 0.4
            ? "#f472b6"
            : "#ffffff",
      });
    }
    starsRef.current = stars;
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`✓ Copied ${label} to clipboard!`);
    } catch {
      showToast(`Failed to copy to clipboard`);
    }
  };

  // ============================================================================
  // HIGH-PERFORMANCE 2.5D SOLAR SYSTEM CANVAS ENGINE
  // ============================================================================

  useEffect(() => {
    if (viewMode !== "orrery") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let angleTracker = {};
    PLANETS.forEach((p) => {
      angleTracker[p.id] = Math.random() * Math.PI * 2;
      p.moons?.forEach((m) => {
        angleTracker[m.id] = Math.random() * Math.PI * 2;
      });
    });

    let sunPulseAngle = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const { width, height } = canvas;
      const cam = cameraRef.current;

      // Smooth camera interpolation towards target
      cam.x += (cam.targetX - cam.x) * 0.08;
      cam.y += (cam.targetY - cam.y) * 0.08;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.08;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Translate context to center + camera offset
      ctx.translate(width / 2 + cam.x, height / 2 + cam.y);
      ctx.scale(cam.zoom, cam.zoom);

      const tiltY = 0.58; // 3D Isometric inclination perspective

      // 1. Draw Starfield
      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha =
          star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Draw Orbit Ellipses for Planets
      PLANETS.forEach((planet) => {
        const isHovered = hoveredEntity?.id === planet.id;
        const isSelected = selectedEntity?.id === planet.id;

        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          planet.orbitRadius,
          planet.orbitRadius * tiltY,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = isSelected
          ? "rgba(6, 182, 212, 0.7)"
          : isHovered
          ? "rgba(6, 182, 212, 0.45)"
          : "rgba(56, 189, 248, 0.12)";
        ctx.lineWidth = isSelected || isHovered ? 2 : 1;
        if (isSelected) {
          ctx.setLineDash([6, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Update Orbital Angles
      PLANETS.forEach((planet) => {
        angleTracker[planet.id] += planet.orbitSpeed * timeScale;
        planet.moons?.forEach((moon) => {
          angleTracker[moon.id] += moon.orbitSpeed * timeScale;
        });
      });
      sunPulseAngle += 0.03;

      // 4. Calculate Celestial Positions
      const positions = {};

      // Sun position
      positions.sun = { x: 0, y: 0, radius: SUN_DEGREE.radius, raw: SUN_DEGREE };

      // Planet & Moon positions
      PLANETS.forEach((planet) => {
        const pAngle = angleTracker[planet.id];
        const px = Math.cos(pAngle) * planet.orbitRadius;
        const py = Math.sin(pAngle) * planet.orbitRadius * tiltY;
        positions[planet.id] = {
          x: px,
          y: py,
          radius: planet.size,
          raw: planet,
        };

        // Moons
        planet.moons?.forEach((moon) => {
          const mAngle = angleTracker[moon.id];
          const mx = px + Math.cos(mAngle) * moon.orbitRadius;
          const my = py + Math.sin(mAngle) * moon.orbitRadius * tiltY;
          positions[moon.id] = {
            x: mx,
            y: my,
            radius: moon.size,
            parent: planet,
            raw: moon,
          };
        });
      });

      // Store on canvas for click/hover hit-testing
      canvas._celestialPositions = positions;

      // 5. Draw THE SUN (Academic Core / Degree)
      const sunPulse = 1 + Math.sin(sunPulseAngle) * 0.05;
      const sunRadius = SUN_DEGREE.radius * sunPulse;

      // Outer Corona Radiation
      const coronaGrad = ctx.createRadialGradient(0, 0, sunRadius * 0.6, 0, 0, sunRadius * 2.8);
      coronaGrad.addColorStop(0, "rgba(251, 191, 36, 0.5)");
      coronaGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.2)");
      coronaGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Sun Body
      const sunBodyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sunRadius);
      sunBodyGrad.addColorStop(0, SUN_DEGREE.coreColor);
      sunBodyGrad.addColorStop(0.7, SUN_DEGREE.color);
      sunBodyGrad.addColorStop(1, "#b45309");
      ctx.fillStyle = sunBodyGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sun Label
      ctx.fillStyle = "#fef3c7";
      ctx.font = "bold 11px Orbitron, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("B.E. DEGREE (BIT)", 0, sunRadius + 18);
      ctx.fillStyle = "rgba(254, 243, 199, 0.7)";
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillText("CGPA 8.17", 0, sunRadius + 30);

      // 6. Draw Planets & Moons
      PLANETS.forEach((planet) => {
        const pPos = positions[planet.id];

        // Draw Moon Orbits around Planet
        planet.moons?.forEach((moon) => {
          ctx.beginPath();
          ctx.ellipse(
            pPos.x,
            pPos.y,
            moon.orbitRadius,
            moon.orbitRadius * tiltY,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Planetary Atmosphere Aura
        const isHovered = hoveredEntity?.id === planet.id;
        const isSelected = selectedEntity?.id === planet.id;

        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(pPos.x, pPos.y, planet.size + 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
          ctx.fill();
        }

        // Planetary Body
        const pGrad = ctx.createRadialGradient(
          pPos.x - planet.size * 0.3,
          pPos.y - planet.size * 0.3,
          planet.size * 0.1,
          pPos.x,
          pPos.y,
          planet.size
        );
        pGrad.addColorStop(0, "#ffffff");
        pGrad.addColorStop(0.4, planet.color);
        pGrad.addColorStop(1, "#030712");

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(pPos.x, pPos.y, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Planetary Rings (if present)
        if (planet.hasRing) {
          ctx.beginPath();
          ctx.ellipse(
            pPos.x,
            pPos.y,
            planet.size * 1.8,
            planet.size * 0.65,
            Math.PI / 6,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = planet.ringColor || "rgba(255, 255, 255, 0.3)";
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        // Planet Text Label
        ctx.fillStyle = isSelected ? "#38bdf8" : "#f1f5f9";
        ctx.font = "bold 11px Orbitron, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(planet.name.split(" ")[1] || planet.name, pPos.x, pPos.y + planet.size + 15);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillText(`${planet.skillLevel}%`, pPos.x, pPos.y + planet.size + 26);

        // Render Moons (Projects)
        planet.moons?.forEach((moon) => {
          const mPos = positions[moon.id];
          const isMoonHovered = hoveredEntity?.id === moon.id;
          const isMoonSelected = selectedEntity?.id === moon.id;

          if (isMoonHovered || isMoonSelected) {
            ctx.beginPath();
            ctx.arc(mPos.x, mPos.y, moon.size + 6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fill();
          }

          // Moon body
          ctx.fillStyle = moon.color || "#e2e8f0";
          ctx.beginPath();
          ctx.arc(mPos.x, mPos.y, moon.size, 0, Math.PI * 2);
          ctx.fill();

          // Moon indicator dot
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.font = "9px JetBrains Mono, monospace";
          ctx.textAlign = "center";
          ctx.fillText("🌑 " + moon.name.split(":")[1]?.trim(), mPos.x, mPos.y - moon.size - 4);
        });
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode, timeScale, hoveredEntity, selectedEntity]);

  // ============================================================================
  // MOUSE DRAG, ZOOM & HIT-TESTING
  // ============================================================================

  const handleMouseDown = (e) => {
    cameraRef.current.isDragging = true;
    cameraRef.current.lastX = e.clientX;
    cameraRef.current.lastY = e.clientY;
  };

  const handleMouseMove = (e) => {
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

    // Hover hit test
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cam = cameraRef.current;

    // Convert mouse to world coordinates
    const worldX = (mouseX - canvas.width / 2 - cam.x) / cam.zoom;
    const worldY = (mouseY - canvas.height / 2 - cam.y) / cam.zoom;

    const positions = canvas._celestialPositions;
    if (!positions) return;

    let found = null;
    for (const key of Object.keys(positions)) {
      const body = positions[key];
      const dist = Math.hypot(worldX - body.x, worldY - body.y);
      if (dist <= body.radius + 10) {
        found = { id: key, ...body.raw, parent: body.parent };
        break;
      }
    }
    setHoveredEntity(found);
  };

  const handleMouseUp = () => {
    cameraRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.4, Math.min(2.5, cameraRef.current.targetZoom * zoomFactor));
    cameraRef.current.targetZoom = newZoom;
  };

  const handleClick = (e) => {
    if (hoveredEntity) {
      setSelectedEntity(hoveredEntity);
      focusOnTarget(hoveredEntity.id);
    }
  };

  const focusOnTarget = (id) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas._celestialPositions) return;

    const pos = canvas._celestialPositions[id];
    if (pos) {
      cameraRef.current.targetX = -pos.x * cameraRef.current.zoom;
      cameraRef.current.targetY = -pos.y * cameraRef.current.zoom;
      cameraRef.current.targetZoom = id === "sun" ? 1.2 : 1.5;
    }
  };

  const resetCamera = () => {
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
    setSelectedEntity(null);
  };

  return (
    <div className="app">
      {/* Toast */}
      {toast && <div className="space-toast">{toast}</div>}

      {/* TOP NAVIGATION / COCKPIT HUD */}
      <header className="nav">
        <div className="brand">
          <div className="brand-icon">☀️</div>
          <div className="brand-info">
            <div className="brand-name">RAJATH M</div>
            <div className="brand-sub">INTERPLANETARY CS EXPLORER</div>
          </div>
        </div>

        <div className="nav-center-status">
          <span className="live-beacon" />
          <span>ORRERY ONLINE • BIT CSE 2027 • CGPA 8.17</span>
        </div>

        <div className="nav-actions">
          <button
            className="mode-toggle-btn"
            onClick={() => setViewMode(viewMode === "orrery" ? "dossier" : "orrery")}
          >
            <span>{viewMode === "orrery" ? "📋 Mission Dossier" : "🪐 Solar Orrery"}</span>
          </button>

          <button className="comms-btn" onClick={() => setIsTransmissionOpen(true)}>
            <span>📡 Comms</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          MODE 1: INTERPLANETARY ORRERY VIEWPORT (Full Interactive Solar System)
          ==================================================================== */}
      {viewMode === "orrery" && (
        <div className="space-viewport-container">
          <canvas
            ref={canvasRef}
            className="orrery-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onClick={handleClick}
          />

          {/* HUD Legend */}
          <div className="hud-legend">
            <div className="hud-legend-title">
              <span>SYSTEM ARCHITECTURE</span>
              <span>ORRERY v2.6</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot sun" />
              <span>
                <strong>The Sun</strong>: B.E. Computer Science Degree (BIT)
              </span>
            </div>
            <div className="legend-item">
              <span className="legend-dot planet" />
              <span>
                <strong>Planets</strong>: Core Engineering Skills (Java, AI, DSA)
              </span>
            </div>
            <div className="legend-item">
              <span className="legend-dot moon" />
              <span>
                <strong>Moons</strong>: Real-world Projects & IEEE Paper
              </span>
            </div>
            <div className="legend-hint">
              Drag to pan • Scroll to zoom • Click any celestial body to inspect
            </div>
          </div>

          {/* Target Quick Select Panel */}
          <div className="target-quick-select">
            <button
              className={`target-chip target-chip-sun ${
                selectedEntity?.id === "sun" ? "active" : ""
              }`}
              onClick={() => {
                setSelectedEntity(SUN_DEGREE);
                focusOnTarget("sun");
              }}
            >
              <span>☀️</span>
              <span>Sun (B.E. Degree)</span>
            </button>
            {PLANETS.map((p) => (
              <button
                key={p.id}
                className={`target-chip ${selectedEntity?.id === p.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedEntity(p);
                  focusOnTarget(p.id);
                }}
              >
                <span>🪐</span>
                <span>{p.name.replace("Planet ", "")}</span>
              </button>
            ))}
          </div>

          {/* Flight Controls Dock */}
          <div className="flight-deck">
            <button
              className={`flight-btn ${timeScale === 0 ? "active" : ""}`}
              onClick={() => setTimeScale(timeScale === 0 ? 1 : 0)}
              title="Pause or Resume Orbits"
            >
              <span>{timeScale === 0 ? "▶ Resume" : "⏸ Pause"}</span>
            </button>

            <button
              className={`flight-btn ${timeScale === 0.5 ? "active" : ""}`}
              onClick={() => setTimeScale(0.5)}
            >
              <span>0.5x</span>
            </button>
            <button
              className={`flight-btn ${timeScale === 1 ? "active" : ""}`}
              onClick={() => setTimeScale(1)}
            >
              <span>1x Warp</span>
            </button>
            <button
              className={`flight-btn ${timeScale === 2 ? "active" : ""}`}
              onClick={() => setTimeScale(2)}
            >
              <span>2x Warp</span>
            </button>
            <button
              className={`flight-btn ${timeScale === 4 ? "active" : ""}`}
              onClick={() => setTimeScale(4)}
            >
              <span>4x Warp</span>
            </button>

            <div className="flight-deck-divider" />

            <button
              className="flight-btn"
              onClick={() => {
                cameraRef.current.targetZoom = Math.min(2.5, cameraRef.current.zoom * 1.25);
              }}
              title="Zoom In"
            >
              <span>+ Zoom</span>
            </button>
            <button
              className="flight-btn"
              onClick={() => {
                cameraRef.current.targetZoom = Math.max(0.4, cameraRef.current.zoom * 0.8);
              }}
              title="Zoom Out"
            >
              <span>- Zoom</span>
            </button>
            <button className="flight-btn" onClick={resetCamera} title="Reset to Center">
              <span>🎯 Center View</span>
            </button>
          </div>

          {/* HOLOGRAPHIC TELEMETRY DRAWER (When Sun/Planet/Moon is clicked) */}
          {selectedEntity && (
            <aside className="telemetry-drawer">
              <div className="telemetry-header">
                <div>
                  <div className="telemetry-class">
                    {selectedEntity.classification || "Celestial Body Telemetry"}
                  </div>
                  <h2 className="telemetry-title">
                    {selectedEntity.projectTitle || selectedEntity.name}
                  </h2>
                </div>
                <button
                  className="telemetry-close"
                  onClick={() => setSelectedEntity(null)}
                  aria-label="Close telemetry"
                >
                  ✕
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="telemetry-metrics-grid">
                {selectedEntity.id === "sun" ? (
                  <>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Academic CGPA</div>
                      <div className="telemetry-metric-val">{selectedEntity.cgpa}</div>
                    </div>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Batch</div>
                      <div className="telemetry-metric-val">{selectedEntity.batch}</div>
                    </div>
                  </>
                ) : selectedEntity.skillLevel ? (
                  <>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Mastery Level</div>
                      <div className="telemetry-metric-val">{selectedEntity.skillLevel}%</div>
                    </div>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Orbit Distance</div>
                      <div className="telemetry-metric-val">{selectedEntity.orbitRadius} AU</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Project Status</div>
                      <div className="telemetry-metric-val">{selectedEntity.status}</div>
                    </div>
                    <div className="telemetry-metric-card">
                      <div className="telemetry-metric-label">Orbit Parent</div>
                      <div className="telemetry-metric-val">
                        {selectedEntity.parent?.name || "Solar System"}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="telemetry-desc">{selectedEntity.summary}</p>

              {/* Tech Stack */}
              {selectedEntity.techs && (
                <>
                  <div className="telemetry-section-title">CORE TECHNOLOGIES</div>
                  <div className="telemetry-tags">
                    {selectedEntity.techs.map((t) => (
                      <span className="telemetry-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Key Highlights */}
              {selectedEntity.highlights && (
                <>
                  <div className="telemetry-section-title">KEY ENGINEERING ACHIEVEMENTS</div>
                  <ul style={{ paddingLeft: "18px", marginBottom: "20px", fontSize: "13px", color: "#cbd5e1" }}>
                    {selectedEntity.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: "6px" }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Moons list (if inspecting a planet that has moons) */}
              {selectedEntity.moons && selectedEntity.moons.length > 0 && (
                <>
                  <div className="telemetry-section-title">ORBITING MOONS (PROJECTS)</div>
                  <div className="moons-container">
                    {selectedEntity.moons.map((moon) => (
                      <div
                        key={moon.id}
                        className="moon-inspect-card"
                        onClick={() => {
                          setSelectedEntity({ ...moon, parent: selectedEntity });
                          focusOnTarget(moon.id);
                        }}
                      >
                        <div className="moon-card-left">
                          <span className="moon-symbol">🌑</span>
                          <div>
                            <div className="moon-card-title">{moon.projectTitle}</div>
                            <div className="moon-card-sub">{moon.techStack}</div>
                          </div>
                        </div>
                        <span style={{ color: "#06b6d4" }}>➔</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Quick Actions */}
              <div style={{ display: "flex", gap: "8px", marginTop: "15px" }}>
                <button
                  className="mode-toggle-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => setIsTransmissionOpen(true)}
                >
                  <span>Connect with Rajath</span>
                </button>
                <button
                  className="comms-btn"
                  onClick={() => copyToClipboard(PROFILE.email, "Email")}
                >
                  <span>Copy Email</span>
                </button>
              </div>
            </aside>
          )}
        </div>
      )}

      {/* ====================================================================
          MODE 2: MISSION CONTROL DOSSIER VIEW (Structured High-Density Resume)
          ==================================================================== */}
      {viewMode === "dossier" && (
        <div className="dossier-view-container">
          {/* Hero Bio */}
          <section className="dossier-hero">
            <div>
              <div className="section-tag">MISSION CONTROL DOSSIER</div>
              <h1 className="dossier-title">
                Engineering software <br />
                <span>at interplanetary scale.</span>
              </h1>
              <p className="dossier-bio">
                Computer Science student at <strong>Bangalore Institute of Technology</strong> with a strong
                foundation in <strong>Java backend development, scalable distributed architectures, Data Structures & Algorithms</strong>,
                and active AI model fine-tuning as a <strong>Junior AI Intern at ConcierAI</strong>.
              </p>
              <div className="dossier-cta-row">
                <button
                  className="mode-toggle-btn"
                  onClick={() => setViewMode("orrery")}
                >
                  <span>Launch 3D Orrery Simulator 🪐</span>
                </button>
                <button
                  className="comms-btn"
                  onClick={() => setIsTransmissionOpen(true)}
                >
                  <span>Transmit Message 📡</span>
                </button>
                <button
                  className="comms-btn"
                  onClick={() => copyToClipboard(PROFILE.email, "Email address")}
                >
                  <span>Copy {PROFILE.email}</span>
                </button>
              </div>
            </div>

            {/* Academic Sun Dossier Card */}
            <div className="dossier-card">
              <div className="dossier-card-title">
                <span>☀️</span>
                <span>STELLAR CORE: ACADEMIC CREDENTIALS</span>
              </div>
              <div className="dossier-meta-list">
                <div className="dossier-meta-item">
                  <span>Degree Program</span>
                  <b>B.E. Computer Science & Engineering</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Institution</span>
                  <b>Bangalore Institute of Technology</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Academic Standing</span>
                  <b style={{ color: "#fbbf24" }}>CGPA 8.17 / 10.0</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Batch Horizon</span>
                  <b>2023 – 2027</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Current Internship</span>
                  <b style={{ color: "#38bdf8" }}>Junior AI Intern @ ConcierAI</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Research Venue</span>
                  <b>IEEE Conference — Mysore</b>
                </div>
                <div className="dossier-meta-item">
                  <span>Base Location</span>
                  <b>Bangalore, Karnataka, India 📍</b>
                </div>
              </div>
            </div>
          </section>

          {/* Orbiting Planetary Skills Section */}
          <section className="dossier-section">
            <div className="section-tag">ORBITAL SKILLS & DOMAINS</div>
            <h2 className="section-h2">The Planetary Arsenal</h2>
            <div className="planetary-skills-grid">
              {PLANETS.map((p) => (
                <div
                  key={p.id}
                  className="planetary-skill-card"
                  onClick={() => {
                    setSelectedEntity(p);
                    setViewMode("orrery");
                    setTimeout(() => focusOnTarget(p.id), 200);
                  }}
                >
                  <div className="skill-card-top">
                    <span className="skill-planet-name">
                      {p.id === "java" ? "🪐" : p.id === "ai" ? "🧠" : p.id === "dsa" ? "🌐" : "⚡"}{" "}
                      {p.name}
                    </span>
                    <span className="skill-orbit-badge">{p.orbitRadius} AU</span>
                  </div>
                  <div className="skill-power-bar">
                    <div
                      className="skill-power-fill"
                      style={{
                        width: `${p.skillLevel}%`,
                        background: `linear-gradient(90deg, ${p.color}, #06b6d4)`,
                      }}
                    />
                  </div>
                  <div className="skill-card-bottom">
                    <span className="skill-techs-sub">{p.techs.slice(0, 4).join(" • ")}</span>
                    <span className="skill-pct-num">{p.skillLevel}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lunar Projects Section */}
          <section className="dossier-section">
            <div className="section-tag">ORBITING MOONS & SATELLITES</div>
            <h2 className="section-h2">Real-World Projects & Research</h2>
            <div className="lunar-projects-grid">
              {PLANETS.flatMap((p) => p.moons || []).map((m) => (
                <div
                  key={m.id}
                  className="lunar-project-card"
                  onClick={() => {
                    setSelectedEntity(m);
                    setViewMode("orrery");
                    setTimeout(() => focusOnTarget(m.id), 200);
                  }}
                >
                  <div>
                    <div className="lunar-card-header">
                      <span className="lunar-parent-tag">🌑 MOON PROJECT</span>
                      <span className="lunar-status">
                        <span className="live-beacon" />
                        <span>{m.status}</span>
                      </span>
                    </div>

                    <h3 className="lunar-card-title">{m.projectTitle}</h3>
                    <div className="lunar-card-sub">{m.techStack}</div>
                    <p className="lunar-card-desc">{m.summary}</p>
                  </div>

                  <div>
                    <div className="lunar-pipeline-row">
                      {m.highlights.slice(0, 2).map((hl, i) => (
                        <span className="lunar-node" key={i}>
                          {hl}
                        </span>
                      ))}
                    </div>

                    <div className="lunar-card-foot">
                      <span>View in Orrery Simulator</span>
                      <span>↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transmission Box */}
          <section className="transmission-box">
            <div className="section-tag">OPEN COMMUNICATIONS CHANNEL</div>
            <h2>Ready to collaborate on high-impact systems?</h2>
            <p className="transmission-sub">
              Whether you are scouting for a Software Engineering / AI Intern or looking to collaborate on backend architectures, my telemetry is always open.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                className="mode-toggle-btn"
                onClick={() => setIsTransmissionOpen(true)}
              >
                <span>Transmit Message 📡</span>
              </button>
              <button
                className="comms-btn"
                onClick={() => copyToClipboard(PROFILE.email, "Email")}
              >
                <span>Copy {PROFILE.email}</span>
              </button>
              <button
                className="comms-btn"
                onClick={() => copyToClipboard(PROFILE.phone, "Phone")}
              >
                <span>Copy {PROFILE.phone}</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* ====================================================================
          TRANSMISSION / CONTACT MODAL
          ==================================================================== */}
      {isTransmissionOpen && (
        <div className="modal-backdrop" onClick={() => setIsTransmissionOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-x"
              onClick={() => setIsTransmissionOpen(false)}
            >
              ✕
            </button>
            <div className="section-tag">SECURE COMMS LINK</div>
            <h2 style={{ fontFamily: "var(--font-scifi)", fontSize: "26px", margin: "8px 0 16px" }}>
              Transmit Message to Rajath
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
              Reach out directly to <strong>{PROFILE.email}</strong> or dispatch a transmission below:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${PROFILE.email}?subject=Connecting with Rajath M&body=Hi Rajath, I explored your Interplanetary Portfolio and would love to connect!`;
                setIsTransmissionOpen(false);
                showToast("Opening default mail client...");
              }}
            >
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button
                  type="submit"
                  className="mode-toggle-btn"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <span>Launch Mail Client 🚀</span>
                </button>
                <button
                  type="button"
                  className="comms-btn"
                  onClick={() => copyToClipboard(PROFILE.email, "Email")}
                >
                  <span>Copy Email</span>
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