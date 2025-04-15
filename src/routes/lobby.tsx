
import { Route as RootRoute } from '@tanstack/router';
import { RoomList } from '@/components/lobby/RoomList';

export const Route = new RootRoute('/lobby', {
  component: () => (
    <div className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Game Lobby
      </h1>
      <RoomList />
    </div>
  ),
});
