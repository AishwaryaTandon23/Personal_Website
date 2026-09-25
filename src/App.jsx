import React, { useState, useEffect, useRef } from 'react';
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

  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  const scrollByCard = (direction) => {
    const scroller = scrollerRef.current;
    const firstCard = cardRefs.current[0];
    if (!scroller || !firstCard) return;
    const styles = window.getComputedStyle(scroller);
    const gap = parseFloat(styles.columnGap || styles.gap || '32') || 32;
    const amount = firstCard.getBoundingClientRect().width + gap;
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div className="page-content projects-section">
      <h2 className="section-heading">having some fun...</h2>

      <div className="projects-header">
        <div className="projects-nav-arrows">
          <button
            type="button"
            className="arrow-btn arrow-btn-ghost"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            className="arrow-btn arrow-btn-solid"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>

      <div className="projects-scroller" ref={scrollerRef}>
        {projects.map((project, idx) => (
          <div
            className="bento-card"
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
          >
            <div className="bento-card-media">
              {project.video ? (
                <video
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
                <img src={project.image} alt={project.title} />
              )}

              <div className="bento-card-gradient" />

              <div className="bento-card-overlay">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="bento-card-tags">
                  {project.tools.slice(0, 3).map((tool, i) => (
                    <span key={i}>{tool}</span>
                  ))}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <a
                  className="bento-card-cta"
                  href={project.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title}`}
                >
                  ↗
                </a>
              )}
            </div>

            {project.links && project.links.length > 1 && (
              <div className="bento-card-extra-links">
                {/* The first link already drives the round arrow button above,
                    so only list the additional ones here (e.g. Demo, once
                    Github is the primary link) to avoid repeating it. */}
                {project.links.slice(1).map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Oracle Product Consulting Intern",
      institution: "IBM",
      start: "Sept. 2026",
      link: "https://www.ibm.com/consulting/oracle",
      location: "Toronto, ON",
      description: "Support clients in implementing Oracle solutions through requirements analysis and strategic recommendations.",
      image: "/exp-ibm.png",
      imagePosition: "25% 35%",
      color: "pink",
    },
    {
      title: "Product Manager",
      institution: "UW Blueprint",
      start: "Aug. 2026",
      link: "https://uwblueprint.org/",
      end: "Present",
      location: "Waterloo, ON",
      description: "Working with the non-profit Don't Mess With the Don to scope, develop, and manage an event management platform.",
      type: "edu",
      image: "/exp-blueprint.png",
      imagePosition: "35% center",
      color: "yellow",
    },
    {
      title: "Technical Business Analyst & Systems Engineer",
      institution: "Victoria Hand Project",
      start: "Jan. 2026",
      link: "https://www.victoriahandproject.com/?gad_source=1&gad_campaignid=1045387125&gbraid=0AAAAADDlMbvpcnnuzumUY0g7urWC6FdKJ&gclid=Cj0KCQjwlNPVBhCMARIsAPZ5RqhQysrDq9fk90cbcgs3AlQWFxCaNeK_0gwj5CLD1S-76nv1ETnRM2caAscAEALw_wcB",
      end: "April 2026",
      location: "Victoria, BC",
      description: "Improving 3D-printed prosthetic solutions by translating user feedback into design improvements and optimizing stakeholder engagement.",
      image: "/exp-vhp.jpg",
      imagePosition: "center 25%",
      color: "lavender",
    },
    {
      title: "Co-Founder and Director of Operations",
      institution: "Mind4Youth",
      start: "Feb. 2023",
      link: "https://mind4youth.com/",
      end: "Present",
      location: "International",
      description: "Mobilize volunteers and launch initiatives that significantly advance youth mental health.",
      type: "work",
      image: "/exp-mind4youth.jpg",
      imagePosition: "40% 20%",
      color: "mint",
    },
    {
      title: "President",
      institution: "University of Waterloo Product Management Club",
      start: "Sept. 2025",
      link: "https://uwaterloopm.ca/",
      end: "Present",
      location: "Waterloo, ON",
      description: "Organized community engagement and outreach, educating University Students on product management techniques.",
      type: "edu",
      image: "/exp-uwpm.png",
      imagePosition: "10% center",
      color: "peach",
    },
    {
      title: "Pediatric Unit Intern",
      institution: "Markham-Stouffville Hospital",
      start: "Feb. 2024",
      end: "June 2024",
      location: "Markham, ON",
      description: "Researched and improved pediatric emergency experiences, prioritizing stress reduction and education for 200+ children through hospital-wide programs.",
      type: "work",
      image: "/exp-markham.png",
      imagePosition: "center 20%",
      color: "pink",
    }
  ];

  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 4;
  const visibleExperiences = expanded ? experiences : experiences.slice(0, VISIBLE_COUNT);
  const hasMore = experiences.length > VISIBLE_COUNT;

  return (
    <div className="experience-page">
      <h2 className="section-heading">what i've been up to :)</h2>

      <div className="experience-list">
        {visibleExperiences.map((exp, idx) => {
          // The date area carries the full range (or the incoming status),
          // so the description doesn't need to repeat it at the end.
          const dateLabel = exp.end
            ? `${exp.start} – ${exp.end}`
            : exp.status
            ? `${exp.start} (${exp.status})`
            : exp.start;

          return (
            <div className="experience-row" key={idx}>
              {(() => {
                const thumbClassName = `experience-thumb ${exp.type === 'edu' ? 'thumb-edu' : 'thumb-work'} thumb-${exp.color || 'pink'}`;
                const thumbContent = exp.image ? (
                  <img
                    src={exp.image}
                    alt={`${exp.title} at ${exp.institution}`}
                    style={{ objectPosition: exp.imagePosition || 'center' }}
                  />
                ) : (
                  <span>{exp.type === 'edu' ? '🎓' : '💼'}</span>
                );

                // Photos link out to the org's site when we have one; the
                // rest just render as a plain (non-clickable) thumbnail.
                return exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${thumbClassName} experience-thumb-link`}
                    aria-label={`Visit ${exp.institution}`}
                  >
                    {thumbContent}
                  </a>
                ) : (
                  <div className={thumbClassName}>{thumbContent}</div>
                );
              })()}

              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-subline">
                  {dateLabel} · {exp.institution} · {exp.location}
                </p>
                <p className="experience-description">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          type="button"
          className="experience-toggle"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Show less' : `Show ${experiences.length - VISIBLE_COUNT} more`}
        </button>
      )}
    </div>
  );
};

