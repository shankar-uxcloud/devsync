import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < Math.min(count, 60); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div className="landing-grid-pattern absolute inset-0" />

      {/* Primary blue glow — top center */}
      <div
        className="absolute left-1/2 top-[15%] h-[500px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(37, 99, 235, 0.08)" }}
      />

      {/* Secondary purple glow — right */}
      <div
        className="absolute right-[10%] top-[30%] h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background: "rgba(124, 58, 237, 0.06)" }}
      />

      {/* Bottom glow behind dashboard preview */}
      <div
        className="absolute bottom-[-5%] left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(37, 99, 235, 0.1)" }}
      />

      {/* Animated particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.6 }}
      />
    </div>
  );
}
