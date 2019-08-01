import { NO_ERRORS_SCHEMA } from "@angular/core";
import { JsonEditorComponent } from "./json-editor.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("JsonEditorComponent", () => {

  let fixture: ComponentFixture<JsonEditorComponent>;
  let component: JsonEditorComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [JsonEditorComponent]
    });

    fixture = TestBed.createComponent(JsonEditorComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
