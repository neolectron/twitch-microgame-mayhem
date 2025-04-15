import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { RoomList } from '../components/lobby/RoomList';

export const Route = createFileRoute('/lobby')({
  component: () => {
    // const navigate = Route.useNavigate();
    const navigate = useNavigate();

    return (
      <div className="min-h-screen py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Game Lobby</h1>
        <RoomList
          onRoomJoin={(roomId) => {
            console.log(`Joined room: ${roomId}`);
            navigate({
              to: '/room',
              // If your /room route supports params, add params: { roomId }
            });
          }}
        />
      </div>
    );
  },
});
