
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { CursorParty } from "@/components/room/CursorParty";
import { VoteToStart } from "@/components/room/VoteToStart";
import { Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
    // In a real app, would use PartyKit to sync game start with other users
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/lobby" 
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Lobby</span>
          </Link>
          
          <h1 className="text-2xl font-bold">
            Room #{roomId?.substring(0, 4)}
          </h1>
          
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>6 players</span>
          </div>
        </div>
        
        <div className="mb-8 h-[60vh]">
          <CursorParty />
        </div>
        
        {!gameStarted ? (
          <VoteToStart onGameStart={handleGameStart} />
        ) : (
          <div className="game-card p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Game in Progress!</h2>
            <p className="mb-4">
              The first microgame would start here in a full implementation.
            </p>
            <p className="text-sm text-muted-foreground">
              Watch out! Games will get faster as you progress!
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Room;
