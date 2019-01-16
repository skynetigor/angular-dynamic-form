import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicFormComponent } from './form-renderer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('FormRendererComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [DynamicFormComponent]
    });

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
