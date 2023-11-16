import prisma from "./client"

interface CreatePlayer {
  name: string | null,
  role: string | null,
  color: string
}

export async function createPlayer( player: CreatePlayer ) {
  if ( player.name && player.role ) {
    return await prisma.player.create({
      data: player
    })
  } else {
    return new Error("Player name and role are required")
  }
}

interface UpdatePlayer {
  id: number,
  name: string,
  role: string,
  color: string
}

export async function updatePlayerInformation( player: UpdatePlayer ) {
  return await prisma.player.update({
    where: { id: player.id },
    data: player
  })
}

export async function deletePlayerInformation( player: UpdatePlayer ) {

  return await prisma.player.delete({
    where: { id: player.id },
  })
}
