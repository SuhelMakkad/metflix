import { NextResponse } from "next/server";

import { getTVShows } from "@/lib/tmdb";
import { TIME_WINDOW, TV_TYPES } from "@/api/constants";
import type { TimeWindow, TVType } from "@/api/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id") ?? undefined;
  const type = searchParams.get("type") as TVType;
  const timeWindow = searchParams.get("timeWindow") as TimeWindow;

  if (!TV_TYPES.includes(type)) {
    return new Response("invalid tv show type", {
      status: 400,
    });
  }

  if (timeWindow && !TIME_WINDOW.includes(timeWindow)) {
    return new Response("invalid time window", {
      status: 400,
    });
  }

  const tv = await getTVShows(type, id);

  return NextResponse.json({ tv });
}
