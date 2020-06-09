import Sudoku from "./sudoku";

describe("Sudoku Game Logic", () => {
  test("setup the board bounds", () => {
    expect(new Sudoku([1, 2, 2, 1]).boardSize).toEqual(2);
  });

  test("incomplete board models should throw", () => {
    expect(() => new Sudoku([1, 2, 2])).toThrow();
  });

  test("sudoku node horizontal links", () => {
    const game = new Sudoku(["A", "B", "C", "D"]);
    expect(game.model[0].nextX).toBe(game.model[1]);
    expect(game.model[1].nextX).toBe(game.model[0]);
    expect(game.model[3].nextX).toBe(game.model[2]);
  });

  test("sudoku node vertical links", () => {
    const game = new Sudoku(["A", "B", "C", "D"]);
    expect(game.model[0].nextY).toBe(game.model[game.boardSize]);
  });
});

describe("Board Game Logic", () => {
  /* prettier-ignore */
  const boardValues = [
    'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P',
  ];

  const lastItem = boardValues.length - 1;
  const game = new Sudoku(boardValues);

  test("internal value retrieval for last item (loop around)", () => {
    expect(game.model[lastItem].value).toBe("P");
    expect(game.model[lastItem].nextX.value).toBe("M");
    expect(game.model[lastItem].nextY.value).toBe("D");
  });

  test("internal value retrieval for item regions", () => {
    expect(game.getRegionByValues(0)).toEqual(["A", "E", "B", "F"]);
  });

  test("find duplicates in a row", () => {
    expect(game.validateAdjacent("B", 2)).toEqual(false);
    expect(game.validateAdjacent("A", 0)).toEqual(true);
  });

  test("find duplicates in a column", () => {
    expect(game.validateAdjacent("I", 0, "Y")).toEqual(false);
    expect(game.validateAdjacent("A", 0, "Y")).toEqual(true);
  });
});
