import React from "react";

interface AvatarDisplayProps {
  seed?: string;
  color?: string;
  size?: number;
  isOnline?: boolean;
  showOnline?: boolean;
  className?: string;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  seed = "M",
  color = "rgba(139, 92, 246, 1)",
  size = 52,
  isOnline = false,
  showOnline = true,
  className = "",
}) => {
  const initials = seed.slice(0, 2).toUpperCase();

  return (
    <div
      data-cmp="AvatarDisplay"
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center font-bold text-white"
        style={{
          background: color,
          fontSize: size * 0.35,
          boxShadow: `0 4px 14px ${color.replace("1)", "0.5)")}`,
        }}
      >
        {initials}
      </div>
      {showOnline && isOnline && (
        <span
          className="absolute bottom-0 right-0 rounded-full border-2 border-background"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            background: "rgba(52, 211, 153, 1)",
            boxShadow: "0 0 8px rgba(52, 211, 153, 0.8)",
          }}
        />
      )}
    </div>
  );
};

export default AvatarDisplay;