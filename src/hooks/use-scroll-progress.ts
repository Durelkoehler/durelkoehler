"use client";

import { useEffect, useState } from "react";

/**
 * Performantly tracks the normalized scroll progress of the viewport (0.0 to 1.0)
 * utilizing requestAnimationFrame throttling and passive event listeners.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      
      const totalScrollable = scrollHeight - clientHeight;
      const normalized = totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      
      // Clamp between 0 and 1
      setProgress(Math.max(0, Math.min(1, normalized)));
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial run
    updateScroll();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return progress;
}
