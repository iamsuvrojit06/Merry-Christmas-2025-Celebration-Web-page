
import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const snowflakes: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
    const count = 150;

    const createSnowflakes = () => {
      snowflakes.length = 0;
      for (let i = 0; i < count; i++) {
        snowflakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      snowflakes.forEach((sf) => {
        sf.y += sf.speed;
        sf.x += Math.sin(sf.y / 50) * 0.5;

        if (sf.y > height) {
          sf.y = -sf.radius;
          sf.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.globalAlpha = sf.opacity;
        ctx.arc(sf.x, sf.y, sf.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createSnowflakes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default Snowfall;
