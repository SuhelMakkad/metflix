import { NextResponse } from "next/server";

import { searchAll } from "@/lib/tmdb";
import type { Media } from "@/tmdb/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response("no query found", {
      status: 404,
    });
  }

  const result = await searchAll(query).catch(console.error);

  if (!result) {
    return new Response("no results found", {
      status: 404,
    });
  }

  return NextResponse.json({ result });
}