const Favourites = () => {
  // Each card's aspect ratio (width / height) matches its real photo, so the
  // frame shape actually fits the picture instead of forcing a crop:
  // the book cover stays tall and narrow, the Friends poster stays wide,
  // and so on. Cards flow into a balanced multi-column wall below instead
  // of a fixed grid, so sizes can differ freely without leaving gaps.
  const favourites = [
    { category: "book", rotate: 1.1, emoji: "📖", title: "Watch Me – Tahereh Mafi", color: "yellow", image: "/fav-book.png", ratio: 1500 / 2242 },
    { category: "song", rotate: -1.6, emoji: "🎵", title: "Purple – Olivia Rodrigo", color: "pink", image: "/fav-song.png", ratio: 1 },
    { category: "memory", rotate: -1, emoji: "✨", title: "Montreal Trip 2026", color: "lavender", image: "/fav-memory.jpg", ratio: 1024 / 768 },
    { category: "movie/show", rotate: -1.3, emoji: "🎬", title: "Friends", color: "peach", image: "/fav-movie.png", ratio: 1200 / 675 },
    { category: "food", rotate: 1.4, emoji: "🍜", title: "Zareen's, Sunnyvale CA", color: "mint", image: "/fav-food.png", ratio: 1354 / 1020 },
  ];

  return (
    <div className="favourites-page">
      <h2 className="section-heading">my favourites this month</h2>

      <div className="favourites-grid">
        {favourites.map((fav, idx) => (
          <div
            className={`favourite-card favourite-${fav.color}`}
            style={{ '--rotate': `${fav.rotate}deg` }}
            key={idx}
          >
            <div
              className={`favourite-image${fav.image ? ' favourite-image-filled' : ''}`}
              style={{ aspectRatio: fav.ratio }}
            >
              {fav.image ? (
                <img src={fav.image} alt={fav.title} />
              ) : (
                <span className="favourite-image-icon">{fav.emoji}</span>
              )}
            </div>
            <p className="favourite-title">{fav.title}</p>
            <span className="favourite-label">{fav.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- APP ---------------- */

function App() {
  const sectionIds = ['home', 'experience', 'projects', 'favourites'];
  const [activeSection, setActiveSection] = useState('home');

  // Scroll-spy: highlight the nav link for whichever section is currently in view,
  // so the nav bar stays in sync whether someone clicks it or just scrolls.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-container">

      {/* Hidden SVG filter: turbulence + displacement makes an element's
          border read as a hand-drawn squiggle instead of a straight
          rectangle. Defined once here, referenced from both the Experience
          photo frames and the Favourites cards via filter: url(#squiggly-border). */}
      <svg className="svg-defs" aria-hidden="true">
        <defs>
          <filter id="squiggly-border" x="-35%" y="-35%" width="170%" height="170%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <nav className={`navbar${['experience', 'favourites'].includes(activeSection) ? ' navbar-on-light' : ''}`}>
        <a href="#home" className="logo">AT</a>

        <div className="nav-dashboard">
          <a
            href="#experience"
            className={activeSection === 'experience' ? 'active' : ''}
          >
            Experience
          </a>

          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
          >
            Projects
          </a>

          <a
            href="#favourites"
            className={activeSection === 'favourites' ? 'active' : ''}
          >
            Favourites
          </a>

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

      <main className="main-content">
        <section id="home" className="scroll-section">
          <Home />
        </section>

        <section id="experience" className="scroll-section">
          <Experience />
        </section>

        <section id="projects" className="scroll-section">
          <Projects />
        </section>

        <section id="favourites" className="scroll-section">
          <Favourites />
        </section>
      </main>
    </div>
  );
}

export default App;
