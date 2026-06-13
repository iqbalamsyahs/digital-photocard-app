import React from "react";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ITINERARY } from "./data";

interface BackFaceProps {
  isFlipped: boolean;
  unlockedStep: number;
  onFlip: () => void;
  onUnlock: (e: React.MouseEvent) => void;
}

export function BackFace({ isFlipped, unlockedStep, onFlip, onUnlock }: BackFaceProps) {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden bg-zinc-950 border-[0.5px] border-zinc-700/50 flex flex-col p-5 text-center cursor-pointer ${!isFlipped ? 'pointer-events-none' : ''
        }`}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        WebkitTransform: "rotateY(180deg)"
      }}
      onClick={onFlip}
    >
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-[200%] h-12 bg-linear-to-b from-transparent via-zinc-400/10 to-transparent blur-[5px] animate-shine" style={{ animationDelay: '2.5s' }} />
      </div>

      <div className="mt-1 relative z-10">
        <h3 className="text-zinc-300 text-[11px] font-sans font-light tracking-[0.3em] uppercase drop-shadow-sm">
          VIP ACCESS GRANTED
        </h3>
        <p className="text-zinc-500 text-[8.5px] font-sans font-light tracking-[0.2em] uppercase mt-0.5">
          We Are One, 사랑하자
        </p>
        <div className="w-12 h-px bg-linear-to-r from-transparent via-zinc-500 to-transparent mx-auto mt-2" />
      </div>

      <div className="flex-1 flex flex-col items-center w-full my-2.5 relative z-10 bg-[#FFF8E7] rounded-xl p-3.5 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] border border-zinc-300/80 overflow-hidden">
        <p className="text-zinc-950 text-[9.5px] leading-relaxed font-sans font-semibold tracking-wide mb-2 text-center px-1">
          &quot;Saengil chukahamnida! 🤍 Berikut akses eksklusif VIP rute kencan kita hari ini.&quot;
        </p>

        <div className="w-full h-px bg-zinc-300/80 mb-2.5" />

        <div className="flex flex-col space-y-3.5 w-full text-left px-1">
          {ITINERARY.map((item, index) => {
            const isUnlocked = unlockedStep > index;
            return (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-5 h-5 mt-0.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500 ${isUnlocked
                  ? 'bg-linear-to-br from-zinc-700 to-zinc-950 border-zinc-400 shadow-[0_0_8px_rgba(161,161,170,0.6)]'
                  : 'bg-zinc-200/50 border-zinc-300'
                  }`}>
                  {isUnlocked ? (
                    <span className="text-[7.5px]">✨</span>
                  ) : (
                    <span className="text-[7.5px] opacity-40 grayscale">🪄</span>
                  )}
                </div>

                <div className={`flex flex-col transition-all duration-500 ${isUnlocked
                  ? 'opacity-100'
                  : 'opacity-70 blur-[0.3px] select-none grayscale'
                  }`}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500 font-sans font-bold text-[7.5px] tracking-widest uppercase leading-none truncate">
                      {item.theme}
                    </span>
                  </div>

                  <div className="text-zinc-900 font-sans font-bold text-[11px] tracking-wider uppercase mt-1 drop-shadow-sm leading-none flex items-center gap-1.5">
                    {isUnlocked ? item.name : (
                      <>
                        <Lock className="w-3 h-3 text-zinc-600" />
                        <span className="text-zinc-600">LOCKED STAGE</span>
                      </>
                    )}
                  </div>

                  <div className="text-zinc-600 font-sans font-medium text-[7.5px] tracking-wide leading-snug mt-1 pr-1">
                    {isUnlocked ? item.desc : "Selesaikan destinasi sebelumnya."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full mt-auto mb-1 relative z-10 no-flip-zone">
        <Button
          variant="outline"
          className={`w-full h-10 transition-all duration-500 rounded-xl font-medium tracking-wider flex items-center justify-center gap-2 group/btn ${unlockedStep < ITINERARY.length
            ? "bg-linear-to-r from-zinc-300 via-zinc-100 to-zinc-300 text-zinc-900 border border-zinc-400 hover:border-white hover:text-black hover:from-white hover:via-zinc-100 hover:to-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            : "bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:bg-zinc-100 scale-100 hover:scale-105"
            }`}
          onClick={onUnlock}
        >
          <span className="text-[10px] font-sans uppercase tracking-widest flex items-center gap-1.5">
            {unlockedStep < ITINERARY.length ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                Unlock Next Stage
              </>
            ) : (
              <>
                ✨ Complete Concert
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
}
