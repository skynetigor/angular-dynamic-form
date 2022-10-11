import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleFormNgTemplateComponent } from './simple-form-ng-template.component';

describe('SimpleFormComponent', () => {
  let fixture: ComponentFixture<SimpleFormNgTemplateComponent>;
  let component: SimpleFormNgTemplateComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [SimpleFormNgTemplateComponent]
    });

    fixture = TestBed.createComponent(SimpleFormNgTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should be able to create component instance', () => {
    expect(component).toBeDefined();
  });
});
