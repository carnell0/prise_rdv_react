import React from "react";
import "../src/index.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased">
      {children}
    </div>
  );
}