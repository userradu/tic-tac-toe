import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { XSymbolComponent } from "./x-symbol.component";

describe("XSymbolComponent", () => {
  let component: XSymbolComponent;
  let fixture: ComponentFixture<XSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XSymbolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
