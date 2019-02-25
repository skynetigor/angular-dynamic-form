import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TemplateWrapperComponent } from "./template-wrapper.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TemplateWrapperComponent", () => {

  let fixture: ComponentFixture<TemplateWrapperComponent>;
  let component: TemplateWrapperComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TemplateWrapperComponent]
    });

    fixture = TestBed.createComponent(TemplateWrapperComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
