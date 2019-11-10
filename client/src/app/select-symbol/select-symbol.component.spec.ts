import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectSymbolComponent } from "./select-symbol.component";

describe("SelectSymbolComponent", () => {
  let component: SelectSymbolComponent;
  let fixture: ComponentFixture<SelectSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSymbolComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
