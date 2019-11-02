import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardComponent } from "./board.component";
import { Component } from "@angular/core";

@Component({ selector: "app-x-symbol", template: "" })
class XSymbolStubComponent {}

@Component({ selector: "app-o-symbol", template: "" })
class OSymbolStubComponent {}

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, XSymbolStubComponent, OSymbolStubComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create a table element by using the boardState array", () => {
    const boardState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = boardState;

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector("table");

    expect(table).toBeTruthy();

    const rows = table.getElementsByTagName("tr");

    expect(rows.length).toBe(3);

    for (const row of rows) {
      expect(row.getElementsByTagName("td").length).toBe(3);
      const rowValues = row.getElementsByTagName("td");
      for (const td of rowValues) {
        expect(td.innerText).toBe("");
      }
    }
  });

  it("should add the x-symbol and o-symbol components depending on the boardState", () => {
    const boardState = [
      ["x", "o", null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = boardState;

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector("table");
    const rows = table.getElementsByTagName("tr");

    expect(
      rows[0].getElementsByTagName("td")[0].querySelector("app-x-symbol")
    ).not.toBe(null);
    expect(
      rows[0].getElementsByTagName("td")[1].querySelector("app-o-symbol")
    ).not.toBe(null);
  });

  it("should emmit an event with the correct data when a table cell is clicked", () => {
    const boardState = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = boardState;

    fixture.detectChanges();

    let emittedValue;
    component.cellClicked.subscribe(value => (emittedValue = value));

    fixture.nativeElement.getElementsByTagName("td")[0].click();

    expect(emittedValue).toEqual({ row: 0, col: 0 });
  });

  it("shouldn't emit an event if the table cell has a value", () => {
    spyOn(component.cellClicked, "emit");

    const boardState = [
      ["x", null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = boardState;

    fixture.detectChanges();

    fixture.nativeElement.getElementsByTagName("td")[0].click();

    expect(component.cellClicked.emit).not.toHaveBeenCalled();
  });
});
