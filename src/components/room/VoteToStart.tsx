
import React, { useState, useEffect } from 'react';
import { Users, Play } from 'lucide-react';

interface VoteToStartProps {
  onGameStart: () => void;
}

export const VoteToStart: React.FC<VoteToStartProps> = ({ onGameStart }) => {
  const [totalPlayers, setTotalPlayers] = useState(6); // Total including fake players
  const [votedPlayers, setVotedPlayers] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Calculate vote percentage
  const votePercentage = (votedPlayers / totalPlayers) * 100;
  const voteThreshold = 60; // 60% of players need to vote to start
  
  // Handle user vote
  const handleVote = () => {
    if (hasVoted) return;
    
    setHasVoted(true);
    setVotedPlayers(prev => prev + 1);
    
    // In a real app, would send this vote to PartyKit server
  };
  
  // Simulate other players voting randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && votedPlayers < totalPlayers - 1) {
        setVotedPlayers(prev => Math.min(prev + 1, totalPlayers - 1));
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [totalPlayers, votedPlayers]);
  
  // Check if vote threshold reached
  useEffect(() => {
    if (votePercentage >= voteThreshold && countdown === null) {
      // Start countdown
      setCountdown(5);
    }
  }, [votePercentage, countdown]);
  
  // Handle countdown
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown <= 0) {
      onGameStart();
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(prev => prev !== null ? prev - 1 : null);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, onGameStart]);
  
  return (
    <div className="game-card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Ready to Play?</h2>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <Users size={20} />
        <span>{votedPlayers} / {totalPlayers} players voted</span>
      </div>
      
      <div className="relative h-4 bg-muted rounded-full overflow-hidden mb-6">
        <div 
          className="absolute top-0 left-0 h-full bg-game-primary transition-all duration-300"
          style={{ width: `${votePercentage}%` }}
        />
      </div>
      
      {countdown !== null ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Game starting in</div>
          <div className="text-4xl font-bold text-game-secondary">{countdown}</div>
        </div>
      ) : (
        <button
          className={`game-button w-full flex items-center justify-center gap-2 ${
            hasVoted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleVote}
          disabled={hasVoted}
        >
          <Play size={20} />
          <span>{hasVoted ? 'Vote Cast!' : 'Vote to Start Game'}</span>
        </button>
      )}
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Game will start when {voteThreshold}% of players vote
      </p>
    </div>
  );
};
