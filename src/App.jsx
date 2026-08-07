import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import './App.css';

/* ---------------- HOME ---------------- */

const Home = () => {
  const [statusText, setStatusText] = useState("Systems Design Engineering at the University of Waterloo, 2025 Loran Scholar");
  const [displayName, setDisplayName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isDone, setIsDone] = useState(false);

  const names = ["aishwarya", "aishu", "'eye-shoe'"];

  useEffect(() => {
    if (isDone) return;

    const handleType = () => {
      const i = loopNum % names.length;
      const fullText = names[i];

      setDisplayName(
        isDeleting
          ? fullText.substring(0, displayName.length - 1)
          : fullText.substring(0, displayName.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && displayName === fullText) {
        if (fullText === "aishwarya" && loopNum >= names.length) {
          setIsDone(true);
          return;
        }
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayName === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayName, isDeleting, loopNum, isDone]);

  return (
    <div className="hero">

      {/* Background Video — playsInline is critical for iOS autoplay */}
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
      >
        <source src="/portfolio.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="video-overlay"></div>

      {/* Foreground Content */}
      <div className="hero-content">
        <div className="name-container">
          <h1>
            hi, my name is{" "}
            <span className="dynamic-name">{displayName}</span>
            {!isDone && <span className="cursor">|</span>}
          </h1>
        </div>

        <p>
          <span
            className="editable-glow"
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={(e) => setStatusText(e.currentTarget.textContent)}
            spellCheck="false"
          >
            {statusText}
          </span>
        </p>
      </div>
    </div>
  );
};

/* ---------------- OTHER PAGES ---------------- */

const About = () => (
  <div className="page-content">
    <h1>About Me</h1>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: "NomNom",
      image: "/proj4.jpg",
      description: "Building an app that disguises as a food ordering platform while offering support for individuals at risk.",
      links: [
        { label: "Figma", url: "https://www.figma.com/proto/MXSp4IM6M78rAxIpYO6HDO/NomNom-iOS-App-Prototype?node-id=0-1&t=U99nMAMqv6dxLp2T-1" },
      ],
      tools: ["React", "Typescript", "Figma", "MongoDB"]
    },
    {
      title: "Mind4Youth Self Care Kits",
      image: "/proj2.jpg",
      description: "Built a youth mental health non-profit, distributing 5000+ care kits globally.",
      links: [
        { label: "Website", url: "https://mind4youth.com" },
      ],
      tools: ["Business Development", "User Research"]
    },
    {
      title: "Prosthetic Design - Book Assistive Device",
      image: "/proj7.jpg",
      description: "Designed a prosthetic assistive device to assist individuals in turning book pages more easily.",
      tools: ["Fusion 360", "User-Centered Design", "3D Printing"],
    },
    {
      title: "Prosthetic Hand Design",
      image: "/proj8.jpg",
      description: "Designed a 3D hand model in Fusion 360 for a company event supporting a new Kenya campaign.",
      tools: ["Fusion 360", "3D Printing"],
    },
    {
      title: "SafeNest",
      image: "/proj6.jpg",
      description: "Designed and developed a financial-literacy website.",
      links: [
        { label: "Github", url: "https://github.com/AishwaryaTandon23/safenest" },
        { label: "Demo", url: "https://drive.google.com/file/d/1LEeix1RDdDK9PqoOr0_ENGyB_ytmvffb/view" }
      ],
      tools: ["Software Development", "Front-End"]
    },
    {
      title: "Technical Manual Development",
      image: "/proj9.jpg",
      description: "Created and updated technical manuals explaining product use for non-technical audiences.",
      tools: ["Microsoft Suite", "User Research"],
    },
    {
      title: "JamHacks Website",
      image: "/proj1.jpg",
      description: "Designed the interactive website for JamHacks, a student-run hackathon.",
      links: [
        { label: "Figma", url: "https://www.figma.com/proto/EbFepnR4NMUCcemtjD6GPf/JAMHacks-Website?node-id=0-1&t=CunztN9x5My2db0b-1" },
      ],
      tools: ["UI/UX Design", "Figma"]
    },
    {
      title: "Fluffy vs. Feathers",
      video: "/fluffy.mp4",
      description: "Designed and built a 3D printed puzzle game with functional hockey elements.",
      tools: ["SolidWorks", "UI/UX Design"]
    },
  ];

  return (
    <div className="page-content projects-page-horizontal">
      <div className="projects-container">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <h2>{project.title}</h2>

            {project.links && project.links.length > 0 && (
              <div className="project-links">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {project.video ? (
              <video
                className="project-video"
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
            )}

            <p className="project-description">{project.description}</p>
            <div className="project-tools">
              {project.tools.map((tool, i) => (
                <span key={i} className="tool">{tool}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Technical Business Analyst & Systems Engineer",
      institution: "Victoria Hand Project",
      period: "Jan. 2026 - April 2026",
      location: "Victoria, BC",
      description: "Improving 3D-printed prosthetic solutions by translating user feedback into design improvements and optimizing stakeholder engagement.",
    },
    {
      title: "President",
      institution: "University of Waterloo Product Management Club",
      period: "Sept. 2025 - Present",
      location: "Waterloo, ON",
      description: "Organized community engagement and outreach, educating University Students on product management techniques.",
      type: "edu"
    },
    {
      title: "Co-Founder and Director of Operations",
      institution: "Mind4Youth",
      period: "Feb. 2023 – Present",
      location: "International",
      description: "Mobilize volunteers and launch initiatives that significantly advance youth mental health.",
      type: "work"
    },
    {
      title: "Pediatric Unit Intern",
      institution: "Markham-Stouffville Hospital",
      period: "Feb. 2024 – June 2024",
      location: "Markham, ON",
      description: "Researched and improved pediatric emergency experiences, prioritizing stress reduction and education for 200+ children through hospital-wide programs.",
      type: "work"
    }
  ];

  return (
    <div className="experience-page">
      <div className="timeline-container">
        {experiences.map((exp, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-icon">
              {exp.type === 'edu' ? (
                <span className="icon-circle">🎓</span>
              ) : (
                <span className="icon-circle">💼</span>
              )}
            </div>
            <div className="experience-card">
              <div className="card-header">
                <div className="title-group">
                  <h3>{exp.title}</h3>
                  <p className="institution">{exp.institution}</p>
                </div>
                <div className="meta-group">
                  <span className="period">{exp.period}</span>
                  <span className="dot">•</span>
                  <span className="location">{exp.location}</span>
                </div>
              </div>
              <p className="description">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- APP ---------------- */

function App() {
  const location = useLocation();

  return (
    <div className="portfolio-container">

      <nav className="navbar">
        <Link to="/" className="logo">AT</Link>

        <div className="nav-dashboard">
          <Link
            to="/projects"
            className={location.pathname === '/projects' ? 'active' : ''}
          >
            Projects
          </Link>

          <Link
            to="/experience"
            className={location.pathname === '/experience' ? 'active' : ''}
          >
            Experience
          </Link>

          <a
            href="https://www.linkedin.com/in/aishwarya-tandon-028776273/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <FaLinkedin />
          </a>

          <a
            href="mailto:aishutandon.at@gmail.com"
            className="icon-link"
          >
            <FaEnvelope />
          </a>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;