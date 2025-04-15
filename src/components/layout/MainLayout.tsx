import React from "react";
import { Toaster } from "../ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Twitch MicroGame Mayhem. All rights
            reserved.
          </p>
        </div>
      </footer>
      <Toaster />
      {/* <Sonner /> */}
    </div>
  );
};
