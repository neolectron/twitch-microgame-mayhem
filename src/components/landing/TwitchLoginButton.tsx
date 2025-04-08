
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TwitchLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleTwitchLogin = async () => {
    // In a real implementation, we would redirect to Twitch OAuth
    // For now, just simulate a successful login and redirect
    toast({
      title: "Twitch Integration Coming Soon",
      description: "This feature is under development. Redirecting to lobby for preview.",
    });
    
    // Simulate login delay then redirect
    setTimeout(() => {
      navigate("/lobby");
    }, 2000);
  };
  
  return (
    <button 
      onClick={handleTwitchLogin}
      className="flex items-center gap-2 px-6 py-3 bg-[#6441a5] hover:bg-[#7d5bbe] text-white font-bold rounded-md shadow-lg transition-all duration-200 hover:scale-105"
    >
      <TwitchIcon />
      <span>Login with Twitch</span>
    </button>
  );
};

const TwitchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5711 4.73913H13.0415V9.15217H11.5711V4.73913Z" fill="white"/>
    <path d="M7.67041 4.73913H9.14082V9.15217H7.67041V4.73913Z" fill="white"/>
    <path d="M4.5 2L2.5 6V18H7.5V22L11.5 18H14.5L21.5 11V2H4.5ZM19.5 10.2857L16.5 13.2857H13.5L10.85 15.9357V13.2857H7.5V4H19.5V10.2857Z" fill="white"/>
  </svg>
);

export default TwitchLoginButton;
