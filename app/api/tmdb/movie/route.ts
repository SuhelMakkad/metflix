import { NextResponse } from "next/server";

import { getMovies } from "@/lib/tmdb";
import { MOVIE_TYPES, TIME_WINDOW } from "@/api/constants";
import type { MovieType, TimeWindow } from "@/api/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") ?? undefined;
  const type = searchParams.get("type") as MovieType;
  const timeWindow = searchParams.get("timeWindow") as TimeWindow;

  if (!MOVIE_TYPES.includes(type)) {
    return new Response("invalid movie type", {
      status: 400,
    });
  }

  if (timeWindow && !TIME_WINDOW.includes(timeWindow)) {
    return new Response("invalid time window", {
      status: 400,
    });
  }

  const movies = await getMovies(type, id, timeWindow);
  return NextResponse.json({ movies });
}
