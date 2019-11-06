import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-display-game-result",
  templateUrl: "./display-game-result.component.html",
  styleUrls: ["./display-game-result.component.css"]
})
export class DisplayGameResultComponent implements OnInit {
  @Input() result: string;
  @Output() resultMessageClicked = new EventEmitter<any>();

  messages = {
    draw: "Draw",
    x: "X player won!",
    y: "Y player won!"
  };

  constructor() {}

  ngOnInit() {}

  onResultMessageClicked() {
    this.resultMessageClicked.emit(true);
  }
}
