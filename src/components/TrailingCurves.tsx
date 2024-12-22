'use client'
import React, { useEffect, useRef,  } from 'react';

interface Point {
  x: number;
  y: number;
  amplitude: number;
  speed: number;
}

interface TrailingCurvesProps {
  numCurves?: number;
  pointsPerCurve?: number;
  baseColor?: string;
  speed?: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const TrailingCurves: React.FC<TrailingCurvesProps> = ({
  numCurves = 8,
  pointsPerCurve = 25,
  baseColor = 'rgba(37, 99, 235, 0.15)',
  speed = 1000
}): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Add device detection
    const getDeviceConfig = (): { curves: number, points: number } => {
      const width = window.innerWidth;
      if (width < 480) {  // Mobile
        return { curves: 4, points: 15 };
      } else if (width < 768) {  // Tablet
        return { curves: 6, points: 20 };
      } else {  // Desktop
        return { curves: numCurves, points: pointsPerCurve };
      }
    };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let curves: Point[][] = [];
    let mousePosition: MousePosition = { x: 0, y: 0 };
    let isInteracting = false;

    const handleInteractionStart = (e: MouseEvent | TouchEvent): void => {
      isInteracting = true;
      const event = 'touches' in e ? e.touches[0] : e;
      mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    const handleInteractionMove = (e: MouseEvent | TouchEvent): void => {
      if (!isInteracting) return;
      const event = 'touches' in e ? e.touches[0] : e;
      mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    const handleInteractionEnd = (): void => {
      isInteracting = false;
    };

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recalculate curves based on new dimensions
      const { curves: curveCount, points } = getDeviceConfig();
      curves = Array(curveCount).fill(null).map(() => generateRandomPoints(points));
    };

    // Update generateRandomPoints to accept dynamic point count
    const generateRandomPoints = (pointCount: number): Point[] => {
      const points: Point[] = [];
      let x = 0;
      const step = canvas.width / pointCount;

      for (let i = 0; i < pointCount; i++) {
        points.push({
          x,
          y: Math.random() * canvas.height,
          amplitude: Math.random() * (window.innerWidth < 768 ? 1 : 2) + 1,
          speed: Math.random() * 0.002 + 0.001
        });
        x += step;
      }
      return points;
    };

    // this function is for the glowing effect
    const drawSmoothCurve = (points: Point[], index: number): void => {
      // Add shadow for glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(37, 99, 235, 0.6)';
      ctx.lineWidth = 2;

       // First pass - core line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const cpX = (points[i].x + points[i + 1].x) / 2;
        const cpY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
      }

      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      // Create gradient with dark blue tones
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, `rgba(37, 99, 235, ${0.3 - index * 0.02})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.2 - index * 0.02})`);
      gradient.addColorStop(1, `rgba(96, 165, 250, ${0.1 - index * 0.02})`);

      ctx.strokeStyle = gradient;
      ctx.stroke();
     
      // Second pass - glowing line
      ctx.shadowBlur = 25;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';
      ctx.stroke();
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      curves.forEach((curve, index) => {
        curve.forEach(point => {
          if (isInteracting) {
            const dx = mousePosition.x - point.x;
            const dy = mousePosition.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
              const angle = Math.atan2(dy, dx);
              const force = (200 - distance) / 200;
              point.x += Math.cos(angle) * force * 2;
              point.y += Math.sin(angle) * force * 2;
            }
          }
    
          point.y += Math.sin(Date.now() * point.speed) * point.amplitude;
          point.x += Math.cos(Date.now() * point.speed * 0.5) * 0.5;
    
          if (point.y > canvas.height) point.y = 0;
          if (point.y < 0) point.y = canvas.height;
          if (point.x > canvas.width) point.x = 0;
          if (point.x < 0) point.x = canvas.width;
        });
        drawSmoothCurve(curve, index);
      });
    
      animationFrameId = requestAnimationFrame(animate);
    };

    const debouncedResize = debounce(handleResize, 250);
    
    // Initialize with device-specific settings
    handleResize();
    animate();

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', handleResize);
    canvas.addEventListener('mousemove', handleInteractionMove);
    canvas.addEventListener('mouseenter', handleInteractionStart);
    canvas.addEventListener('mouseleave', handleInteractionEnd);
    canvas.addEventListener('touchstart', handleInteractionStart);
    canvas.addEventListener('touchmove', handleInteractionMove);
    canvas.addEventListener('touchend', handleInteractionEnd);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
      canvas.removeEventListener('mousemove', handleInteractionMove);
      canvas.removeEventListener('mouseenter', handleInteractionStart);
      canvas.removeEventListener('mouseleave', handleInteractionEnd);
      canvas.removeEventListener('touchstart', handleInteractionStart);
      canvas.removeEventListener('touchmove', handleInteractionMove);
      canvas.removeEventListener('touchend', handleInteractionEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [numCurves, pointsPerCurve, baseColor, speed]);

  return (
    <canvas
    ref={canvasRef}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'transparent',
      pointerEvents: 'auto', // Changed from 'none' to 'auto'
      zIndex: -1,
      touchAction: 'none'
    } as React.CSSProperties}
    />
  );
};
// Utility function for resize debouncing
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default TrailingCurves;
