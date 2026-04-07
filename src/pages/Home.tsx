import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Zap, Filter } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import OnlineAvatar from "@/components/OnlineAvatar";
import UserCard from "@/components/UserCard";
import { MOCK_USERS, LANGUAGES } from "@/types/maato";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState("all");

  console.log("Home (Discover) page rendered — users:", MOCK_USERS.length);

  const onlineUsers = MOCK_USERS.filter((u) => u.isOnline);

  const filteredUsers = MOCK_USERS.filter((u) => {
    const matchName = u.nickname.toLowerCase().includes(search.toLowerCase());
    const matchLang = filterLang === "all" || u.language === filterLang;
    return matchName && matchLang;
  });

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-5 pt-5 pb-4"
        style={{
          background: "linear-gradient(to bottom, rgba(12, 8, 28, 1) 80%, rgba(12, 8, 28, 0))",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-foreground">Discover</h1>
            <p className="text-xs text-muted-foreground">
              {onlineUsers.length} people online now ✨
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border relative"
              style={{ background: "rgba(26, 18, 52, 1)" }}
            >
              <Bell size={18} className="text-muted-foreground" />
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ background: "rgba(255, 107, 74, 1)" }}
              />
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
          style={{
            background: "rgba(26, 18, 52, 1)",
            borderColor: "rgba(80, 55, 140, 0.4)",
          }}
        >
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="px-5">
        {/* Online Now */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "rgba(52, 211, 153, 1)",
                  boxShadow: "0 0 8px rgba(52, 211, 153, 1)",
                }}
              />
              <span className="text-sm font-semibold text-foreground">Online Now</span>
            </div>
            <span className="text-xs text-muted-foreground">{onlineUsers.length} active</span>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {onlineUsers.map((user) => (
              <OnlineAvatar
                key={user.id}
                user={user}
                onClick={() => navigate("/user-profile")}
              />
            ))}
          </div>
        </div>

        {/* Language filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => setFilterLang("all")}
            className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border"
            style={{
              background: filterLang === "all" ? "rgba(139, 92, 246, 1)" : "rgba(26, 18, 52, 1)",
              borderColor: filterLang === "all" ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
              color: filterLang === "all" ? "rgba(255, 255, 255, 1)" : "rgba(180, 160, 220, 1)",
            }}
          >
            🔥 All
          </button>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setFilterLang(lang.label)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border"
              style={{
                background: filterLang === lang.label ? "rgba(139, 92, 246, 1)" : "rgba(26, 18, 52, 1)",
                borderColor: filterLang === lang.label ? "rgba(139, 92, 246, 1)" : "rgba(80, 55, 140, 0.4)",
                color: filterLang === lang.label ? "rgba(255, 255, 255, 1)" : "rgba(180, 160, 220, 1)",
              }}
            >
              {lang.emoji} {lang.label}
            </button>
          ))}
        </div>

        {/* User List */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">
            Meet People <span className="text-muted-foreground font-normal">({filteredUsers.length})</span>
          </span>
          <button
            className="flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-xl border border-border"
            style={{ background: "rgba(26, 18, 52, 1)" }}
          >
            <Filter size={12} /> Filter
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onCall={() => navigate("/voice-call")}
              onProfileClick={() => navigate("/user-profile")}
            />
          ))}
        </div>
      </div>

      {/* Quick call FAB */}
      <button
        onClick={() => navigate("/voice-call")}
        className="fixed bottom-28 right-5 w-14 h-14 rounded-full flex items-center justify-center z-40 transition-all active:scale-90"
        style={{
          background: "linear-gradient(135deg, rgba(255, 107, 74, 1) 0%, rgba(236, 72, 153, 1) 100%)",
          boxShadow: "0 4px 24px rgba(255, 107, 74, 0.55)",
        }}
      >
        <Zap size={24} className="text-white" />
      </button>

      <BottomNav />
    </div>
  );
};

export default Home;