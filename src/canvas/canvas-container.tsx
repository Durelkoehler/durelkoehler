"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CANVAS_CONFIG } from "@/constants/config";
import { FramePreloader } from "./preloader";
import { drawImageCover } from "./renderer";
import { useDevicePower } from "@/hooks/use-device-power";

export default function CanvasContainer(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const { isLowPower } = useDevicePower();
  const prefersReducedMotion = useReducedMotion();
  const shouldSkipCanvas = isLowPower || prefersReducedMotion;

  // Reference hooks to run scroll values inside the requestAnimationFrame loop
  const frameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const preloaderRef = useRef<FramePreloader | null>(null);

  useEffect(() => {
    if (shouldSkipCanvas) {
      const timeoutId = window.setTimeout(() => setShowLoader(false), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const loaderTimeout = window.setTimeout(() => {
      setLoadingProgress(100);
      setShowLoader(false);
    }, 2200);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup tiered preloader callbacks
    const preloader = new FramePreloader(
      CANVAS_CONFIG.totalFrames,
      (index) => {
        // Update loading progress for initial Tier 1 (Hero) frames
        if (index <= 25) {
          setLoadingProgress((prev) => {
            const next = Math.min(100, prev + 100 / 26);
            if (next >= 99) {
              // Gracefully fade loader out
              setTimeout(() => setShowLoader(false), 300);
            }
            return next;
          });
        }
      },
      () => {
        if (showLoader) {
          setLoadingProgress(100);
          window.setTimeout(() => setShowLoader(false), 250);
        }
        console.log("[Canvas] Preloading completed or timed out.");
      }
    );

    preloaderRef.current = preloader;
    preloader.startPreload(CANVAS_CONFIG.framePath);

    let animationFrameId: number;

    const renderLoop = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollableHeight = scrollHeight - clientHeight;

      const scrollRatio = totalScrollableHeight > 0 ? scrollTop / totalScrollableHeight : 0;
      
      // Calculate target frame matching current scroll ratio
      const targetFrame = Math.round(scrollRatio * (CANVAS_CONFIG.totalFrames - 1));
      targetFrameRef.current = targetFrame;

      // Linear interpolation (lerp) for smooth frame scrubbing
      const frameDelta = targetFrameRef.current - frameRef.current;
      frameRef.current += frameDelta * 0.15; // Smooth scrubbing coefficient

      const currentFrameIndex = Math.round(frameRef.current);
      const img = preloader.getImage(currentFrameIndex);

      if (ctx && img) {
        drawImageCover(ctx, img);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      const currentFrameIndex = Math.round(frameRef.current);
      const img = preloader.getImage(currentFrameIndex);
      if (ctx && img) {
        drawImageCover(ctx, img);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(loaderTimeout);
      preloader.destroy();
    };
  }, [shouldSkipCanvas]);

  // Mobile, low-power, or reduced-motion fallback
  if (shouldSkipCanvas) {
    return (
      <div
        className="fixed inset-0 w-full h-full bg-[#030303] -z-10 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${CANVAS_CONFIG.framePath(0)})`,
        }}
      />
    );
  }

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#030303] z-[9999] transition-opacity duration-500 ease-out">
          <div className="text-xs font-sans tracking-[0.2em] text-white uppercase mb-4 select-none">
           Durel KOEHLER
          </div>
          <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none block will-change-transform"
      />
    </>
  );
}
