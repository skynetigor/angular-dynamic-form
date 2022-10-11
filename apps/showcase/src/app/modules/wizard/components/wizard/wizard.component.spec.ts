import { NO_ERRORS_SCHEMA } from "@angular/core";
import { WizardComponent } from "./wizard.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("WizardComponent", () => {

  let fixture: ComponentFixture<WizardComponent>;
  let component: WizardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [WizardComponent]
    });

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
