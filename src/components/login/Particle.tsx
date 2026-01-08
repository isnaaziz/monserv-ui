interface ParticleProps {
  size?: number;
  x?: number;
  y?: number;
  delay?: number;
}

export function Particle({ size = 4, x = 0, y = 0, delay = 0 }: ParticleProps) {
  const driftDuration = 8 + Math.random() * 4;
  
  return (
    <div 
      className="absolute rounded-full bg-emerald-500/40"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animation: `pulseGlow 2s ease-in-out ${delay}s infinite, drift ${driftDuration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}
