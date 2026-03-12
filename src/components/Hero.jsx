import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import { gsap } from 'gsap';

// ── Particle Network (2D canvas) ──────────────────────────────────────────────
// Inspired by the DigiPratham neural-network background style.
function useParticleNetwork(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Colors for the dots (like the reference screenshot)
    const COLORS = ['#06B6D4', '#818CF8', '#22D3EE', '#a78bfa', '#34d399', '#f472b6', '#fbbf24'];
    const PARTICLE_COUNT = 90;
    const CONNECTION_DIST = 160;
    const SQUARE_COUNT = 12;

    let w = 0, h = 0;
    let particles = [];
    let squares = [];
    let animId;

    // ── Resize ──
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Init particles ──
    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2.5 + 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.4,
      }));

      // Floating accent squares (like the coloured squares in the reference)
      squares = Array.from({ length: SQUARE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 9 + 4,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.35 + 0.15,
      }));
    };
    initParticles();

    // ── Draw ──
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Soft glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grd.addColorStop(0, p.color + '44');
        grd.addColorStop(1, p.color + '00');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Accent squares
      for (const sq of squares) {
        ctx.save();
        ctx.globalAlpha = sq.alpha;
        ctx.fillStyle = sq.color;
        ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
        ctx.restore();
      }
    };

    // ── Update ──
    const update = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (const sq of squares) {
        sq.x += sq.vx;
        sq.y += sq.vy;
        if (sq.x < 0 || sq.x > w) sq.vx *= -1;
        if (sq.y < 0 || sq.y > h) sq.vy *= -1;
      }
    };

    // ── Mouse interaction — attract nearby particles ──
    let mx = -9999, my = -9999;
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    const applyMouse = () => {
      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          p.vx += (dx / d) * 0.018;
          p.vy += (dy / d) * 0.018;
          // Speed cap
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.8) { p.vx = (p.vx / speed) * 1.8; p.vy = (p.vy / speed) * 1.8; }
        }
      }
    };

    // ── Loop ──
    const loop = () => {
      animId = requestAnimationFrame(loop);
      applyMouse();
      update();
      draw();
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [canvasRef]);
}

// ─────────────────────────────────────────────────────────────────────────────

const Hero = ({ darkMode }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Next.js', 'TypeScript', 'Python', 'FastAPI'];
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  useParticleNetwork(canvasRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-text-item', { opacity: 0, y: 35 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 })
        .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-social', { opacity: 0, x: -15 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 }, '-=0.2');
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode ? 'bg-primary' : 'bg-gray-950'
      }`}
    >
      {/* ── Full-screen particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ display: 'block', cursor: 'crosshair' }}
      />

      {/* ── Subtle vignette so text pops ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.55) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <p className="hero-text-item text-accent text-lg font-medium mb-4 tracking-widest uppercase">
              Hi, I'm
            </p>
            <h1 className="hero-text-item text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-white">
              Sandeep{' '}<span className="gradient-text">Sharma</span>
            </h1>
            <h2 className="hero-text-item text-2xl md:text-3xl font-semibold mb-6 text-gray-300">
              Full-Stack MERN Developer
              <br />
              <span className="text-lg md:text-xl text-gray-400">Building Scalable Web Solutions</span>
            </h2>

            <div className="hero-text-item flex items-center space-x-3 mb-8">
              <span className="text-gray-400">Specializing in:</span>
              <motion.span
                key={currentSkill}
                className="text-accent font-bold text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {skills[currentSkill]}
              </motion.span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="hero-btn px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-accent-dark transition-all"
                whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="hero-btn px-8 py-3 font-semibold rounded-lg border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                download="Sandeep_Sharma_Resume.pdf"
                className="hero-btn px-8 py-3 font-semibold rounded-lg border-2 border-gray-600 text-gray-300 hover:border-accent hover:text-accent transition-all flex items-center gap-2"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload /> Resume
              </motion.a>
            </div>

            {/* Social */}
            <div className="flex space-x-4">
              {[
                { icon: <FiGithub size={22} />, href: 'https://github.com/Sandeepsharmawagle' },
                { icon: <FiLinkedin size={22} />, href: 'https://linkedin.com/in/sandipsharmaw' },
                { icon: <FiMail size={22} />, href: 'mailto:sandipsharm4321@gmail.com' },
              ].map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="hero-social p-3 rounded-full bg-gray-800/80 text-white hover:bg-accent hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Profile photo */}
          <div className="hidden md:flex justify-center">
            <motion.div
              className="relative"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)' }}
              />
              <div className="relative w-64 h-64 rounded-full overflow-hidden glass-effect-dark p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/profile.jpg"
                    alt="Sandeep Sharma"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div className="text-7xl font-bold text-white hidden items-center justify-center w-full h-full">SS</div>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #06B6D4, #818CF8, #06B6D4)', padding: '3px', zIndex: -1, borderRadius: '100%' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection('#about')}
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 tracking-widest text-xs uppercase text-gray-400">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
