"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function ContricShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      if (!ctx || !canvas) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Clear with a slight fade for trail effect or just clear
      ctx.clearRect(0, 0, width, height);
      
      // Theme-based colors
      const isDark = resolvedTheme === "dark";
      const baseColor = isDark ? 255 : 0; // White or Black base
      const opacityBase = isDark ? 0.05 : 0.08;
      
      const numRings = 15;
      const maxRadius = Math.max(width, height) * 0.8;
      
      for (let i = 0; i < numRings; i++) {
        const progress = i / numRings;
        const radius = (maxRadius * progress) + (Math.sin(time * 0.5 + progress * 5) * 20);
        
        ctx.beginPath();
        
        // Distorted circle
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const xOff = Math.cos(a) * radius;
          const yOff = Math.sin(a) * radius;
          
          // Noise/Wave effect
          const noise = Math.sin(a * 5 + time + progress * 10) * 10 * (1 - progress);
          
          ctx.lineTo(centerX + xOff + noise, centerY + yOff + noise);
        }
        
        ctx.closePath();
        
        // Stroke
        ctx.strokeStyle = `rgba(${baseColor}, ${baseColor}, ${baseColor}, ${opacityBase + (Math.sin(time + i) * 0.02)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Optional: Fill
        // ctx.fillStyle = `rgba(${baseColor}, ${baseColor}, ${baseColor}, ${opacityBase * 0.5})`;
        // ctx.fill();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
