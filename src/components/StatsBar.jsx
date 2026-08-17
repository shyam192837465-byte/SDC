import React, { useEffect, useRef } from 'react';

const statsData = [
  { target: 10, suffix: '+', label: 'Years of Smile Design' },
  { target: 5000, suffix: '+', label: 'Happy Patients' },
  { target: 15, suffix: '+', label: 'Treatment Specialties' },
  { target: 99, suffix: '%', label: 'Satisfaction Rate %' },
];

export default function StatsBar() {
  const sectionRef = useRef(null);
  const numRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1000;
          const startTime = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 2);

            statsData.forEach((stat, idx) => {
              if (numRefs.current[idx]) {
                const val = Math.floor(stat.target * easeProgress);
                numRefs.current[idx].textContent = `${val}${stat.suffix}`;
              }
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              statsData.forEach((stat, idx) => {
                if (numRefs.current[idx]) {
                  numRefs.current[idx].textContent = `${stat.target}${stat.suffix}`;
                }
              });
              observer.disconnect();
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar" ref={sectionRef}>
      <div className="container stats-grid">
        {statsData.map((stat, idx) => (
          <div className="stat-item" key={idx}>
            <div
              className="stat-num"
              ref={(el) => (numRefs.current[idx] = el)}
            >
              {stat.target}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
