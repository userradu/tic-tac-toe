import { Component, OnInit } from "@angular/core";
import { TicTacToeService } from "./ticTacToe.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public humanPlayerSymbol = "x";
  public boardState;

  constructor(private ticTacToeService: TicTacToeService) {}

  ngOnInit() {
    this.createInitialState();
  }

  private createInitialState() {
    const values = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(null);
      }
      values.push(row);
    }

    this.boardState = values;
  }

  onCellClicked(position: any) {
    this.boardState[position.row][position.col] = this.humanPlayerSymbol;
    const data = {
      board: this.boardState,
      playerToMove: this.humanPlayerSymbol === "x" ? "o" : "x"
    };

    this.ticTacToeService.getComputerMove(data).subscribe(res => {
      this.boardState = res;
    });
  }

  restartGame() {
    this.createInitialState();
  }
}
