import { createGame, deleteGame } from "../functions-without-context"
import { prismaMock } from "../singleton";

describe( 'Game CRUD being test', () => {

  test( 'Shloud create a new game', async () => {
    const game = {
      id: 1,
      name: "Test Game"
    }

    prismaMock.game.create.mockResolvedValue( game )

    await expect( createGame( game ) ).resolves.toEqual( {
      id: 1,
      name: "Test Game"
    } )
  } )

  test( 'Should delete a game', async () => {
    const game = {
      id: 1,
      name: "Test Game"
    }

    prismaMock.game.delete.mockResolvedValue( game )

    await expect( deleteGame( game ) ).resolves.toEqual( {
      id: 1,
      name: "Test Game"
    } )
  } );

  test( ' Should fail if the game name is not specified', async () => {
    const game = {
      id: 1,
      name: null
    }

    prismaMock.game.create.mockImplementation();

    // @ts-ignore
    await expect( createGame( game ) ).resolves.toEqual( new Error( "Game must have a name" ) );
  } )
} )
