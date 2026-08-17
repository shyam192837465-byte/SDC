import React, { useEffect, useRef } from 'react';

const CONFIG = {
  sparkColor: '#14b8a6',
  sparkSize: 11,
  sparkRadius: 38,
  sparkCount: 7,
  duration: 500,
  easing: 'ease-out',
  extraScale: 1.1,
};

function easeFunc(t, fn) {
  switch (fn) {
    case 'linear': return t;
    case 'ease-in': return t * t;
    case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default: return t * (2 - t); // ease-out
  }
}

export default function ClickSpark() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let rafId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks = sparks.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= CONFIG.duration) return false;

        const progress = elapsed / CONFIG.duration;
        const eased = easeFunc(progress, CONFIG.easing);
        const distance = eased * CONFIG.sparkRadius * CONFIG.extraScale;
        const lineLength = CONFIG.sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.globalAlpha = 1 - eased;
        ctx.strokeStyle = CONFIG.sparkColor;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      if (sparks.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        rafId = null;
      }
    };

    const addSparks = (clientX, clientY) => {
      const now = performance.now();
      for (let i = 0; i < CONFIG.sparkCount; i++) {
        const angle = (2 * Math.PI * i) / CONFIG.sparkCount + (Math.random() - 0.5) * 0.4;
        sparks.push({
          x: clientX,
          y: clientY,
          angle,
          startTime: now,
        });
      }
      if (!rafId) {
        rafId = requestAnimationFrame(draw);
      }
    };

    const handleClick = (e) => {
      addSparks(e.clientX, e.clientY);
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        addSparks(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleTouch);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="click-spark-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2147483647,
        display: 'block',
        userSelect: 'none',
      }}
    />
  );
}
