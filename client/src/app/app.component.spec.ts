import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TicTacToeService } from "./ticTacToe.service";
import { of } from "rxjs";

@Component({ selector: "app-board", template: "" })
class BoardStubComponent {
  @Input() humanPlayerSymbol: string;
  @Input() boardState: Array<any>;
  @Output() cellClicked = new EventEmitter<any>();
}

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const ticTacToeService = jasmine.createSpyObj("TicTacToeService", [
    "getComputerMove"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BoardStubComponent],
      providers: [{ provide: TicTacToeService, useValue: ticTacToeService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it('should set the "humanPlayerSymbol" property to "x"', () => {
    expect(component.humanPlayerSymbol).toBe("x");
  });

  it("should create an empty board state", () => {
    const expectedResult = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    expect(component.boardState).toEqual(expectedResult);
  });

  it("should contain the board component", () => {
    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    expect(boardDebugElement).toBeTruthy();
  });

  it("should pass the required data to the board component", () => {
    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    expect(boardComponentInstance.boardState).toBeTruthy();
    expect(boardComponentInstance.humanPlayerSymbol).toBeTruthy();
  });

  it("should call onCellClicked when cellClicked event is emitted by the BoardComponent", () => {
    spyOn(component, "onCellClicked");

    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    boardComponentInstance.cellClicked.emit({ row: 0, col: 0 });

    expect(component.onCellClicked).toHaveBeenCalled();
  });

  it("should modify the board state when cellClicked event is emitted", () => {
    const initialValues = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    const expectedResult = [
      ["x", null, null],
      [null, null, null],
      [null, null, null]
    ];

    expect(component.boardState).toEqual(initialValues);

    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    boardComponentInstance.cellClicked.emit({ row: 0, col: 0 });

    expect(component.boardState).toEqual(expectedResult);
  });

  it("shoud reset the board when pressing the 'Restart' button", () => {
    const initialValues = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    const currentValues = [
      ["x", null, null],
      [null, "o", "x"],
      [null, null, null]
    ];

    component.boardState = currentValues;

    fixture.detectChanges();

    fixture.nativeElement.querySelector(".restart-btn").click();

    expect(component.boardState).toEqual(initialValues);
  });

  it("should make a request to the server when cellClicked event is emitted", () => {
    const initialValues = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = initialValues;

    fixture.detectChanges();

    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    boardComponentInstance.cellClicked.emit({ row: 0, col: 0 });

    expect(ticTacToeService.getComputerMove).toHaveBeenCalled();
  });

  it("should make a request to the server with the correct data", () => {
    const initialValues = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = initialValues;

    fixture.detectChanges();

    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    boardComponentInstance.cellClicked.emit({ row: 0, col: 0 });

    const updatedBoard = [
      ["x", null, null],
      [null, null, null],
      [null, null, null]
    ];

    expect(ticTacToeService.getComputerMove).toHaveBeenCalledWith({
      board: updatedBoard,
      playerToMove: "o"
    });
  });

  it("should update the board after getting the server response", () => {
    const initialValues = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    component.boardState = initialValues;

    fixture.detectChanges();

    const boardDebugElement = fixture.debugElement.query(
      By.directive(BoardStubComponent)
    );

    const boardComponentInstance = boardDebugElement.injector.get(
      BoardStubComponent
    );

    const serverResponse = [
      ["x", null, null],
      [null, "o", null],
      [null, null, null]
    ];

    ticTacToeService.getComputerMove.and.returnValue(of(serverResponse));

    boardComponentInstance.cellClicked.emit({ row: 0, col: 0 });

    expect(component.boardState).toEqual(serverResponse);
  });
});
