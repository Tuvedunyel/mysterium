import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

type Data = {
  playerName: string;
  role: string;
  color: string;
};

const prisma = new PrismaClient();

async function main ( { body }: { body: Data } ) {
  await prisma.player.create( {
    data: {
      name: body.playerName,
      role: body.role,
      color: body.color
    }
  } )
  const [ savePlayer ] = await Promise.all( [ prisma.player.findMany( {
    where: { name: body.playerName, role: body.role, color: body.color }
  } ) ] )

  return savePlayer
}

export async function POST ( req: Request ) {
  try {
    const data = await req.json()
      const player = await main( data )
      let json_response = {
        status: 200,
        data: {
          message: 'Player created',
          parseData: data.body,
          data: player[0]
        }
      }

      return new NextResponse( JSON.stringify( json_response ),
          { status: 201, headers: { 'Content-Type': 'application/json' } } )

  } catch ( error: any ) {
    let error_message = {
      status: "error",
      message: error.message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}

