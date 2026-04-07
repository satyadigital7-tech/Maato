import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const OtpVerify: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const t = setInterval(() => setTimer((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleOtpChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    if (value && idx < 3) inputRefs.current[idx + 1]?.focus();
    if (newOtp.every((d) => d !== "")) {
      console.log("OTP complete:", newOtp.join(""), "— navigating to profile setup");
      setTimeout(() => navigate("/profile-setup"), 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-14 pb-10 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 1) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="z-10 flex-1">
        <button
          onClick={() => navigate("/login")}
          className="text-muted-foreground text-sm mb-10 flex items-center gap-1"
        >
          ← Back
        </button>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "rgba(52, 35, 95, 1)" }}
        >
          <ShieldCheck size={32} style={{ color: "rgba(139, 92, 246, 1)" }} />
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-2">Enter OTP</h2>
        <p className="text-muted-foreground mb-10">
          Sent to your mobile number
        </p>

        {/* OTP inputs */}
        <div className="flex gap-4 mb-10 justify-center">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-16 h-16 text-center text-2xl font-bold rounded-2xl border-2 outline-none transition-all"
              style={{
                background: "rgba(26, 18, 52, 1)",
                borderColor: digit ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
                color: "rgba(248, 245, 255, 1)",
                boxShadow: digit ? "0 0 16px rgba(139, 92, 246, 0.3)" : "none",
              }}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {timer > 0 ? (
            <span className="text-muted-foreground text-sm">
              Resend OTP in{" "}
              <span style={{ color: "rgba(139, 92, 246, 1)" }}>{timer}s</span>
            </span>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-sm font-semibold"
              style={{ color: "rgba(139, 92, 246, 1)" }}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Demo shortcut */}
        <button
          onClick={() => navigate("/profile-setup")}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.45)",
          }}
        >
          Verify & Continue →
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;