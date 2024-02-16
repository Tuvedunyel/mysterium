import { createGame, deleteGame } from "../functions-without-context"
import { prismaMock } from "../singleton";

const game = {
  id: 1,
  name: "Test Game"
};

describe('Game CRUD being test', () => {
  test('Should create a new game', async () => {
    prismaMock.game.create.mockResolvedValue(game);
    await expect(createGame(game)).resolves.toEqual(game);
  });

  test('Should delete a game', async () => {
    prismaMock.game.delete.mockResolvedValue(game);
    await expect(deleteGame(game)).resolves.toEqual(game);
  });

  test('Should fail if the game name is not specified', async () => {
    const gameWithoutName = { ...game, name: null };
    prismaMock.game.create.mockImplementation();
    // @ts-ignore
    await expect(createGame(gameWithoutName)).resolves.toEqual(new Error("Game must have a name"));
  });
});
