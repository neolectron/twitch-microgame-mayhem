
import React from "react";
import { Gamepad2, Users, Trophy, Zap } from "lucide-react";
import TwitchLoginButton from "./TwitchLoginButton";

export const Hero: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-game-accent rounded-full blur-xl opacity-30 animate-pulse-glow"></div>
          <Gamepad2 className="relative w-24 h-24 text-game-primary animate-float" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-game-primary via-game-secondary to-game-highlight bg-clip-text text-transparent game-text-shadow">
          Twitch MicroGame Mayhem
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-foreground/80">
          Lightning-fast minigames where streamers battle viewers to see who's the ultimate gamer! Think WarioWare, but with your favorite Twitch community.
        </p>
        
        <TwitchLoginButton />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <FeatureCard 
            icon={<Zap className="w-10 h-10 text-game-secondary" />}
            title="Fast-Paced Action"
            description="Quick-fire minigames that get faster and more challenging as you progress."
          />
          <FeatureCard 
            icon={<Users className="w-10 h-10 text-game-primary" />}
            title="Stream vs Viewers"
            description="Streamers can battle their audience in real-time competitive mayhem."
          />
          <FeatureCard 
            icon={<Trophy className="w-10 h-10 text-game-accent" />}
            title="Last One Standing"
            description="Survive longer than everyone else to claim victory and bragging rights."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="game-card p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
