import { NextResponse } from "next/server";

export async function GET () {
  return NextResponse.json({
    routes: {
      "player" : "/api/player",
      "player/:id" : "/api/player/:id"
    }
  })
}
