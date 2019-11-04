import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialTextFieldComponent } from './text-field.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TextFieldComponent', () => {
  let fixture: ComponentFixture<MaterialTextFieldComponent>;
  let component: MaterialTextFieldComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [MaterialTextFieldComponent]
    });

    fixture = TestBed.createComponent(MaterialTextFieldComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
