import React, { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const spacing = 45;
      const mouse = mouseRef.current;
      const influenceRadius = 300;
      const distortion = 15;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      // Draw Vertical Lines
      for (let x = 0; x <= canvas.width + spacing; x += spacing) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height + spacing; y += 10) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let offsetX = 0;
          if (dist < influenceRadius) {
            const force = (1 - dist / influenceRadius);
            offsetX = (dx / dist) * force * distortion;
          }

          if (y === 0) ctx.moveTo(x + offsetX, y);
          else ctx.lineTo(x + offsetX, y);
        }
        ctx.stroke();
      }

      // Draw Horizontal Lines
      for (let y = 0; y <= canvas.height + spacing; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width + spacing; x += 10) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let offsetY = 0;
          if (dist < influenceRadius) {
            const force = (1 - dist / influenceRadius);
            offsetY = (dy / dist) * force * distortion;
          }

          if (x === 0) ctx.moveTo(x, y + offsetY);
          else ctx.lineTo(x, y + offsetY);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
