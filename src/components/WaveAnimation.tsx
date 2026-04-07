import React from "react";

interface WaveAnimationProps {
  color?: string;
  barCount?: number;
  height?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  color = "rgba(139, 92, 246, 1)",
  barCount = 5,
  height = 40,
}) => {
  const delays = ["0s", "0.2s", "0.4s", "0.6s", "0.8s"];

  return (
    <div
      data-cmp="WaveAnimation"
      className="flex items-end justify-center gap-1.5"
      style={{ height }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className="rounded-full wave-bar"
          style={{
            width: 5,
            height: height * 0.85,
            background: color,
            animationDelay: delays[i % delays.length],
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
};

export default WaveAnimation;