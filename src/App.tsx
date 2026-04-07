import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import VoiceCall from "./pages/VoiceCall";
import IncomingCall from "./pages/IncomingCall";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  console.log("MAATO app initialized");
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen gradient-bg flex items-start justify-center">
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otp" element={<OtpVerify />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/voice-call" element={<VoiceCall />} />
              <Route path="/incoming-call" element={<IncomingCall />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;