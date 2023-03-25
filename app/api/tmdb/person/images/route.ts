import { NextResponse } from "next/server";

import { getPersonImages } from "@/lib/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (!id) {
    return new Response("no id found", {
      status: 404,
    });
  }

  const res = await getPersonImages(id);

  if (!res || res.profiles) {
    return new Response("no credits found", {
      status: 404,
    });
  }
  return NextResponse.json(res);
}
