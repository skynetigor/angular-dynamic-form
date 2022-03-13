import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ControlConfigurationComponent } from "./control-configuration.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ControlConfigurationComponent", () => {

  let fixture: ComponentFixture<ControlConfigurationComponent>;
  let component: ControlConfigurationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ControlConfigurationComponent]
    });

    fixture = TestBed.createComponent(ControlConfigurationComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
