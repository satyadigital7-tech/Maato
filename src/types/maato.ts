export interface MaatoUser {
  id: string;
  nickname: string;
  avatarSeed: string;
  avatarColor: string;
  language: string;
  city: string;
  interests: string[];
  gender?: "male" | "female" | "other";
  age?: number;
  isOnline: boolean;
  coins: number;
  bio?: string;
}

export interface CallSession {
  callerId: string;
  receiverId: string;
  status: "ringing" | "active" | "ended";
  duration: number;
}

export type LanguageOption = {
  code: string;
  label: string;
  native: string;
  emoji: string;
};

export const LANGUAGES: LanguageOption[] = [
  { code: "hi", label: "Hindi", native: "हिंदी", emoji: "🇮🇳" },
  { code: "te", label: "Telugu", native: "తెలుగు", emoji: "🌺" },
  { code: "ta", label: "Tamil", native: "தமிழ்", emoji: "🌸" },
  { code: "bn", label: "Bengali", native: "বাংলা", emoji: "🌼" },
  { code: "en", label: "English", native: "English", emoji: "🌍" },
];

export const INTERESTS = [
  "Music 🎵", "Movies 🎬", "Cricket 🏏", "Cooking 🍳",
  "Travel ✈️", "Gaming 🎮", "Dance 💃", "Art 🎨",
  "Fitness 💪", "Books 📚", "Fashion 👗", "Tech 💻",
];

export const AVATAR_COLORS = [
  "rgba(139, 92, 246, 1)",
  "rgba(255, 107, 74, 1)",
  "rgba(236, 72, 153, 1)",
  "rgba(52, 211, 153, 1)",
  "rgba(251, 191, 36, 1)",
  "rgba(59, 130, 246, 1)",
  "rgba(168, 85, 247, 1)",
  "rgba(20, 184, 166, 1)",
];

export const MOCK_USERS: MaatoUser[] = [
  { id: "1", nickname: "Priya ✨", avatarSeed: "P", avatarColor: "rgba(236, 72, 153, 1)", language: "Hindi", city: "Mumbai", interests: ["Music 🎵", "Dance 💃"], isOnline: true, coins: 250 },
  { id: "2", nickname: "Arjun", avatarSeed: "A", avatarColor: "rgba(139, 92, 246, 1)", language: "Telugu", city: "Hyderabad", interests: ["Cricket 🏏", "Gaming 🎮"], isOnline: true, coins: 180 },
  { id: "3", nickname: "Meera 🌸", avatarSeed: "M", avatarColor: "rgba(52, 211, 153, 1)", language: "Tamil", city: "Chennai", interests: ["Art 🎨", "Travel ✈️"], isOnline: true, coins: 320 },
  { id: "4", nickname: "Rohan", avatarSeed: "R", avatarColor: "rgba(251, 191, 36, 1)", language: "Bengali", city: "Kolkata", interests: ["Music 🎵", "Books 📚"], isOnline: false, coins: 90 },
  { id: "5", nickname: "Ananya 💫", avatarSeed: "An", avatarColor: "rgba(255, 107, 74, 1)", language: "Hindi", city: "Delhi", interests: ["Fitness 💪", "Fashion 👗"], isOnline: true, coins: 410 },
  { id: "6", nickname: "Karthik", avatarSeed: "K", avatarColor: "rgba(59, 130, 246, 1)", language: "Tamil", city: "Bengaluru", interests: ["Tech 💻", "Gaming 🎮"], isOnline: true, coins: 150 },
  { id: "7", nickname: "Divya 🌺", avatarSeed: "D", avatarColor: "rgba(168, 85, 247, 1)", language: "Telugu", city: "Vijayawada", interests: ["Cooking 🍳", "Movies 🎬"], isOnline: false, coins: 200 },
  { id: "8", nickname: "Siddharth", avatarSeed: "S", avatarColor: "rgba(20, 184, 166, 1)", language: "English", city: "Pune", interests: ["Travel ✈️", "Tech 💻"], isOnline: true, coins: 75 },
];