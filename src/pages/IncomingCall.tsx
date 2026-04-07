import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneOff } from "lucide-react";
import { Phone } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import { MOCK_USERS } from "@/types/maato";

const IncomingCall: React.FC = () => {
  const navigate = useNavigate();
  const caller = MOCK_USERS[2];
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    console.log("IncomingCall — from:", caller.nickname, "— timer started");
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          navigate("/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate, caller.nickname]);

  const handleAccept = () => {
    console.log("Call accepted from:", caller.nickname);
    navigate("/voice-call");
  };

  const handleReject = () => {
    console.log("Call rejected from:", caller.nickname);
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-16 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(22, 10, 55, 1) 0%, rgba(12, 8, 28, 1) 100%)",
      }}
    >
      {/* Decorative rings */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 120 + ring * 90,
            height: 120 + ring * 90,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -65%)",
            border: `1px solid ${caller.avatarColor.replace("1)", `${0.4 / ring})`)}`,
            animation: `pulseRing 2.5s ease-in-out ${ring * 0.35}s infinite`,
          }}
        />
      ))}

      {/* Top */}
      <div className="flex flex-col items-center gap-2 z-10 mt-6">
        <p
          className="text-sm font-medium px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(52, 35, 95, 1)",
            color: "rgba(196, 166, 255, 1)",
          }}
        >
          Incoming voice call 🎤
        </p>
        <p className="text-xs text-muted-foreground">Auto-decline in {timeLeft}s</p>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-5 z-10">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: caller.avatarColor,
              filter: "blur(30px)",
              transform: "scale(1.4)",
              opacity: 0.4,
            }}
          />
          <AvatarDisplay
            seed={caller.avatarSeed}
            color={caller.avatarColor}
            size={130}
            showOnline={false}
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">{caller.nickname}</h2>
          <p className="text-muted-foreground">{caller.city} · {caller.language}</p>
        </div>
      </div>

      {/* Accept / Reject */}
      <div className="flex items-center gap-16 z-10">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleReject}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "2px solid rgba(239, 68, 68, 0.5)",
              boxShadow: "0 4px 24px rgba(239, 68, 68, 0.3)",
            }}
          >
            <PhoneOff size={30} style={{ color: "rgba(239, 68, 68, 1)" }} />
          </button>
          <span className="text-sm text-muted-foreground">Decline</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleAccept}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(16, 185, 129, 1) 100%)",
              boxShadow: "0 4px 30px rgba(52, 211, 153, 0.6)",
            }}
          >
            <Phone size={30} className="text-white" />
          </button>
          <span className="text-sm font-semibold text-foreground">Accept</span>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;