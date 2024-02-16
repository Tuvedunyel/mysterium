import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

type Game = {
  name: string;
}

const prisma = new PrismaClient();

export async function GET ( request: Request ) {
  try {
  const game = await prisma.game.findMany( {
    orderBy: {
      id: 'desc'
    }
  } )
php
  let json_response = {
    data: { game }
  }

  return NextResponse.json( {
    json_response
  }, {
    status: 200
  } )
  } catch (error: any) {
    const errorHandler = {
      message: error.message ? error.message : "Something went wrong"
    }

    return new NextResponse( JSON.stringify( errorHandler ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}

export async function POST ( request: Request ) {
  try {
    const data = await request.json();
    const game = await prisma.game.create( {
      data: {
        name: data.body.name
      }
    } )

    let json_response = {
      data: game
    }

    return NextResponse.json( {
      json_response
    }, { status: 200 } )

  } catch ( error: any ) {

    let message = error.message.includes( "`Game_name_key`" ) ? "Game name already exists, please choose a new name" :
        error.message

    let error_message = {
      status: "error",
      message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}
