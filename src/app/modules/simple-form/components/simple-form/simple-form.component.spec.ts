import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SimpleFormComponent } from "./simple-form.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SimpleFormComponent", () => {

  let fixture: ComponentFixture<SimpleFormComponent>;
  let component: SimpleFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SimpleFormComponent]
    });

    fixture = TestBed.createComponent(SimpleFormComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
