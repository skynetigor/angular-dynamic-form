import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ControlWrapperComponent } from "./control-wrapper.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ControlWrapperComponent", () => {

  let fixture: ComponentFixture<ControlWrapperComponent>;
  let component: ControlWrapperComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ControlWrapperComponent]
    });

    fixture = TestBed.createComponent(ControlWrapperComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
