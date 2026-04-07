import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Shield, Flag, ChevronLeft, Gift } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import LanguageTag from "@/components/LanguageTag";
import CallButton from "@/components/CallButton";
import { MOCK_USERS } from "@/types/maato";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const user = MOCK_USERS[0];

  console.log("UserProfile page — viewing user:", user.nickname);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, ${user.avatarColor.replace("1)", "0.3)")} 0%, transparent 100%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-border"
          style={{ background: "rgba(26, 18, 52, 0.8)" }}
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs text-muted-foreground"
          style={{ background: "rgba(26, 18, 52, 0.8)" }}
        >
          <Flag size={13} />
          Report
        </button>
      </div>

      {/* Avatar + Info */}
      <div className="flex flex-col items-center pt-4 pb-6 px-6 relative z-10">
        <div className="relative mb-4">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: user.avatarColor,
              filter: "blur(20px)",
              transform: "scale(1.2)",
              opacity: 0.5,
            }}
          />
          <AvatarDisplay
            seed={user.avatarSeed}
            color={user.avatarColor}
            size={100}
            isOnline={user.isOnline}
            showOnline={true}
          />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-1">{user.nickname}</h2>
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={13} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{user.city}</span>
          <LanguageTag language={user.language} />
        </div>

        {user.isOnline ? (
          <div
            className="px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(52, 211, 153, 0.15)",
              color: "rgba(52, 211, 153, 1)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
            }}
          >
            🟢 Online — Tap to talk!
          </div>
        ) : (
          <div
            className="px-4 py-1.5 rounded-full text-sm"
            style={{
              background: "rgba(52, 35, 95, 1)",
              color: "rgba(180, 160, 220, 1)",
            }}
          >
            ⚫ Offline
          </div>
        )}
      </div>

      {/* Interests */}
      <div className="px-5 mb-6 relative z-10">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: "rgba(52, 35, 95, 1)",
                color: "rgba(196, 166, 255, 1)",
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Coins */}
      <div className="px-5 mb-8 relative z-10">
        <div
          className="flex items-center justify-between p-4 rounded-2xl border border-border"
          style={{ background: "rgba(26, 18, 52, 0.8)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <div className="text-sm text-muted-foreground">Coins Earned</div>
              <div className="text-xl font-bold text-foreground">{user.coins}</div>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, rgba(251, 191, 36, 1) 0%, rgba(245, 158, 11, 1) 100%)",
              color: "rgba(12, 8, 28, 1)",
            }}
          >
            <Gift size={15} />
            Send Gift
          </button>
        </div>
      </div>

      {/* Call button */}
      <div className="px-5 relative z-10">
        <button
          onClick={() => navigate("/voice-call")}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
            boxShadow: "0 8px 32px rgba(139, 92, 246, 0.5)",
          }}
        >
          🎤 Start Voice Call
        </button>

        <button
          className="w-full py-3 rounded-2xl font-medium text-sm mt-3 flex items-center justify-center gap-2"
          style={{ color: "rgba(180, 160, 220, 1)" }}
        >
          <Shield size={15} />
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserProfile;