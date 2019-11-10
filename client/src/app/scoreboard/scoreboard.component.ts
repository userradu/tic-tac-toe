import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.css"]
})
export class ScoreboardComponent implements OnInit {
  @Input() humanPlayerSymbol: string;

  public xNumberOfWins = 0;
  public oNumberOfWins = 0;

  constructor() {}

  ngOnInit() {}

  increasePlayerScore(player: string) {
    if (player === "x") {
      this.xNumberOfWins++;
    } else {
      this.oNumberOfWins++;
    }
  }

  resetScore() {
    this.xNumberOfWins = 0;
    this.oNumberOfWins = 0;
  }
}
