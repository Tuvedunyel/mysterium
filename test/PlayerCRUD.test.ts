import { createPlayer, updatePlayerInformation, deletePlayerInformation } from "../functions-without-context";
import { prismaMock } from "../singleton";

describe( 'Player CRUD being tested', () => {
  test( 'Should create a new player', async () => {
    const player = {
      id: 1,
      name: 'John Doe',
      role: 'medium',
      color: "white"
    }

    prismaMock.player.create.mockResolvedValue( player )

    await expect( createPlayer( player ) ).resolves.toEqual( {
      id: 1,
      name: 'John Doe',
      role: 'medium',
      color: "white"
    } )

  } )

  test( 'Should update a player', async () => {
    const player = {
      id: 1,
      name: "Jane Doe",
      role: "medium",
      color: "white"
    }

    prismaMock.player.update.mockResolvedValue( player )

    await expect( updatePlayerInformation( player ) ).resolves.toEqual( {
      id: 1,
      name: "Jane Doe",
      role: "medium",
      color: "white"
    } )
  } )

  test( 'Should delete a player', async () => {
    const player = {
      id: 1,
      name: "Jane Doe",
      role: "medium",
      color: "white"
    }

    prismaMock.player.delete.mockResolvedValue( player )

    await expect( deletePlayerInformation( player ) ).resolves.toEqual( {
      id: 1,
      name: "Jane Doe",
      role: "medium",
      color: "white"
    } )
  } )

  test( 'should fail if player name and role are not provided', async () => {
    const player = {
      id: 1,
      name: null,
      role: null,
      color: "white"
    }

    prismaMock.player.create.mockImplementation()

    await expect( createPlayer( player ) ).resolves.toEqual(
        new Error( "Player name and role are required" )
    )
  } )
} )
