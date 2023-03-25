import { NextResponse } from "next/server";

import { getPerson } from "@/tmdb/lib/person";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  if (!id) {
    return new Response("no id found", {
      status: 404,
    });
  }

  const person = await getPerson(id);

  if (!person) {
    return new Response("no person found", {
      status: 404,
    });
  }
  return NextResponse.json({ person });
}
