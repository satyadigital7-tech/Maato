import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { INTERESTS, LANGUAGES, AVATAR_COLORS } from "@/types/maato";

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"avatar" | "info" | "interests">("avatar");
  const [nickname, setNickname] = useState("");
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);
  const [selectedLang, setSelectedLang] = useState("hi");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  console.log("ProfileSetup — step:", step);

  const initials = nickname ? nickname.slice(0, 2).toUpperCase() : "ME";

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFinish = () => {
    console.log("Profile setup complete — going to home");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 pt-12 pb-10 relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-60 h-60 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 107, 74, 1) 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      {/* Progress */}
      <div className="flex gap-2 mb-8 z-10">
        {(["avatar", "info", "interests"] as const).map((s, i) => (
          <div
            key={s}
            className="flex-1 h-1.5 rounded-full transition-all"
            style={{
              background:
                i <= ["avatar", "info", "interests"].indexOf(step)
                  ? "rgba(139, 92, 246, 1)"
                  : "rgba(52, 35, 95, 1)",
            }}
          />
        ))}
      </div>

      {step === "avatar" && (
        <div className="z-10 flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-foreground mb-1">Pick your</h2>
          <h2 className="text-3xl font-bold mb-8" style={{ color: "rgba(139, 92, 246, 1)" }}>
            avatar color 🎨
          </h2>

          {/* Big avatar preview */}
          <div className="flex justify-center mb-8">
            <div
              className="w-32 h-32 rounded-3xl flex items-center justify-center text-4xl font-black text-white float-anim"
              style={{
                background: selectedColor,
                boxShadow: `0 0 50px ${selectedColor.replace("1)", "0.6)")}`,
              }}
            >
              {initials}
            </div>
          </div>

          {/* Color grid */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {AVATAR_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="w-14 h-14 rounded-2xl transition-transform active:scale-90"
                style={{
                  background: color,
                  boxShadow:
                    selectedColor === color
                      ? `0 0 20px ${color.replace("1)", "0.7)")}`
                      : "none",
                  transform: selectedColor === color ? "scale(1.15)" : "scale(1)",
                  outline: selectedColor === color ? `3px solid rgba(255,255,255,0.6)` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setStep("info")}
            className="mt-auto w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.45)",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {step === "info" && (
        <div className="z-10 flex-1 flex flex-col">
          <button onClick={() => setStep("avatar")} className="text-muted-foreground text-sm mb-6 flex items-center gap-1">
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-foreground mb-1">Your</h2>
          <h2 className="text-3xl font-bold mb-8" style={{ color: "rgba(139, 92, 246, 1)" }}>
            nickname 😊
          </h2>

          <div
            className="rounded-2xl border px-4 py-4 mb-6"
            style={{ background: "rgba(26, 18, 52, 1)", borderColor: "rgba(80, 55, 140, 0.4)" }}
          >
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="What should we call you?"
              maxLength={20}
              className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-lg font-medium"
            />
          </div>

          <h3 className="text-base font-semibold text-foreground mb-3">App language</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border"
                style={{
                  background: selectedLang === lang.code ? "rgba(139, 92, 246, 0.2)" : "rgba(26, 18, 52, 1)",
                  borderColor: selectedLang === lang.code ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
                  color: selectedLang === lang.code ? "rgba(196, 166, 255, 1)" : "rgba(180, 160, 220, 1)",
                }}
              >
                <span>{lang.emoji}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep("interests")}
            disabled={!nickname.trim()}
            className="mt-auto w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.45)",
            }}
          >
            Next →
          </button>
        </div>
      )}

      {step === "interests" && (
        <div className="z-10 flex-1 flex flex-col">
          <button onClick={() => setStep("info")} className="text-muted-foreground text-sm mb-6 flex items-center gap-1">
            ← Back
          </button>
          <h2 className="text-3xl font-bold text-foreground mb-1">Your</h2>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "rgba(139, 92, 246, 1)" }}>
            interests 🎯
          </h2>
          <p className="text-muted-foreground text-sm mb-6">Pick at least 2</p>

          <div className="flex flex-wrap gap-2.5 mb-8 flex-1">
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className="px-4 py-2.5 rounded-full text-sm font-medium transition-all border"
                  style={{
                    background: isSelected ? "rgba(139, 92, 246, 0.2)" : "rgba(26, 18, 52, 1)",
                    borderColor: isSelected ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
                    color: isSelected ? "rgba(196, 166, 255, 1)" : "rgba(180, 160, 220, 1)",
                  }}
                >
                  {isSelected && <Check size={12} className="inline mr-1" />}
                  {interest}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleFinish}
            disabled={selectedInterests.length < 2}
            className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(236, 72, 153, 1) 100%)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.45)",
            }}
          >
            Start Talking 🎤
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSetup;