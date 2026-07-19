"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const startedAt = performance.now();

    const updateProgress = (now: number) => {
      if (cancelled) return;
      const nextProgress = Math.min(99, Math.floor((now - startedAt) / 6));
      setProgress(nextProgress);

      if (nextProgress >= 99) {
        setIsLeaving(true);
        window.setTimeout(() => {
          if (!cancelled) setIsVisible(false);
        }, 320);
        return;
      }

      frame = requestAnimationFrame(updateProgress);
    };

    frame = requestAnimationFrame(updateProgress);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`site-loader${isLeaving ? " is-leaving" : ""}`} role="status" aria-label={`Loading ${progress} percent`}>
      <span>{String(progress).padStart(2, "0")}</span>
    </div>
  );
}
