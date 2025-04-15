import { useEffect, useRef, useState } from "react";

interface Cursor {
  id: string;
  x: number;
  y: number;
  color: string;
  name: string;
}

// Colors for different users
const CURSOR_COLORS = [
  "#9b5de5", // Purple
  "#f15bb5", // Pink
  "#fee440", // Yellow
  "#00bbf9", // Blue
  "#00f5d4", // Teal
  "#ff6b6b", // Red
];

export const CursorParty = () => {
  const { roomId } = useParams();
  const roomRef = useRef<HTMLDivElement>(null);
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const myIdRef = useRef(`user-${Math.random().toString(36).substring(2, 9)}`);
  const myColorRef = useRef(
    CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)],
  );

  // In a real application, this would connect to PartyKit
  // For now, we'll simulate other users with random cursor movements
  useEffect(() => {
    // Generate some fake users
    const fakeCursors: Cursor[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `fake-user-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: CURSOR_COLORS[i % CURSOR_COLORS.length],
      name: `Player ${i + 1}`,
    }));

    setCursors(fakeCursors);

    // Simulate cursor movements for fake users
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((cursor) => {
          if (cursor.id.startsWith("fake-user")) {
            return {
              ...cursor,
              x: Math.max(
                0,
                Math.min(100, cursor.x + (Math.random() - 0.5) * 10),
              ),
              y: Math.max(
                0,
                Math.min(100, cursor.y + (Math.random() - 0.5) * 10),
              ),
            };
          }
          return cursor;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [roomId]);

  // Track the user's real cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!roomRef.current) return;

      const rect = roomRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const myCursor = {
        id: myIdRef.current,
        x,
        y,
        color: myColorRef.current,
        name: "You",
      };

      // Update your cursor position
      setCursors((prev) => {
        const filtered = prev.filter((c) => c.id !== myIdRef.current);
        return [...filtered, myCursor];
      });

      // In a real app with PartyKit, would send this position to the server
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={roomRef}
      className="relative w-full h-full min-h-[400px] rounded-lg bg-white/50 backdrop-blur-sm border-2 border-game-primary/30"
    >
      {cursors.map((cursor) => (
        <div
          key={cursor.id}
          className="cursor-follower absolute pointer-events-none"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Cursor pointer */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={cursor.color}
            stroke={cursor.id === myIdRef.current ? "#000" : "none"}
            strokeWidth="1"
          >
            <path d="M5 3l3.057-3 11.943 12-12 12-3-3 9-9-9-9z" />
          </svg>

          {/* Username */}
          <div
            className="absolute top-5 left-5 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.name}
          </div>
        </div>
      ))}
    </div>
  );
};
