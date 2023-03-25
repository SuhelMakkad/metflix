import { NextResponse } from "next/server";

import { getTVShows } from "@/tmdb/lib/tv";
import { getMovies } from "@/tmdb/lib/movie";

import { TIME_WINDOW } from "@/tmdb/constants";

import type { Media, TimeWindow } from "@/tmdb/types";
import type { MovieType } from "@/tmdb/types/movie";
import type { TVType } from "@/tmdb/types/tv";

export type Params = {
  media: Media;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { media } = params;

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") ?? undefined;
  const page = searchParams.get("page") ?? undefined;
  const type = searchParams.get("type") as MovieType | TVType;
  const timeWindow = searchParams.get("timeWindow") as TimeWindow;

  if (timeWindow && !TIME_WINDOW.includes(timeWindow)) {
    return new Response("invalid time window", {
      status: 400,
    });
  }

  if (media === "movie") {
    const movies = await getMovies(type as MovieType, id, timeWindow, page);

    if (!movies) {
      return new Response("no movies found", {
        status: 404,
      });
    }
    return NextResponse.json({ movies });
  }

  if (media === "tv") {
    const tv = await getTVShows(type as TVType, id, timeWindow, page);

    if (!tv) {
      return new Response("no movies found", {
        status: 404,
      });
    }
    return NextResponse.json({ tv });
  }
}
