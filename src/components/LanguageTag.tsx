import React from "react";

interface LanguageTagProps {
  language?: string;
  compact?: boolean;
}

const LANG_EMOJIS: Record<string, string> = {
  Hindi: "🇮🇳",
  Telugu: "🌺",
  Tamil: "🌸",
  Bengali: "🌼",
  English: "🌍",
};

const LanguageTag: React.FC<LanguageTagProps> = ({
  language = "Hindi",
  compact = false,
}) => {
  const emoji = LANG_EMOJIS[language] || "💬";
  return (
    <span
      data-cmp="LanguageTag"
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: "rgba(139, 92, 246, 0.2)",
        color: "rgba(196, 166, 255, 1)",
        border: "1px solid rgba(139, 92, 246, 0.35)",
      }}
    >
      <span>{emoji}</span>
      {!compact && <span>{language}</span>}
    </span>
  );
};

export default LanguageTag;