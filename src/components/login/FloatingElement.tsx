import type { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 3, 
  x = 0, 
  y = 0 
}: FloatingElementProps) {
  return (
    <div 
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}
