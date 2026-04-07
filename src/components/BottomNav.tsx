import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Phone, User } from "lucide-react";

interface BottomNavProps {
  activePath?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({
  activePath = "/home",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname || activePath;

  const tabs = [
    { path: "/home", icon: Home, label: "Discover" },
    { path: "/voice-call", icon: Phone, label: "Calls" },
    { path: "/settings", icon: User, label: "Me" },
  ];

  return (
    <nav
      data-cmp="BottomNav"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50 px-6 pb-safe"
      style={{
        background: "linear-gradient(to top, rgba(12, 8, 28, 1) 80%, rgba(12, 8, 28, 0) 100%)",
        paddingBottom: "24px",
        paddingTop: "12px",
      }}
    >
      <div
        className="flex items-center justify-around px-4 py-3 rounded-2xl border border-border"
        style={{ background: "rgba(26, 18, 52, 0.95)", backdropFilter: "blur(20px)" }}
      >
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = current === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all"
              style={{
                color: isActive ? "rgba(139, 92, 246, 1)" : "rgba(140, 120, 180, 1)",
              }}
            >
              <Icon
                size={22}
                fill={isActive ? "rgba(139, 92, 246, 0.2)" : "none"}
              />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;