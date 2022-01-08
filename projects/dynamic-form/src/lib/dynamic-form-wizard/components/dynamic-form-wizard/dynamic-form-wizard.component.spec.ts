import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DynamicFormWizardComponent } from "./dynamic-form-wizard.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("DynamicFormWizardComponent", () => {

  let fixture: ComponentFixture<DynamicFormWizardComponent>;
  let component: DynamicFormWizardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DynamicFormWizardComponent]
    });

    fixture = TestBed.createComponent(DynamicFormWizardComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
