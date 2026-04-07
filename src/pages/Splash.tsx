import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Splash screen mounted — redirecting to login in 2.5s");
    const timer = setTimeout(() => navigate("/login"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(12, 8, 28, 1) 0%, rgba(45, 15, 90, 1) 50%, rgba(12, 8, 28, 1) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          width: 340,
          height: 340,
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full opacity-10"
        style={{
          width: 260,
          height: 260,
          background: "radial-gradient(circle, rgba(255, 107, 74, 0.8) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="flex flex-col items-center gap-6 float-anim z-10">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(236, 72, 153, 1) 100%)",
            boxShadow: "0 0 50px rgba(139, 92, 246, 0.6)",
          }}
        >
          <Mic size={46} className="text-white" />
        </div>
        <div className="text-center">
          <h1
            className="text-5xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, rgba(196, 166, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 160, 130, 1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MAATO
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Talk. Connect. Vibe. ✨
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "rgba(139, 92, 246, 1)",
              animation: `waveBar 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Splash;