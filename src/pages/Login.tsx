import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, ChevronRight, Phone } from "lucide-react";
import { LANGUAGES } from "@/types/maato";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState("hi");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"lang" | "phone">("lang");

  console.log("Login page — step:", step);

  const handleLangContinue = () => setStep("phone");

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    console.log("Sending OTP to:", phone);
    navigate("/otp", { state: { phone, lang: selectedLang } });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-14 pb-10 relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 1) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-10 z-10">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(236, 72, 153, 1) 100%)" }}
        >
          <Mic size={22} className="text-white" />
        </div>
        <span
          className="text-2xl font-black"
          style={{
            background: "linear-gradient(135deg, rgba(196, 166, 255, 1), rgba(255, 255, 255, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MAATO
        </span>
      </div>

      {step === "lang" ? (
        <div className="z-10 flex-1">
          <h2 className="text-3xl font-bold text-foreground mb-2">Choose your</h2>
          <h2 className="text-3xl font-bold mb-8" style={{ color: "rgba(139, 92, 246, 1)" }}>
            language 🌍
          </h2>

          <div className="flex flex-col gap-3 mb-10">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
                  style={{
                    background: isSelected ? "rgba(139, 92, 246, 0.15)" : "rgba(26, 18, 52, 1)",
                    borderColor: isSelected ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
                    boxShadow: isSelected ? "0 0 20px rgba(139, 92, 246, 0.25)" : "none",
                  }}
                >
                  <span className="text-2xl">{lang.emoji}</span>
                  <div>
                    <div className="font-semibold text-foreground">{lang.label}</div>
                    <div className="text-sm text-muted-foreground">{lang.native}</div>
                  </div>
                  {isSelected && (
                    <div
                      className="ml-auto w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(139, 92, 246, 1)" }}
                    >
                      <ChevronRight size={14} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLangContinue}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.45)",
            }}
          >
            Continue →
          </button>
        </div>
      ) : (
        <div className="z-10 flex-1">
          <button
            onClick={() => setStep("lang")}
            className="text-muted-foreground text-sm mb-8 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-foreground mb-2">Your phone</h2>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "rgba(139, 92, 246, 1)" }}>
            number 📱
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            We will send an OTP to verify your number
          </p>

          <div
            className="flex items-center gap-3 rounded-2xl border px-4 py-4 mb-6"
            style={{
              background: "rgba(26, 18, 52, 1)",
              borderColor: phone.length >= 10 ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
            }}
          >
            <div className="flex items-center gap-2 flex-shrink-0">
              <Phone size={18} style={{ color: "rgba(139, 92, 246, 1)" }} />
              <span className="text-muted-foreground font-medium">+91</span>
              <div
                className="w-px h-5"
                style={{ background: "rgba(80, 55, 140, 0.6)" }}
              />
            </div>
            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="10-digit mobile number"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
            />
          </div>

          <button
            onClick={handleSendOtp}
            disabled={phone.length < 10}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
              boxShadow: phone.length >= 10 ? "0 8px 32px rgba(139, 92, 246, 0.45)" : "none",
            }}
          >
            Send OTP →
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;