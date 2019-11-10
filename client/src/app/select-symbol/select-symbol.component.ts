import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-select-symbol",
  templateUrl: "./select-symbol.component.html",
  styleUrls: ["./select-symbol.component.css"]
})
export class SelectSymbolComponent implements OnInit {
  @Output() symbolSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  selectSymbol(symbol: string) {
    this.symbolSelected.emit(symbol);
  }
}
