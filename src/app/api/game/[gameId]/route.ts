import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET ( request: Request, context: any ) {
  try {
    const { gameId } = context.params;
    const data = await prisma.game.findUniqueOrThrow( { where: { id: Number(gameId) } } )

    let json_response = {
      status: "Success",
      data: data
    }

    return NextResponse.json({
      json_response
    })

  } catch(error: any) {
    let error_message = {
      status: "error",
      error: error.message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}

export async function DELETE ( request: Request, context: any ) {
  try {
    const { gameId } = context.params;
    const data = await prisma.game.delete({ where: { id: Number(gameId) } })

    return NextResponse.json({
      message: "Game deleted",
      data: data
    })

  } catch(error: any) {
    let error_message = {
      status: "error",
      message: error.message
    }

    return NextResponse.json({
      error_message
    })
  }
}
