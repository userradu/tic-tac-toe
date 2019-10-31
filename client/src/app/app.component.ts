import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public humanPlayerSymbol = "x";
  public boardState = [];

  ngOnInit() {
    this.createInitialState();
  }

  private createInitialState() {
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(null);
      }
      this.boardState.push(row);
    }
  }

  onCellClicked(position: any) {
    this.boardState[position.row][position.col] = this.humanPlayerSymbol;
  }
}
