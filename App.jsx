import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const roles = ["UI/UX Designer", "Web Designer", "Graphic Designer", "Frontend Designer"];

const services = [
  ["bi-phone", "UI/UX Design", "User-centered interfaces, wireframes, prototypes and responsive product experiences."],
  ["bi-window", "Web Design", "Modern landing pages and responsive websites designed for usability and conversion."],
  ["bi-palette", "Graphic Design", "Brand visuals, social media designs, marketing creatives and visual assets."],
  ["bi-code-slash", "Frontend", "Clean responsive interfaces using HTML, CSS, JavaScript and Bootstrap."]
];

const tools = [
  ["F", "Figma", "figma-icon"], ["Ps", "Photoshop", "photoshop-icon"],
  ["Ai", "Illustrator", "illustrator-icon"], ["Id", "InDesign", "indesign-icon"],
  ["Xd", "Adobe XD", "xd-icon"], ["5", "HTML", "html-icon"],
  ["#", "CSS", "css-icon"], ["JS", "JavaScript", "js-icon"], ["B", "Bootstrap", "bootstrap-icon"]
];

const projects = [
  ["project-one", "NyayaTrack", "MOBILE APP • UI/UX", "A modern case management concept designed to organize police and legal case workflows.", "nyaya"],
  ["project-two", "Green Life", "BRANDING • UI/UX", "A clean environmental brand identity and digital experience focused on sustainable living.", "green"],
  ["project-three", "StudyGrant", "WEB DESIGN • UI/UX", "A scholarship discovery platform concept helping students find relevant opportunities.", "study"]
];

const process = [
  ["01", "bi-search", "Discover", "Understand users, goals and problems."],
  ["02", "bi-diagram-3", "Define", "Organize requirements and user needs."],
  ["03", "bi-lightbulb", "Ideate", "Explore solutions and interaction ideas."],
  ["04", "bi-pencil-square", "Design", "Create wireframes, UI and prototypes."],
  ["05", "bi-check2-circle", "Test", "Validate the design and iterate."]
];

