"use client";

import React, { useState } from "react";
import { FrontFace } from "./FrontFace";
import { BackFace } from "./BackFace";
import { CompleteModal } from "./CompleteModal";
import { ITINERARY } from "./data";

export default function DigitalPhotocard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [unlockedStep, setUnlockedStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleUnlock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah event bubbling
    if (unlockedStep < ITINERARY.length) {
      setUnlockedStep((prev) => prev + 1);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          20% { transform: translateX(200%) translateY(200%) rotate(45deg); opacity: 0; }
          100% { transform: translateX(200%) translateY(200%) rotate(45deg); opacity: 0; }
        }
        .animate-shine {
          animation: shine 5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes overlayEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-overlay-enter {
          animation: overlayEnter 0.4s ease-out forwards;
        }
      `}} />

      {/* BACKGROUND HALAMAN UTAMA */}
      <div className="min-h-dvh w-full flex items-center justify-center p-4 bg-linear-to-br from-zinc-950 via-black to-zinc-900 relative overflow-hidden font-sans">

        {/* Efek Lautan Perak (Silver Ocean Glow) */}
        <div className="absolute -top-10% -left-10% w-[500px] h-[500px] bg-zinc-300/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10% -right-10% w-[500px] h-[500px] bg-zinc-400/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Tekstur Pola Hexagon (Tile) sangat tipis */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0l12 7v14l-12 7-12-7V7z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '36px 60px'
          }}
        />

        {/* CONTAINER KARTU UTAMA */}
        <div
          className="relative w-72 h-[450px] perspective-[1000px] z-10"
          style={{ touchAction: "manipulation", WebkitPerspective: "1000px" }}
        >
          {/* Inner wrapper dengan inline style murni untuk 3D transform agar aman dari linter */}
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              WebkitTransform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <FrontFace isFlipped={isFlipped} onFlip={() => setIsFlipped(true)} />

            <BackFace
              isFlipped={isFlipped}
              unlockedStep={unlockedStep}
              onFlip={() => setIsFlipped(false)}
              onUnlock={handleUnlock}
            />
          </div>
        </div>
      </div>

      {showModal && <CompleteModal onClose={() => setShowModal(false)} />}
    </>
  );
}
