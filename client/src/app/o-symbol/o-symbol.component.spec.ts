import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OSymbolComponent } from "./o-symbol.component";

describe("OSymbolComponent", () => {
  let component: OSymbolComponent;
  let fixture: ComponentFixture<OSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OSymbolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
