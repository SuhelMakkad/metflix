import { NextResponse } from "next/server";

import { searchAll } from "@/tmdb/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? 1;

  if (!query) {
    return new Response("no query found", {
      status: 404,
    });
  }

  const result = await searchAll(query, page).catch(console.error);

  if (!result) {
    return new Response("no results found", {
      status: 404,
    });
  }

  return NextResponse.json({ result });
}
