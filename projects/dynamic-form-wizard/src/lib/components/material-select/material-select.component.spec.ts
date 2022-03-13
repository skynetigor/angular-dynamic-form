import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MaterialSelectComponent } from "./material-select.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("MaterialSelectComponent", () => {

  let fixture: ComponentFixture<MaterialSelectComponent>;
  let component: MaterialSelectComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [MaterialSelectComponent]
    });

    fixture = TestBed.createComponent(MaterialSelectComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
