import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { ReadableStream } from "stream/web";
import { NextApiRequest } from "next";

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

export async function DELETE ( req: NextApiRequest ) {
  try {
    console.log(req.query);
    // const { id } = req.query;
    // const player = await prisma.player.delete( {
    //   where: { id: Number( id ) }
    // } );
    //
    // let json_response = {
    //   status: 200,
    //   data: {
    //     message: "Player deleted",
    //     data: player
    //   }
    // }
    //
    // return new NextResponse( JSON.stringify( json_response ),
    //     { status: 200, headers: { 'Content-Type': 'application/json' } } );

  } catch ( error: any ) {
    let error_message = {
      status: "error",
      message: error.message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}

export async function POST ( req: Request ) {
  try {
    if (req.body instanceof ReadableStream) {
      const reader = req.body.getReader()
      let chunks = "";
      let done, value;

      while ( !done ) {
        ({ done, value } = await reader.read());
        chunks += new TextDecoder().decode( value, { stream: !done } );
      }
      const json = JSON.parse( chunks )
      const player = await main( json )
      let json_response = {
        status: 200,
        data: {
          message: 'Player created',
          parseData: json,
          data: player
        }
      }

      return new NextResponse( JSON.stringify( json_response ),
          { status: 201, headers: { 'Content-Type': 'application/json' } } )
    }

  } catch ( error: any ) {
    let error_message = {
      status: "error",
      message: error.message
    }

    return new NextResponse( JSON.stringify( error_message ),
        { status: 500, headers: { 'Content-Type': 'application/json' } } )
  }
}

