import React, { useState, useEffect } from "react";
import { Check, Play } from "lucide-react";

interface VoteToStartProps {
  onGameStart: () => void;
}

export const VoteToStart: React.FC<VoteToStartProps> = ({ onGameStart }) => {
  const [totalPlayers, setTotalPlayers] = useState(6); // Total including fake players
  const [readyPlayers, setReadyPlayers] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Calculate ready percentage
  const readyPercentage = (readyPlayers / totalPlayers) * 100;
  const readyThreshold = 80; // 80% of players need to be ready to start

  // Handle player ready status
  const handleReady = () => {
    if (isReady) return;

    setIsReady(true);
    setReadyPlayers((prev) => prev + 1);

    // In a real app, would send this ready status to PartyKit server
  };

  // Simulate other players getting ready randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && readyPlayers < totalPlayers - 1) {
        setReadyPlayers((prev) => Math.min(prev + 1, totalPlayers - 1));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [totalPlayers, readyPlayers]);

  // Check if ready threshold reached
  useEffect(() => {
    if (readyPercentage >= readyThreshold && countdown === null) {
      // Start 20-second countdown
      setCountdown(20);
    }
  }, [readyPercentage, countdown]);

  // Handle countdown
  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      onGameStart();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onGameStart]);

  return (
    <div className="game-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Ready to Play?</h2>

      <div className="flex items-center justify-center gap-2 mb-4">
        <Check size={20} />
        <span>
          {readyPlayers} / {totalPlayers} players ready
        </span>
      </div>

      <div className="relative h-4 bg-muted rounded-full overflow-hidden mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-game-primary transition-all duration-300"
          style={{ width: `${readyPercentage}%` }}
        />
      </div>

      {countdown !== null ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Game starting in</div>
          <div className="text-4xl font-bold text-game-secondary">
            {countdown}
          </div>
        </div>
      ) : (
        <button
          className={`game-button w-full flex items-center justify-center gap-2 ${
            isReady ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleReady}
          disabled={isReady}
        >
          <Play size={20} />
          <span>{isReady ? "Ready!" : "I am Ready"}</span>
        </button>
      )}

      <p className="text-sm text-muted-foreground mt-4 text-center">
        Game will start when {readyThreshold}% of players are ready
      </p>
    </div>
  );
};
