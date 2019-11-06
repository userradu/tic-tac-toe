import { TicTacToeService } from "./ticTacToe.service";

describe("TicTacToeService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let ticTacToeService: TicTacToeService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    ticTacToeService = new TicTacToeService(<any>httpClientSpy);
  });

  it("should create an empty board", () => {
    const expectedResult = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    expect(ticTacToeService.createEmptyBoard()).toEqual(expectedResult);
  });

  describe("getComputerState()", () => {
    it("should return 'in progress'", () => {
      const boardState = [
        ["x", null, "o"],
        ["o", "x", null],
        [null, null, "o"]
      ];
      expect(ticTacToeService.getGameState(boardState)).toBe("in progress");
    });

    it("should return 'x'", () => {
      const boardState = [
        ["x", null, "o"],
        ["o", "x", null],
        [null, null, "x"]
      ];
      expect(ticTacToeService.getGameState(boardState)).toBe("x");
    });

    it("should return 'o'", () => {
      const boardState = [["x", null, "x"], ["o", "o", "o"], [null, null, "x"]];
      expect(ticTacToeService.getGameState(boardState)).toBe("o");
    });

    it("should return 'draw'", () => {
      const boardState = [["x", "x", "o"], ["o", "x", "x"], ["x", "o", "o"]];
      expect(ticTacToeService.getGameState(boardState)).toBe("draw");
    });
  });
});
