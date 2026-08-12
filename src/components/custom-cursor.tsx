"use client";

import React, { useEffect, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, 0);

    const moveCursor = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed left-0 top-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[10000] mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovered ? 3.5 : 1})`,
      }}
      aria-hidden="true"
    />
  );
}
