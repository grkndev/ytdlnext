import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoID = searchParams.get("videoID");
  const quality = searchParams.get("quality");
  const filter = searchParams.get("filter");
  const format = searchParams.get("format");

  if (!videoID) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }


  
  try {
    const params = new URLSearchParams({
      videoID,
      quality: quality || "",
      filter: filter || "",
      format: format || "",
    }).toString();

    const expressUrl = new URL(`/download?${params}`, "http://localhost:3001");
    const res = await fetch(expressUrl.toString());

    if (!res.ok) {
      throw new Error("Download failed");
    }

    // Forward the response headers
    const headers = new Headers({
      "Content-Type":
        res.headers.get("Content-Type") || "application/octet-stream",
      "Content-Disposition":
        res.headers.get("Content-Disposition") ||
        'attachment; filename="video.webm"',
    });

    // Stream the response directly
    return new Response(res.body, { headers });
  } catch (err: any) {
    console.error("Download error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
