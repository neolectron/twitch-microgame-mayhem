import { useState, type DragEvent } from 'react';
import { Users, UserPlus, Crown } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface Room {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing';
  topPlayer?: string;
}

const MOCK_ROOMS: Room[] = [
  {
    id: 'room1',
    name: "XQc's Room",
    players: 12,
    maxPlayers: 20,
    status: 'waiting',
  },
  {
    id: 'room2',
    name: "Pokimane's Challenge",
    players: 18,
    maxPlayers: 20,
    status: 'playing',
    topPlayer: 'StreamerFan44',
  },
  {
    id: 'room3',
    name: "Ninja's Arena",
    players: 5,
    maxPlayers: 20,
    status: 'waiting',
  },
  {
    id: 'room4',
    name: "Shroud's Battleground",
    players: 20,
    maxPlayers: 20,
    status: 'playing',
    topPlayer: 'AimGod99',
  },
  {
    id: 'room5',
    name: "Ludwig's Party",
    players: 8,
    maxPlayers: 20,
    status: 'waiting',
  },
];

export const RoomList = ({
  onRoomJoin,
}: {
  onRoomJoin: (roomId: string) => void;
}) => {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);

  const handleDragStart = (e: DragEvent, roomId: string) => {
    e.dataTransfer.setData('roomId', roomId);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent, roomId: string) => {
    const draggedRoomId = e.dataTransfer.getData('roomId');
    if (!draggedRoomId) return;

    onRoomJoin(roomId);
  };

  const handleDoubleClick = (roomId: string) => {
    onRoomJoin(roomId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Game Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`game-card p-4 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              room.status === 'playing'
                ? 'border-game-secondary/50'
                : 'border-game-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, room.id)}
            onDoubleClick={() => handleDoubleClick(room.id)}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{room.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  room.status === 'waiting'
                    ? 'bg-game-primary/20 text-game-primary'
                    : 'bg-game-secondary/20 text-game-secondary'
                }`}
              >
                {room.status === 'waiting' ? 'Waiting' : 'In Progress'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>
                  {room.players}/{room.maxPlayers} players
                </span>
              </div>

              {room.topPlayer && (
                <div className="flex items-center gap-1 text-sm">
                  <Crown size={14} className="text-game-accent" />
                  <span>{room.topPlayer}</span>
                </div>
              )}
            </div>

            <Link
              to={`/room/${room.id}`}
              className="w-full mt-4 py-2 rounded flex justify-center items-center gap-2 bg-game-primary/10 hover:bg-game-primary/20 transition-colors text-game-primary font-semibold"
              draggable
              onDragStart={(e: any) => handleDragStart(e, room.id)}
            >
              <UserPlus size={16} />
              <span>Join Room</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-2">
          Drag your profile to a room or double-click to join
        </p>
        <div className="flex justify-center">
          <div
            className="w-12 h-12 rounded-full bg-game-primary/90 text-white font-bold flex items-center justify-center cursor-grab"
            draggable
          >
            YOU
          </div>
        </div>
      </div>
    </div>
  );
};
