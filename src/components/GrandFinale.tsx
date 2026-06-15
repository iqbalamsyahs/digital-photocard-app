"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import Image from "next/image";

export default function GrandFinale() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        if (data.photos) {
          setPhotos(data.photos);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchPhotos();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Background Particles/Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-zinc-100 to-zinc-500 mb-4 uppercase">
            The Encore
          </h1>
          <p className="text-zinc-400 tracking-[0.2em] uppercase text-sm md:text-base">
            A Birthday Note
          </p>
        </motion.div>

        {/* Message Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="w-full max-w-2xl text-center space-y-6 text-zinc-300 leading-relaxed mb-20 px-4"
        >
          <p>
            You are the brightest star in my universe. Just like an encore at the end of a beautiful concert,
            this moment is just the beginning of another amazing year with you.
          </p>
          <p>
            Thank you for every smile, every laugh, and every memory we made today.
            I can&apos;t wait to see what the next chapter brings.
          </p>
          <p className="text-xl font-medium text-white italic pt-4">
            Happy Birthday, my love.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mb-24"
        >
          <button
            onClick={toggleAudio}
            className="group relative flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-full hover:bg-zinc-800 hover:border-zinc-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-zinc-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <span className="relative text-zinc-200 font-medium tracking-widest uppercase text-sm">
              {isPlaying ? "Pause Our Song" : "Play Our Song"}
            </span>
            {isPlaying ? (
              <Pause className="relative w-4 h-4 text-zinc-300" />
            ) : (
              <Play className="relative w-4 h-4 text-zinc-300 fill-current" />
            )}
          </button>
          <audio ref={audioRef} src="/music/bgm.mp3" loop />
        </motion.div>

        {/* Photo Grid */}
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-full"
          >
            <div className="text-center mb-10">
              <h2 className="text-sm font-medium tracking-[0.3em] text-zinc-500 uppercase">
                Memories of Today
              </h2>
              <div className="w-12 h-px bg-zinc-700 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {photos.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 + Math.min(index, 10) * 0.2 }}
                  className="relative aspect-4/5 rounded-xl overflow-hidden group border border-zinc-800/50"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <Image
                    src={url}
                    alt={`Memory ${index + 1}`}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