export default function App() {
  const [role, setRole] = useState("");
  const [backTop, setBackTop] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    let roleIndex = 0, charIndex = 0, deleting = false, timer;

    const type = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        setRole(current.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(type, 1400);
          return;
        }
      } else {
        setRole(current.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timer = setTimeout(type, deleting ? 50 : 90);
    };

    type();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setBackTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        throw new Error("EmailJS environment variables are missing.");
      }

      emailjs.init({ publicKey });
      await emailjs.sendForm(serviceId, templateId, formRef.current);
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Please configure EmailJS keys in your .env file.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="background">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-background" />
      </div>

      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <span className="brand-icon">SK</span>
            <span>Sudhanshu Kumar<small>UI/UX Designer</small></span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <i className="bi bi-list" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto">
              {["home","about","services","skills","projects","process"].map((item) => (
                <li className="nav-item" key={item}>
                  <a className="nav-link" href={`#${item}`}>{item === "home" ? "Home" : item[0].toUpperCase()+item.slice(1)}</a>
                </li>
              ))}
            </ul>
            <a href="/image/Sudhanshu Kumar.pdf" download="Sudhanshu_Kumar_Resume.pdf" className="btn btn-outline-dark rounded-pill resume-btn">Resume <i className="bi bi-download" /></a>
            <a href="#contact" className="btn btn-dark rounded-pill talk-btn">Let's Talk <i className="bi bi-arrow-up-right" /></a>
          </div>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="container"><div className="row align-items-center g-5">
          <div className="col-lg-7">
            <div className="hero-content reveal">
              <div className="eyebrow">HELLO, I'M</div>
              <h1>Sudhanshu<br /><span className="gradient-text">Kumar</span></h1>
              <div className="typing-wrapper"><span>{role}</span><span className="typing-cursor" /></div>
              <p className="hero-description">I design clean, modern and meaningful digital experiences that combine usability, creativity and visual aesthetics.</p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-dark rounded-pill">View My Work <i className="bi bi-arrow-up-right" /></a>
                <a href="/image/Sudhanshu Kumar.pdf" download="Sudhanshu_Kumar_Resume.pdf" className="btn btn-light rounded-pill border">Download CV <i className="bi bi-download" /></a>
              </div>
              <div className="mini-info">
                <div><strong>BCA</strong><span>Graduate · 2024</span></div>
                <div><strong>2025–26</strong><span>Arena Animation</span></div>
                <div><strong>UI/UX</strong><span>Primary Focus</span></div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="hero-visual reveal">
              <div className="profile-card glass-card">
                <div className="profile-avatar"><img src="/image/pngmy.png" alt="Sudhanshu Kumar" /></div>
                <div className="profile-content"><span>DIGITAL DESIGNER</span><h3>Sudhanshu Kumar</h3><p>UI/UX • Web • Graphic</p></div>
                <div className="floating-card card-one"><i className="bi bi-bezier2" /><span>UI/UX Design</span></div>
                <div className="floating-card card-two"><i className="bi bi-code-slash" /><span>Frontend</span></div>
                <div className="floating-card card-three"><i className="bi bi-palette" /><span>Visual Design</span></div>
              </div>
            </div>
          </div>
        </div></div>
      </section>

      <section className="section-space" id="about"><div className="container">
        <div className="section-label reveal">ABOUT ME</div>
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 reveal">
            <h2 className="section-title">Designing with purpose.<br /><span className="gradient-text">Building with empathy.</span></h2>
            <p className="muted">I'm Sudhanshu Kumar, a BCA graduate and UI/UX Designer focused on creating simple, modern and user-friendly digital experiences.</p>
            <p className="muted">I completed my BCA in 2024 and I'm currently pursuing a <strong>1 Year Program at Arena Animation from 2025–2026</strong>, focused on Graphic Design, Web Development and UI/UX Design.</p>
            <a href="/image/Sudhanshu Kumar.pdf" download="Sudhanshu_Kumar_Resume.pdf" className="btn btn-dark rounded-pill px-4">Download Resume <i className="bi bi-download" /></a>
          </div>
          <div className="col-lg-6"><div className="stats-grid reveal">
            {[
              ["2024","BCA Graduate"],["2025–26","Arena Animation"],["UI/UX","Design Focus"],["Fresher","Open to Opportunities"]
            ].map(([a,b]) => <div className="stat-card glass-card" key={a}><strong>{a}</strong><span>{b}</span></div>)}
          </div></div>
        </div>
      </div></section>

      <section className="section-space" id="services"><div className="container">
        <div className="section-label reveal">WHAT I DO</div><h2 className="section-title reveal">Services I Offer</h2>
        <div className="row g-4 mt-2">
          {services.map(([icon,title,desc]) => <div className="col-md-6 col-lg-3" key={title}><div className="service-card glass-card reveal"><div className="service-icon"><i className={`bi ${icon}`} /></div><h4>{title}</h4><p>{desc}</p></div></div>)}
        </div>
      </div></section>

      <section className="section-space" id="skills"><div className="container">
        <div className="section-label reveal">TOOLS & SKILLS</div><h2 className="section-title reveal">Technologies & Tools I Use</h2>
        <div className="tools-grid mt-4">
          {tools.map(([icon,name,cls]) => <div className="tool glass-card reveal" key={name}><div className={`tool-icon ${cls}`}>{icon}</div><span>{name}</span></div>)}
        </div>
      </div></section>

      <section className="section-space" id="projects"><div className="container">
        <div className="section-label reveal">FEATURED PROJECTS</div><h2 className="section-title reveal">Selected Work</h2>
        <div className="row g-4 mt-2">
          {projects.map(([bg,title,tag,desc,type]) => (
            <div className="col-lg-4" key={title}><div className="project-card glass-card reveal">
              <div className={`project-image ${bg}`}>
                {type === "nyaya" && <div className="project-ui"><div className="ui-line" /><div className="ui-line short" /><div className="ui-boxes"><span /><span /><span /></div></div>}
                {type === "green" && <div className="green-card"><i className="bi bi-leaf" /><strong>GREEN LIFE</strong><small>Sustainable Living</small></div>}
                {type === "study" && <div className="study-card"><i className="bi bi-mortarboard" /><strong>StudyGrant</strong><small>Scholarship Finder</small></div>}
              </div>
              <div className="project-content"><span>{tag}</span><h4>{title}</h4><p>{desc}</p><a href="#contact">Discuss Project <i className="bi bi-arrow-up-right" /></a></div>
            </div></div>
          ))}
        </div>
      </div></section>

      <section className="section-space" id="process"><div className="container">
        <div className="section-label reveal">MY PROCESS</div><h2 className="section-title reveal">Design Process I Follow</h2>
        <div className="process-grid mt-4">
          {process.map(([num,icon,title,desc]) => <div className="process-card glass-card reveal" key={num}><span>{num}</span><i className={`bi ${icon}`} /><h4>{title}</h4><p>{desc}</p></div>)}
        </div>
      </div></section>

      <section className="section-space" id="contact"><div className="container"><div className="contact-box glass-card reveal"><div className="row g-5">
        <div className="col-lg-5">
          <div className="section-label">LET'S CONNECT</div>
          <h2 className="section-title">Have a project in mind?<br /><span className="gradient-text">Let's create something amazing.</span></h2>
          <p className="muted">I'm open to UI/UX internships, freelance opportunities and creative collaborations.</p>
          <div className="contact-info">
            <a href="mailto:codexsudhanshu01@gmail.com"><i className="bi bi-envelope" />codexsudhanshu01@gmail.com</a>
            <a href="https://portfolio-six-xi-89.vercel.app/" target="_blank" rel="noopener"><i className="bi bi-globe" />Portfolio</a>
            <span><i className="bi bi-geo-alt" />India</span>
          </div>
        </div>
        <div className="col-lg-7">
          <form ref={formRef} onSubmit={sendMessage}><div className="row g-3">
            <div className="col-md-6"><input type="text" name="from_name" placeholder="Your Name" required /></div>
            <div className="col-md-6"><input type="email" name="reply_to" placeholder="Your Email" required /></div>
            <div className="col-12"><input type="text" name="subject" placeholder="Your Project" required /></div>
            <div className="col-12"><textarea name="message" rows="6" placeholder="Your Message" required /></div>
            <div className="col-12"><button type="submit" className="btn btn-dark rounded-pill w-100 py-3" disabled={sending}>{sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"} {!sending && <i className={`bi ${sent ? "bi-check-circle" : "bi-send"}`} />}</button></div>
          </div></form>
        </div>
      </div></div></div></section>

      <footer><div className="container"><div className="footer-content">
        <div><strong>Sudhanshu Kumar</strong><span>UI/UX Designer</span></div>
        <div>© {new Date().getFullYear()} Sudhanshu Kumar</div>
        <div className="socials"><a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a><a href="#" aria-label="GitHub"><i className="bi bi-github" /></a><a href="mailto:codexsudhanshu01@gmail.com" aria-label="Email"><i className="bi bi-envelope" /></a></div>
      </div></div></footer>

      <button className={`back-top ${backTop ? "show" : ""}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><i className="bi bi-arrow-up" /></button>
    </>
  );
}
