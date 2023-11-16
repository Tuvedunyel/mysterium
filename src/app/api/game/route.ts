import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

type Game = {
  name: string;
}

const prisma = new PrismaClient();

export async function POST ( request: Request) {
  try {
    const data = await request.json();
    const game = await prisma.game.create( {
      data: {
        name: data.body.name
      }
    } )

    let json_response = {
      status: 200,
      data : game
    }

    return NextResponse.json( {
      json_response
    } )

  } catch(error: any) {

    let message = error.message.includes("`Game_name_key`") ? "Game name already exists, please choose a new name" : error.message

    let error_message = {
      status: "error",
      message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}
