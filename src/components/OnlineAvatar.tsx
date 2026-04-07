import React from "react";
import AvatarDisplay from "./AvatarDisplay";
import { MaatoUser } from "@/types/maato";

interface OnlineAvatarProps {
  user?: MaatoUser;
  onClick?: () => void;
}

const OnlineAvatar: React.FC<OnlineAvatarProps> = ({
  user = {
    id: "1",
    nickname: "Priya",
    avatarSeed: "P",
    avatarColor: "rgba(236, 72, 153, 1)",
    language: "Hindi",
    city: "Mumbai",
    interests: [],
    isOnline: true,
    coins: 100,
  },
  onClick = () => console.log("Online avatar clicked"),
}) => {
  return (
    <button
      data-cmp="OnlineAvatar"
      className="flex flex-col items-center gap-1.5 flex-shrink-0"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: user.avatarColor,
            filter: "blur(8px)",
            transform: "scale(1.1)",
          }}
        />
        <AvatarDisplay
          seed={user.avatarSeed}
          color={user.avatarColor}
          size={56}
          isOnline={user.isOnline}
          showOnline={true}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground truncate w-16 text-center">
        {user.nickname.split(" ")[0]}
      </span>
    </button>
  );
};

export default OnlineAvatar;