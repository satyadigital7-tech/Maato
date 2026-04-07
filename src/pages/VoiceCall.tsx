import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Volume2, VolumeX, PhoneOff, Gift } from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import WaveAnimation from "@/components/WaveAnimation";
import { MOCK_USERS } from "@/types/maato";

const GIFTS = [
  { id: "1", emoji: "🌹", name: "Rose", coins: 10 },
  { id: "2", emoji: "💎", name: "Diamond", coins: 100 },
  { id: "3", emoji: "🎂", name: "Cake", coins: 25 },
  { id: "4", emoji: "⭐", name: "Star", coins: 50 },
  { id: "5", emoji: "🎁", name: "Gift", coins: 30 },
  { id: "6", emoji: "🏆", name: "Trophy", coins: 200 },
];

const VoiceCall: React.FC = () => {
  const navigate = useNavigate();
  const remoteUser = MOCK_USERS[2];
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [showGifts, setShowGifts] = useState(false);
  const [sentGift, setSentGift] = useState<string | null>(null);

  useEffect(() => {
    console.log("VoiceCall started with:", remoteUser.nickname);
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [remoteUser.nickname]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleSendGift = (gift: typeof GIFTS[0]) => {
    console.log("Gift sent:", gift.name, "— cost:", gift.coins, "coins");
    setSentGift(gift.emoji);
    setShowGifts(false);
    setTimeout(() => setSentGift(null), 2500);
  };

  const handleEndCall = () => {
    console.log("Call ended — duration:", formatTime(seconds));
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${remoteUser.avatarColor.replace("1)", "0.35)")} 0%, rgba(12, 8, 28, 1) 40%)`,
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-10">
        <div
          className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
          style={{
            background: "rgba(52, 211, 153, 0.15)",
            color: "rgba(52, 211, 153, 1)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(52, 211, 153, 1)", animation: "pulseRing 1.5s infinite" }}
          />
          {formatTime(seconds)}
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs"
          style={{
            background: "rgba(52, 35, 95, 1)",
            color: "rgba(196, 166, 255, 1)",
          }}
        >
          🔒 Secure call
        </div>
      </div>

      {/* Remote user */}
      <div className="flex flex-col items-center pt-4 pb-6 px-6 relative z-10">
        <div className="relative mb-4">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: remoteUser.avatarColor,
              filter: "blur(28px)",
              transform: "scale(1.3)",
              opacity: 0.45,
            }}
          />
          <AvatarDisplay
            seed={remoteUser.avatarSeed}
            color={remoteUser.avatarColor}
            size={110}
            isOnline={true}
            showOnline={false}
          />
          {/* Flying gift */}
          {sentGift && (
            <div
              className="absolute -top-4 -right-4 text-4xl"
              style={{ animation: "float 0.5s ease-out forwards" }}
            >
              {sentGift}
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">{remoteUser.nickname}</h2>
        <p className="text-muted-foreground text-sm">{remoteUser.city}</p>
      </div>

      {/* Wave animation */}
      <div className="flex justify-center mb-6 relative z-10">
        <WaveAnimation
          color={isMuted ? "rgba(80, 55, 140, 0.5)" : remoteUser.avatarColor}
          barCount={7}
          height={52}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Gift panel */}
      {showGifts && (
        <div
          className="mx-4 mb-4 rounded-2xl p-4 border border-border z-20"
          style={{ background: "rgba(26, 18, 52, 0.97)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">Send a Gift 🎁</span>
            <button
              onClick={() => setShowGifts(false)}
              className="text-muted-foreground text-xs"
            >
              Close
            </button>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {GIFTS.map((gift) => (
              <button
                key={gift.id}
                onClick={() => handleSendGift(gift)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all active:scale-90"
                style={{ background: "rgba(52, 35, 95, 1)" }}
              >
                <span className="text-2xl">{gift.emoji}</span>
                <span className="text-xs text-muted-foreground">{gift.name}</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: "rgba(251, 191, 36, 1)" }}
                >
                  🪙{gift.coins}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className="mx-4 mb-6 p-5 rounded-3xl border border-border z-10"
        style={{ background: "rgba(26, 18, 52, 0.9)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-around mb-5">
          {/* Mute */}
          <button
            onClick={() => {
              setIsMuted((m) => !m);
              console.log("Mute toggled:", !isMuted);
            }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
              style={{
                background: isMuted ? "rgba(239, 68, 68, 0.2)" : "rgba(52, 35, 95, 1)",
                border: isMuted ? "1px solid rgba(239, 68, 68, 0.5)" : "1px solid rgba(80, 55, 140, 0.4)",
              }}
            >
              {isMuted ? (
                <MicOff size={22} style={{ color: "rgba(239, 68, 68, 1)" }} />
              ) : (
                <Mic size={22} className="text-foreground" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">{isMuted ? "Unmute" : "Mute"}</span>
          </button>

          {/* End call */}
          <button
            onClick={handleEndCall}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{
                width: 68,
                height: 68,
                background: "linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(185, 28, 28, 1) 100%)",
                boxShadow: "0 4px 24px rgba(239, 68, 68, 0.55)",
              }}
            >
              <PhoneOff size={28} className="text-white" />
            </div>
            <span className="text-xs text-muted-foreground">End Call</span>
          </button>

          {/* Speaker */}
          <button
            onClick={() => {
              setIsSpeaker((s) => !s);
              console.log("Speaker toggled:", !isSpeaker);
            }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
              style={{
                background: isSpeaker ? "rgba(139, 92, 246, 0.2)" : "rgba(52, 35, 95, 1)",
                border: isSpeaker ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(80, 55, 140, 0.4)",
              }}
            >
              {isSpeaker ? (
                <Volume2 size={22} style={{ color: "rgba(139, 92, 246, 1)" }} />
              ) : (
                <VolumeX size={22} className="text-muted-foreground" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">Speaker</span>
          </button>
        </div>

        {/* Gift button */}
        <button
          onClick={() => setShowGifts((g) => !g)}
          className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          style={{
            background: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            color: "rgba(251, 191, 36, 1)",
          }}
        >
          <Gift size={16} />
          Send Gift 🎁
        </button>
      </div>
    </div>
  );
};

export default VoiceCall;