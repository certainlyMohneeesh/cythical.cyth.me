"use client";

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { useTheme } from "next-themes";

interface ContricReactionProps {
  /**
   * Number of concentric circles to display
   * @default 5
   */
  circleCount?: number;
  
  /**
   * Base size of the largest circle in pixels
   * @default 100
   */
  maxSize?: number;
  
  /**
   * Color of the circles
   * @default 'rgba(0, 0, 255, 0.3)'
   */
  color?: string;
  
  /**
   * Speed of the rotation animation
   * @default 1
   */
  rotationSpeed?: number;
  
  /**
   * Whether to follow the mouse pointer
   * @default true
   */
  followPointer?: boolean;
  
  /**
   * Delay in milliseconds for the follow effect
   * @default 100
   */
  followDelay?: number;
  
  /**
   * Whether to enable the pulsing effect
   * @default true
   */
  enablePulse?: boolean;
  /**
   * Responsiveness factor (higher = closer to real cursor). Range 0.05 - 1.
   * @default 0.6
   */
  responsiveness?: number;
}

const ContricReaction: React.FC<ContricReactionProps> = ({
  circleCount = 3,
  maxSize = 100,
  color: colorProp,
  rotationSpeed = 10,
  followPointer = true,
  followDelay = 100,
  enablePulse = true,
  responsiveness = 0.6,
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Determine ring color based on theme unless explicitly provided
  const ringColor = colorProp ?? (resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)');
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!followPointer) return;
      targetPos.current = { x: event.clientX, y: event.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    // Smooth, distance-aware interpolation using rAF
    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      setMousePosition((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        const dist = Math.hypot(dx, dy);
        // Dynamic smoothing: larger distance => faster catch-up
        const base = Math.min(1, Math.max(0.05, responsiveness));
        const speedBoost = Math.min(0.9, dist / 500); // up to +0.9 when far
        const t = base + speedBoost; // final interpolation factor
        return {
          x: lerp(prev.x, targetPos.current.x, t),
          y: lerp(prev.y, targetPos.current.y, t),
        };
      });
      rafId.current = window.requestAnimationFrame(animate);
    };

    rafId.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [followPointer, followDelay, isVisible, responsiveness]);
  
  // Generate circles
  const renderCircles = () => {
    const circles = [];
    
    for (let i = 0; i < circleCount; i++) {
      const size = maxSize - (i * (maxSize / circleCount));
      const opacity = 0.8 - (i * (0.6 / circleCount));
      const rotationDirection = i % 2 === 0 ? 1 : -1;
      const rotationDuration = 10 - (i * (5 / circleCount)) / rotationSpeed;
      const pulseScale = enablePulse ? 1.1 : 1;
      
      const circleStyle: CSSProperties = {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `2px solid ${ringColor}`,
        backgroundColor: 'transparent',
        opacity: opacity,
        transform: 'translate(-50%, -50%)',
        animation: `${enablePulse ? 'pulse' : ''} ${rotationDuration}s infinite ${rotationDirection > 0 ? 'linear' : 'reverse'}`,
      };
      
      circles.push(
        <div
          key={i}
          className="circle"
          style={circleStyle}
        />
      );
    }
    
    return circles;
  };
  
  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  zIndex: 20,
    overflow: 'hidden',
  };
  
  const circlesContainerStyle: CSSProperties = {
    position: 'absolute',
    top: mousePosition.y,
    left: mousePosition.x,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };
  
  if (!mounted) return null; // avoid theme-hydration mismatch

  return (
    <div ref={containerRef} style={containerStyle}>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg) scale(${enablePulse ? 1.1 : 1});
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) scale(1);
          }
        }
      `}</style>
      <div style={circlesContainerStyle}>
        {renderCircles()}
      </div>
    </div>
  );
};

export default ContricReaction;