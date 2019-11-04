import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ScoreboardComponent } from "./scoreboard.component";
import { Component } from "@angular/core";

@Component({ selector: "app-x-symbol", template: "" })
class XSymbolStubComponent {}

@Component({ selector: "app-o-symbol", template: "" })
class OSymbolStubComponent {}

describe("ScoreboardComponent", () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoreboardComponent,
        XSymbolStubComponent,
        OSymbolStubComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add the x-symbol and o-symbol components depending on the humanPlayerSymbol", () => {
    component.humanPlayerSymbol = "x";

    fixture.detectChanges();

    const playerSectionElement = fixture.nativeElement.querySelector(
      ".player-section"
    );
    const computerSectionElement = fixture.nativeElement.querySelector(
      ".computer-section"
    );

    expect(playerSectionElement.querySelector("app-x-symbol")).not.toBe(null);
    expect(playerSectionElement.querySelector("app-o-symbol")).toBe(null);
    expect(computerSectionElement.querySelector("app-o-symbol")).not.toBe(null);
    expect(computerSectionElement.querySelector("app-x-symbol")).toBe(null);
  });

  it("should display the score correctly", () => {
    component.humanPlayerSymbol = "x";
    component.xNumberOfWins = 1;
    component.oNumberOfWins = 0;

    fixture.detectChanges();

    const scoreSectionElement = fixture.nativeElement.querySelector(".score");

    expect(scoreSectionElement.textContent).toBe("1:0");
  });

  it("increasePlayerScore() should update the score for the correct player", () => {
    component.humanPlayerSymbol = "x";
    component.xNumberOfWins = 0;
    component.oNumberOfWins = 0;

    fixture.detectChanges();

    component.increasePlayerScore("x");
    expect(component.xNumberOfWins).toBe(1);

    component.increasePlayerScore("o");
    expect(component.oNumberOfWins).toBe(1);
  });
});
