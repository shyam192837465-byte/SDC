import React, { useEffect, useRef, useState } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    // Only enable cursor follower on devices with a fine pointer (mouse / trackpad)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setIsPointerFine(hasFinePointer);

    if (!hasFinePointer) return;

    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrameId = null;
    let isMoving = false;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Smooth linear interpolation (lerp)
      currentX += dx * 0.14;
      currentY += dy * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      // If still trailing, continue loop; if settled, stop loop to save 100% CPU/GPU
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform',
        transform: 'translate3d(-999px, -999px, 0)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '-180px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(13, 148, 136, 0.24) 0%, rgba(14, 165, 233, 0.1) 40%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
