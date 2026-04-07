import React from "react";
import { MapPin } from "lucide-react";
import AvatarDisplay from "./AvatarDisplay";
import LanguageTag from "./LanguageTag";
import CallButton from "./CallButton";
import { MaatoUser } from "@/types/maato";

interface UserCardProps {
  user?: MaatoUser;
  onCall?: () => void;
  onProfileClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user = {
    id: "1",
    nickname: "Priya ✨",
    avatarSeed: "P",
    avatarColor: "rgba(236, 72, 153, 1)",
    language: "Hindi",
    city: "Mumbai",
    interests: ["Music 🎵", "Dance 💃"],
    isOnline: true,
    coins: 250,
  },
  onCall = () => console.log("Calling user:", user?.nickname),
  onProfileClick = () => console.log("Viewing profile:", user?.nickname),
}) => {
  return (
    <div
      data-cmp="UserCard"
      className="flex items-center gap-3 p-4 rounded-2xl border border-border transition-all active:scale-[0.98]"
      style={{ background: "rgba(26, 18, 52, 0.8)" }}
    >
      <button onClick={onProfileClick} className="flex-shrink-0">
        <AvatarDisplay
          seed={user.avatarSeed}
          color={user.avatarColor}
          size={56}
          isOnline={user.isOnline}
          showOnline={true}
        />
      </button>

      <button className="flex-1 min-w-0 text-left" onClick={onProfileClick}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-foreground text-base truncate">
            {user.nickname}
          </span>
          {user.isOnline && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                background: "rgba(52, 211, 153, 0.15)",
                color: "rgba(52, 211, 153, 1)",
              }}
            >
              Live
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} className="text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">{user.city}</span>
          <LanguageTag language={user.language} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {user.interests.slice(0, 2).map((interest) => (
            <span
              key={interest}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(52, 35, 95, 1)",
                color: "rgba(180, 160, 220, 1)",
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </button>

      <CallButton onCall={onCall} size="md" variant="primary" />
    </div>
  );
};

export default UserCard;