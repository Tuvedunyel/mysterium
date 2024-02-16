import prisma from "./client"

interface CreateGame {
  name: string
}

export async function createGame ( game: CreateGame ) {
  if (game.name) {
    const data = await prisma.game.create( {
      data: game
    } )
    return data
  } else {
    return new Error( "Game must have a name" )
  }
}

interface DeleteGame {
  id: number
  name: string
}

export async function deleteGame ( gameId: DeleteGame ) {
  const data = await prisma.game.delete( {
    where: {
      id: gameId.id
    }
  } )

  return data
}

interface CreatePlayer {
  name: string,
  role: string,
  color: string,
  sessionId: number
}

export async function createPlayer ( player: CreatePlayer ) {
  if (player.name && player.role) {
    const data = await prisma.player.create( {
      data: player
    } )
    return data
  } else {
    return new Error( "Player name and role are required" )
  }
}

interface UpdatePlayer {
  id: number,
  name: string,
  role: string,
  color: string
  sessionId: number
}

export async function updatePlayerInformation ( player: UpdatePlayer ) {
  const data = await prisma.player.update( {
    where: { id: player.id },
    data: player
  } )
  return data
}

export async function deletePlayerInformation ( player: UpdatePlayer ) {
  const data = await prisma.player.delete( {
    where: { id: player.id },
  } )
  return data
}
