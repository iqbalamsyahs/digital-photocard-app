import React from "react";
import { Button } from "@/components/ui/button";

interface CompleteModalProps {
  onClose: () => void;
}

export function CompleteModal({ onClose }: CompleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-overlay-enter">
      <div className="bg-[#FFF8E7] w-full max-w-sm rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-zinc-300 relative overflow-hidden animate-modal-enter">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-zinc-400 via-zinc-200 to-zinc-400" />

        <div className="text-center mt-3">
          <span className="text-4xl mb-4 block drop-shadow-md">🚀✨</span>
          <h3 className="text-zinc-900 text-lg font-sans font-semibold tracking-widest uppercase mb-2">
            EXO PLANET ENCORE
          </h3>
          <p className="text-zinc-700 text-[11px] leading-relaxed font-medium mb-6 px-2">
            EXO PLANET ENCORE successfully completed!✨Prepare yourself for one last Silver Ocean experience to close the night.
            <br /><br />
            <span className="italic font-light">&quot;Let&apos;s make an unforgettable Encore Stage! 🤍&quot;</span>
          </p>

          <Button
            variant="default"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 tracking-widest font-light transition-all shadow-lg"
            onClick={onClose}
          >
            TUTUP
          </Button>
        </div>
      </div>
    </div>
  );
}
