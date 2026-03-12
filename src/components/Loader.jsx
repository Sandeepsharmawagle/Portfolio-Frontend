import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated entrance
      gsap.from(containerRef.current, { opacity: 0, duration: 0.4 });

      // Progress bar from 0 → 100
      gsap.to(barRef.current, {
        width: '100%',
        duration: 1.6,
        ease: 'power2.inOut',
      });

      // Title reveal with clip-path
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });

      // Dots bounce loop
      gsap.to('.loader-dot', {
        y: -12,
        stagger: 0.15,
        duration: 0.45,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-50"
      style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)' }}
    >
      {/* Glow orb */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />

      <div ref={textRef} className="text-center relative z-10 mb-10">
        <h1 className="text-5xl font-display font-bold gradient-text mb-2">SS.</h1>
        <p className="text-gray-400 text-base tracking-widest uppercase text-sm">
          Sandeep Sharma — Portfolio
        </p>
      </div>

      {/* Progress track */}
      <div className="relative z-10 w-56 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-6">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #06B6D4 0%, #818CF8 100%)',
            boxShadow: '0 0 12px rgba(6,182,212,0.6)',
          }}
        />
      </div>

      {/* Bouncing dots */}
      <div ref={dotsRef} className="flex space-x-3 relative z-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="loader-dot w-2.5 h-2.5 rounded-full"
            style={{ background: i === 1 ? '#818CF8' : '#06B6D4', display: 'inline-block' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
