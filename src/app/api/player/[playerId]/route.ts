import { NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function DELETE ( request: Request, context: any ) {
  try {
    const { playerId } = context.params
    const player = await prisma.player.delete( {
      where: { id: Number( playerId ) }
    } )

    let json_response = {
      data: {
        message: 'Player deleted',
        data: player
      }
    }

    return new NextResponse( JSON.stringify( json_response ),
        { status: 200, headers: { 'Content-Type': 'application/json' } } )
  } catch ( error: any ) {
    let error_message = {
      status: "error",
      message: error.message
    };

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } );
  }
}

export async function PATCH ( request: Request, context: any ) {
  const { playerId } = context.params
  const data = await request.json();

  const player = await prisma.player.update( {
    where: { id: Number( playerId ) },
    data: {
      name: data.body.playerName,
      role: data.body.role,
      color: data.body.color,
      id: Number( playerId ),
      sessionId: Number(data.body.sessionId)
    }
  } )

  return NextResponse.json( {
    playerId,
    player
  } )
}
