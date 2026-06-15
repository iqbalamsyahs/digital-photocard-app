import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Create unique filename
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      
      const blob = await put(fileName, file, {
        access: 'public',
      });
      
      uploadedUrls.push(blob.url);
    }

    return NextResponse.json({ success: true, urls: uploadedUrls }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
