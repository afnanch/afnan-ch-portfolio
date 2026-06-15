import { useEffect, useState } from "react";

export default function GlowEffect() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is desktop
    const checkViewport = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);

    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", checkViewport);
      };
    }
    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#0A0A0A] select-none">
      {/* 1. Subtle Background Grid & Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.7px, transparent 0.7px)`,
          backgroundSize: "24px 24px"
        }}
      />

      {/* 2. Floating Ambient Luxury Blurs (Gradient Blobs) */}
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse duration-[8s]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-400/10 blur-[130px] animate-pulse duration-[10s]" />
      <div className="absolute top-[40%] right-[25%] w-[350px] h-[350px] rounded-full bg-emerald-600/5 blur-[100px]" />

      {/* 3. Mouse-Following Glow Ring (Only on Desktop) */}
      {!isMobile && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full point-events-none transition-transform duration-150 ease-out"
          style={{
            transform: `translate3d(${position.x - 300}px, ${position.y - 300}px, 0)`,
            background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, rgba(0,200,83,0.01) 50%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
