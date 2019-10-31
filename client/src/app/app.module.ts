import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BoardComponent } from "./board/board.component";
import { XSymbolComponent } from "./x-symbol/x-symbol.component";
import { OSymbolComponent } from "./o-symbol/o-symbol.component";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    XSymbolComponent,
    OSymbolComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
