import { NextResponse } from "next/server";

import { getPersonCredits } from "@/tmdb/lib/person";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (!id) {
    return new Response("no id found", {
      status: 404,
    });
  }

  const res = await getPersonCredits(id);

  if (!res || res.cast) {
    return new Response("no credits found", {
      status: 404,
    });
  }
  return NextResponse.json({ cast: res.cast });
}
