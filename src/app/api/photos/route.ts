import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import path from "path";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    let files: string[] = [];
    try {
      files = await readdir(uploadDir);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Directory might not exist yet, return empty list
      return NextResponse.json({ photos: [] });
    }

    const imageFiles = [];
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const filePath = path.join(uploadDir, file);
        const fileStat = await stat(filePath);
        imageFiles.push({
          name: file,
          url: `/uploads/${file}`,
          mtime: fileStat.mtime.getTime()
        });
      }
    }

    // Sort by most recent first
    imageFiles.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({ photos: imageFiles.map(f => f.url) });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}
