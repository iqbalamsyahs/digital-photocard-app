import React from "react";
import Image from "next/image";
import { GIRLFRIEND_NAME, BIRTHDAY_AGE, BIRTHDAY_DATE } from "./data";

interface FrontFaceProps {
  isFlipped: boolean;
  onFlip: () => void;
}

export function FrontFace({ isFlipped, onFlip }: FrontFaceProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-[0.5px] border-zinc-500/30 transition-colors duration-500 cursor-pointer ${isFlipped ? 'pointer-events-none' : ''
        }`}
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      onClick={onFlip}
    >
      {/* Tekstur Glossy / Mengkilap */}
      <div className="absolute inset-0 z-20 bg-linear-to-tr from-white/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay" />

      {/* Animasi Garis Kilau (Shine) */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-[200%] h-16 bg-linear-to-b from-transparent via-white/25 to-transparent blur-sm animate-shine" />
      </div>

      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        <span className="text-zinc-600 text-xs">Loading Photo...</span>
      </div>
      <Image
        src="/images/girlfriend.jpg"
        alt={GIRLFRIEND_NAME}
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, 300px"
        priority
      />

      {/* Logo Hexagon Timbul di Kanan Atas */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-zinc-300/50 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-zinc-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2.5L2 8v8l10 5.5 10-5.5V8L12 2.5z" />
        </svg>
      </div>

      {/* Gradien Bawah & Tipografi Premium */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-5 z-10">
        <div className="w-full space-y-1.5">
          <p className="text-zinc-300 text-[9px] font-sans font-light tracking-[0.2em] uppercase opacity-90">
            EXO PLANET {BIRTHDAY_AGE} Birthday Encore
          </p>
          <h2 className="text-zinc-50 text-[1.4rem] font-sans font-bold tracking-[0.15em] drop-shadow-md uppercase leading-none pb-1">
            {GIRLFRIEND_NAME}
          </h2>
          <div className="flex justify-between items-end pt-2 w-full border-t border-zinc-700/50">
            <p className="text-zinc-400 text-[8.5px] font-sans font-medium tracking-[0.2em] uppercase">
              SPECIAL VIP EDITION
            </p>
            <p className="text-zinc-500 text-[8.5px] font-mono tracking-widest opacity-90">
              No. PC: {BIRTHDAY_DATE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
