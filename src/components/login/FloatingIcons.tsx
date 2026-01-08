import { Server, Cpu, Database, Wifi, Cloud, Zap, HardDrive, Globe } from 'lucide-react';
import { FloatingElement } from './FloatingElement';

interface FloatingIconsProps {
  mousePosition: { x: number; y: number };
}

export function FloatingIcons({ mousePosition }: FloatingIconsProps) {
  return (
    <>
      <FloatingElement x={10} y={20} delay={0} duration={4}>
        <div 
          className="bg-zinc-800/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-zinc-700/50"
          style={{ 
            animation: 'glow 3s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
          }}
        >
          <Server className="size-8 text-emerald-400" style={{ animation: 'spin3d 8s linear infinite' }} />
        </div>
      </FloatingElement>

      <FloatingElement x={75} y={15} delay={0.5} duration={5}>
        <div 
          className="bg-zinc-800/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-zinc-700/50"
          style={{ transform: `translate(${mousePosition.x * -0.15}px, ${mousePosition.y * 0.15}px)` }}
        >
          <Cpu className="size-6 text-emerald-400" style={{ animation: 'spin3d 10s linear infinite reverse' }} />
        </div>
      </FloatingElement>

      <FloatingElement x={85} y={45} delay={1} duration={4.5}>
        <div 
          className="bg-zinc-800/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-zinc-700/50"
          style={{ 
            animation: 'glow 4s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 0.25}px, ${mousePosition.y * -0.2}px)`,
          }}
        >
          <Database className="size-5 text-emerald-400" />
        </div>
      </FloatingElement>

      <FloatingElement x={5} y={60} delay={1.5} duration={3.5}>
        <div 
          className="bg-zinc-800/50 backdrop-blur-md rounded-full p-4 shadow-lg border border-zinc-700/50"
          style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * 0.25}px)` }}
        >
          <Wifi className="size-6 text-emerald-400 animate-pulse" />
        </div>
      </FloatingElement>

      <FloatingElement x={60} y={70} delay={2} duration={5}>
        <div 
          className="bg-zinc-800/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-zinc-700/50"
          style={{ transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * -0.15}px)` }}
        >
          <Cloud className="size-7 text-emerald-400" style={{ animation: 'wave 3s ease-in-out infinite' }} />
        </div>
      </FloatingElement>

      <FloatingElement x={25} y={80} delay={0.8} duration={4}>
        <div 
          className="bg-zinc-800/70 backdrop-blur-md rounded-xl p-3 shadow-lg border border-emerald-500/30"
          style={{ animation: 'glow 2s ease-in-out infinite' }}
        >
          <Zap className="size-5 text-emerald-300" />
        </div>
      </FloatingElement>

      <FloatingElement x={90} y={75} delay={1.2} duration={4.5}>
        <div 
          className="bg-zinc-800/50 backdrop-blur-md rounded-xl p-3 shadow-lg border border-zinc-700/50"
          style={{ transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * 0.1}px)` }}
        >
          <HardDrive className="size-5 text-emerald-400" />
        </div>
      </FloatingElement>

      <FloatingElement x={40} y={10} delay={0.3} duration={5.5}>
        <div 
          className="bg-zinc-800/60 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-zinc-700/50"
          style={{ transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.2}px)` }}
        >
          <Globe className="size-6 text-emerald-400" style={{ animation: 'spin3d 12s linear infinite' }} />
        </div>
      </FloatingElement>
    </>
  );
}

export function OrbitingElement() {
  return (
    <div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ animation: 'orbit 15s linear infinite' }}
    >
      <div className="bg-emerald-500/30 backdrop-blur-sm rounded-full p-2 border border-emerald-500/50">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
