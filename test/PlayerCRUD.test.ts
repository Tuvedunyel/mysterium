import { createPlayer, updatePlayerInformation, deletePlayerInformation } from "../functions-without-context";
import { prismaMock } from "../singleton";

const player = {
  id: 1,
  name: 'John Doe',
  role: 'medium',
  color: "white",
  score: 0,
  FindSet: false,
  FindGeneral: false,
  gameId: 1
};

describe( 'Player CRUD being tested', () => {
  test( 'Should create a new player', async () => {
    prismaMock.player.create.mockResolvedValue( player );
    await expect( createPlayer( player ) ).resolves.toEqual( player );
  } );

  test( 'Should update a player', async () => {
    const updatedPlayer = { ...player, name: "Jane Doe" };
    prismaMock.player.update.mockResolvedValue( updatedPlayer );
    await expect( updatePlayerInformation( updatedPlayer ) ).resolves.toEqual( updatedPlayer );
  } );

  test( 'Should delete a player', async () => {
    prismaMock.player.delete.mockResolvedValue( player );
    await expect( deletePlayerInformation( player ) ).resolves.toEqual( player );
  } );

  test( 'should fail if player name and role are not provided', async () => {
    const playerWithoutNameAndRole = { ...player, name: null, role: null };
    prismaMock.player.create.mockImplementation();
    // @ts-ignore
    await expect( createPlayer( playerWithoutNameAndRole ) ).resolves
        .toEqual( new Error( "Player name and role are required" ) );
  } );
} );
