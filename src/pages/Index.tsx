
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/landing/Hero";

const Index = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Hero />
      </div>
    </MainLayout>
  );
};

export default Index;
