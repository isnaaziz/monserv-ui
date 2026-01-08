import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current.toFixed(value.includes('.') ? 1 : 0));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{displayValue}{suffix}</span>;
}
