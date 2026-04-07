import React from "react";
import { Phone } from "lucide-react";

interface CallButtonProps {
  onCall?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "end" | "accept";
}

const CallButton: React.FC<CallButtonProps> = ({
  onCall = () => console.log("Call button pressed"),
  size = "md",
  variant = "primary",
}) => {
  const sizes = { sm: 36, md: 44, lg: 64 };
  const px = sizes[size];

  const bgMap = {
    primary: "linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(109, 40, 217, 1) 100%)",
    end: "linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(185, 28, 28, 1) 100%)",
    accept: "linear-gradient(135deg, rgba(52, 211, 153, 1) 0%, rgba(16, 185, 129, 1) 100%)",
  };

  const glowMap = {
    primary: "rgba(139, 92, 246, 0.6)",
    end: "rgba(239, 68, 68, 0.6)",
    accept: "rgba(52, 211, 153, 0.6)",
  };

  return (
    <button
      data-cmp="CallButton"
      onClick={onCall}
      className="rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
      style={{
        width: px,
        height: px,
        background: bgMap[variant],
        boxShadow: `0 4px 20px ${glowMap[variant]}`,
      }}
    >
      <Phone
        size={px * 0.42}
        className="text-white"
        style={{ transform: variant === "end" ? "rotate(135deg)" : "none" }}
      />
    </button>
  );
};

export default CallButton;