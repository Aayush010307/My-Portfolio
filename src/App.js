import React, { useState, useEffect } from "react";
import myPhoto from "./assets/me.jpg";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- custom typing hook (no external dep) ---------- */
function useTypedText(strings, speed = 100, backSpeed = 50, pause = 1000) {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [forward, setForward] = React.useState(true);
  const [blink, setBlink] = React.useState(true);

  React.useEffect(() => {
    if (index === strings.length) return;
    if (forward) {
      if (subIndex < strings[index].length) {
        const t = setTimeout(() => setSubIndex((s) => s + 1), speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setForward(false), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (subIndex > 0) {
        const t = setTimeout(() => setSubIndex((s) => s - 1), backSpeed);
        return () => clearTimeout(t);
      } else {
        setForward(true);
        setIndex((i) => (i + 1) % strings.length);
      }
    }
  }, [subIndex, index, forward, strings, speed, backSpeed, pause]);

  React.useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return `${strings[index].substring(0, subIndex)}${blink ? "|" : " "}`;
}

/* ----------------- App ----------------- */
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const typedText = useTypedText(
    ["AI/ML Enthusiast", "Frontend Developer", "Cloud Learner"],
    80,
    50,
    1200
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Project One — College Forum",
      description:
        "A forum for freshers to connect with seniors and alumni. Built with React, Firebase, and Tailwind.",
      repo: "https://github.com/Aayush010307",
      demo: "#",
    },
    {
      id: 2,
      title: "Project Two — Image Editor",
      description: "A simple image editing web app with crop, resize and filters.",
      repo: "https://github.com/Aayush010307",
      demo: "#",
    },
  ];

  const skills = [
    { name: "React", level: 80 },
    { name: "AI/ML", level: 70 },
    { name: "Python", level: 85 },
    { name: "AWS Cloud", level: 60 },
    { name: "Tailwind CSS", level: 75 },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 font-sans dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* ======= Particles - minimal test config (blue links) =======
          This is intentionally simple so you can verify particles render.
          If visible, replace color and settings with more subtle values.
      */}
      <Particles
        id="tsparticles"
        init={async (engine) => {
          // load slim features
          await loadSlim(engine);
        }}
        options={{
          background: {
            color: { value: darkMode ? "#0f172a" : "#f9fafb" },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: "#60a5fa" }, // light blue test color
            links: { enable: true, distance: 150, color: "#60a5fa", opacity: 0.5, width: 1 },
            move: { enable: true, speed: 2 },
            size: { value: { min: 1, max: 4 } },
            opacity: { value: 0.6 },
          },
          detectRetina: true,
        }}
        className="fixed inset-0 -z-10"
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
              AJ
            </div>
            <div>
              <a
                href="https://github.com/Aayush010307"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Aayush Jaiswal
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                BTech CSE — VIT Vellore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="space-x-4 text-sm">
              {["home", "about", "skills", "projects", "contact"].map((p) => (
                <Link
                  key={p}
                  to={p}
                  spy={true}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  activeClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  className="cursor-pointer py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setDarkMode((d) => !d)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-sm"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </header>

      {/* Main content - ensure z above particles */}
      <main className="relative z-20 max-w-5xl mx-auto px-6 py-12 space-y-24">
        {/* Home */}
        <Element name="home">
          <section>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-extrabold leading-tight">Hi — I'm Aayush.</h2>
                <p className="text-indigo-600 dark:text-indigo-400 text-xl mt-2">{typedText}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  I'm a BTech Computer Science student at VIT Vellore. I build web apps, dabble in AI/ML, and enjoy making tools that help people learn and connect.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link to="projects" smooth duration={600} offset={-70} className="inline-block px-5 py-2 rounded shadow-sm bg-indigo-600 text-white cursor-pointer">
                    See projects
                  </Link>
                  <Link to="contact" smooth duration={600} offset={-70} className="inline-block px-5 py-2 rounded border dark:border-gray-500 cursor-pointer">
                    Get in touch
                  </Link>
                </div>
              </div>

              <div className="flex justify-center">
                <a href="https://www.linkedin.com/in/aayush-jaiswal-35344b31b/" target="_blank" rel="noopener noreferrer" className="w-56 h-56 rounded-2xl bg-gradient-to-tr from-indigo-100 to-pink-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-lg">
                  <img src={myPhoto} alt="Aayush Jaiswal" className="w-44 h-44 rounded-full object-cover hover:scale-105 transition-transform" />
                </a>
              </div>
            </div>
          </section>
        </Element>

        {/* About */}
        <Element name="about">
          <section>
            <h2 className="text-2xl font-bold">About me</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              I'm a CSE undergrad at VIT Vellore. I enjoy building practical projects, learning cloud (AWS), and improving my prompt engineering skills. I also like reading, travelling, and gaming.
            </p>
          </section>
        </Element>

        {/* Skills */}
        <Element name="skills">
          <section>
            <h2 className="text-2xl font-bold">Skills</h2>
            <div className="mt-6 space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1 }} className="h-3 rounded-full bg-indigo-600" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Element>

        {/* Projects */}
        <Element name="projects">
          <section>
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
                  <div className="mt-4 flex gap-3">
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-sm underline">Repo</a>
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-sm underline">Demo</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Element>

        {/* Contact */}
        <Element name="contact">
          <section>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Want to work together or ask a question? Reach out.</p>
            <div className="mt-6 max-w-md">
              <form action={`mailto:your.email@example.com`} method="get" className="space-y-3">
                <div>
                  <label className="block text-sm">Your email</label>
                  <input type="email" name="to" placeholder="you@example.com" className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-sm">Message</label>
                  <textarea name="body" rows={4} className="mt-1 w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600" placeholder="Hi — I'd like to talk about..." />
                </div>
                <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Send email</button>
              </form>

              <div className="mt-6 text-sm">
                Or find me on:{" "}
                <a href="https://github.com/Aayush010307" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>{" "}
                ·{" "}
                <a href="https://www.linkedin.com/in/aayush-jaiswal-35344b31b/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a>
              </div>
            </div>
          </section>
        </Element>
      </main>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scrollButton"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => scroll.scrollToTop({ smooth: true, duration: 600 })}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-6 border-t text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400 z-20 relative">
        © {new Date().getFullYear()} Aayush Jaiswal — Built with ❤️
      </footer>
    </div>
  );
}