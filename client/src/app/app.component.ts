import { Component, OnInit, ViewChild } from "@angular/core";
import { TicTacToeService } from "./ticTacToe.service";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild(ScoreboardComponent)
  public scoreBoardComponent: ScoreboardComponent;

  public humanPlayerSymbol = "x";
  public boardState;
  public gameOver = false;
  public gameResult: string;
  public displaySelectSymbolScreen = false;

  constructor(private ticTacToeService: TicTacToeService) {}

  ngOnInit() {
    this.createInitialState();
  }

  public createInitialState() {
    this.boardState = this.ticTacToeService.createEmptyBoard();
    this.gameOver = false;
    this.gameResult = null;
  }

  isGameOver() {
    const state = this.ticTacToeService.getGameState(this.boardState);

    if (state !== "in progress") {
      if (state !== "draw") {
        this.scoreBoardComponent.increasePlayerScore(state);
      }
      this.gameOver = true;
      this.gameResult = state;
      return true;
    }

    return false;
  }

  onCellClicked(position: any) {
    this.boardState[position.row][position.col] = this.humanPlayerSymbol;

    if (!this.isGameOver()) {
      this.getComputerMove();
    }
  }

  getComputerMove() {
    const data = {
      board: this.boardState,
      playerToMove: this.humanPlayerSymbol === "x" ? "o" : "x"
    };

    this.ticTacToeService.getComputerMove(data).subscribe(res => {
      this.boardState = res;
      this.isGameOver();
    });
  }

  newGame() {
    this.createInitialState();
    if (this.humanPlayerSymbol === "o") {
      this.getComputerMove();
    }
  }

  selectSymbol() {
    this.displaySelectSymbolScreen = true;
  }

  onSymbolSelected(symbol: string) {
    this.humanPlayerSymbol = symbol;
    this.scoreBoardComponent.resetScore();
    this.displaySelectSymbolScreen = false;
    this.newGame();
  }
}
