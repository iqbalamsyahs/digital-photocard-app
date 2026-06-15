import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const { blobs } = await list({ token });

    const imageFiles = blobs.map((blob) => ({
      url: blob.url,
      mtime: blob.uploadedAt.getTime(),
    }));

    // Sort by oldest first (terlama ke terbaru)
    imageFiles.sort((a, b) => a.mtime - b.mtime);

    return NextResponse.json({ photos: imageFiles.map(f => f.url) });
  } catch (error) {
    console.error("Error fetching photos from Vercel Blob:", error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}
