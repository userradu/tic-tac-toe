import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit {
  @Input() humanPlayerSymbol: string;
  @Input() boardState: Array<any>;
  @Output() cellClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onCellClicked(row: number, col: number) {
    this.cellClicked.emit({ row: row, col: col });
  }
}
