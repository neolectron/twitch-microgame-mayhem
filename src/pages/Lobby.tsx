
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { RoomList } from "@/components/lobby/RoomList";

const Lobby = () => {
  return (
    <MainLayout>
      <div className="min-h-screen py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Game Lobby
        </h1>
        <RoomList />
      </div>
    </MainLayout>
  );
};

export default Lobby;
