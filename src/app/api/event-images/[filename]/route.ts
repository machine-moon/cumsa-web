import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    const { filename } = await params;
    const decoded = decodeURIComponent(filename);
    // Disallow path traversal and suspicious characters
    if (decoded.includes("..") || decoded.includes("/") || decoded.includes("\\")) {
      return new NextResponse("Invalid filename", { status: 400 });
    }
    const eventsDir = path.resolve(process.cwd(), "public", "events");
    const filePath = path.resolve(eventsDir, decoded);
    // Ensure filePath is inside eventsDir
    if (!filePath.startsWith(eventsDir + path.sep)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(decoded).toLowerCase();
    let contentType = "application/octet-stream";
    switch (ext) {
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".webp":
        contentType = "image/webp";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
    }
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
