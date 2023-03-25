import { NextResponse } from "next/server";

import { getVideos } from "@/tmdb/lib/video";
import { getVideoUrl } from "@/tmdb/lib";
import type { Media } from "@/tmdb/types";

export type Params = {
  media: Media;
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { id, media } = params;

  const videos = await getVideos(id, media).catch(console.error);

  if (!videos || !videos.length) {
    return new Response("no video found", {
      status: 404,
    });
  }

  const trailerIndex = videos.findIndex((video) => video.type === "Trailer");
  const { key, site } = videos[trailerIndex === -1 ? 0 : trailerIndex];
  const videoUrl = getVideoUrl(key, site);

  if (!videoUrl) {
    return new Response("no video found", {
      status: 404,
    });
  }

  return NextResponse.redirect(videoUrl);
}
