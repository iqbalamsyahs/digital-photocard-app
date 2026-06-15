"use client";

import { useState, useRef } from "react";
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PhotoUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const { default: imageCompression } = await import("browser-image-compression");
      
      const formData = new FormData();
      
      // Compress each file before appending
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Skip compression for non-images
        if (!file.type.startsWith("image/")) {
          formData.append("file", file);
          continue;
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        formData.append("file", compressedFile, file.name);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        const errorData = await res.json().catch(() => null);
        console.error("Upload error response:", errorData);
        alert(`Gagal mengupload foto: ${errorData?.error || res.statusText}`);
      }
    } catch (error) {
      console.error("Error during upload or compression:", error);
      alert("Terjadi kesalahan saat mengupload foto.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Memories</h2>
        <p className="text-zinc-400 text-sm">Pilih foto-foto terbaik dari hari ini untuk ditampilkan di halaman Encore.</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center cursor-pointer ${
          isDragging ? "border-zinc-300 bg-zinc-800/50" : "border-zinc-700 hover:border-zinc-500 bg-zinc-950/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleUpload(e.target.files)}
        />
        
        {isUploading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-10 h-10 text-zinc-400 animate-spin mb-4" />
            <p className="text-zinc-300 font-medium">Mengupload...</p>
          </motion.div>
        ) : uploadSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-green-400 font-medium">Berhasil diupload!</p>
          </motion.div>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-zinc-500 mb-4" />
            <p className="text-zinc-300 font-medium mb-1">Klik atau Drag & Drop</p>
            <p className="text-zinc-500 text-sm">Mendukung JPG, PNG, WEBP</p>
          </>
        )}
      </div>
    </div>
  );
}
