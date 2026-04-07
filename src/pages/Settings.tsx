import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, Shield, LogOut, ChevronRight,
  Edit3, Coins, Flag,
} from "lucide-react";
import AvatarDisplay from "@/components/AvatarDisplay";
import BottomNav from "@/components/BottomNav";
import { MOCK_USERS } from "@/types/maato";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const me = { ...MOCK_USERS[0], nickname: "You ✨", avatarSeed: "YO", avatarColor: "rgba(139, 92, 246, 1)", coins: 350 };
  const [notifications, setNotifications] = useState(true);

  console.log("Settings page rendered");

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: Edit3, label: "Edit Profile", action: () => navigate("/profile-setup") },
        { icon: Coins, label: "My Coins", badge: `🪙 ${me.coins}`, action: () => console.log("Coins tapped") },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          toggle: true,
          toggleValue: notifications,
          onToggle: () => setNotifications((n) => !n),
        },
        { icon: Shield, label: "Privacy & Safety", action: () => console.log("Privacy tapped") },
        { icon: Flag, label: "Blocked Users", action: () => console.log("Blocked tapped") },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-black text-foreground">My Profile</h1>
      </div>

      {/* Profile card */}
      <div className="px-5 mb-6">
        <div
          className="p-5 rounded-3xl border border-border"
          style={{ background: "rgba(26, 18, 52, 1)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <AvatarDisplay
              seed={me.avatarSeed}
              color={me.avatarColor}
              size={68}
              isOnline={true}
              showOnline={true}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground">{me.nickname}</h2>
              <p className="text-sm text-muted-foreground">{me.city} · {me.language}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {me.interests.map((i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(52, 35, 95, 1)",
                      color: "rgba(196, 166, 255, 1)",
                    }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-around py-3 rounded-2xl"
            style={{ background: "rgba(52, 35, 95, 0.5)" }}>
            {[
              { value: "42", label: "Calls" },
              { value: "🪙 350", label: "Coins" },
              { value: "4.9⭐", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-bold text-foreground text-base">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="px-5 mb-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {section.title}
          </p>
          <div
            className="rounded-2xl border border-border overflow-hidden"
            style={{ background: "rgba(26, 18, 52, 1)" }}
          >
            {section.items.map((item, idx) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-4 px-4 py-4 transition-colors"
                style={{
                  borderBottom:
                    idx < section.items.length - 1
                      ? "1px solid rgba(80, 55, 140, 0.25)"
                      : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(52, 35, 95, 1)" }}
                >
                  <item.icon size={17} style={{ color: "rgba(139, 92, 246, 1)" }} />
                </div>
                <span className="flex-1 text-left text-sm font-medium text-foreground">
                  {item.label}
                </span>
                {"badge" in item && item.badge && (
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold mr-1"
                    style={{
                      background: "rgba(52, 35, 95, 1)",
                      color: "rgba(251, 191, 36, 1)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {"toggle" in item && item.toggle ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onToggle?.();
                    }}
                    className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
                    style={{
                      background: item.toggleValue
                        ? "rgba(139, 92, 246, 1)"
                        : "rgba(52, 35, 95, 1)",
                    }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: item.toggleValue ? "calc(100% - 20px)" : "4px" }}
                    />
                  </button>
                ) : (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="px-5 mb-4">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all"
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            borderColor: "rgba(239, 68, 68, 0.25)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(239, 68, 68, 0.15)" }}
          >
            <LogOut size={17} style={{ color: "rgba(239, 68, 68, 1)" }} />
          </div>
          <span style={{ color: "rgba(239, 68, 68, 1)" }} className="text-sm font-medium">
            Log Out
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;