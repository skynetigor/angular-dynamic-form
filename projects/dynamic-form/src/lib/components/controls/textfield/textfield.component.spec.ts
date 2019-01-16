import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { FabricTextfieldComponent } from './fabric-textfield.component';

@Component({
  selector: 'pxl-test-component',
  template: `
    <form [formGroup]="form">
    <pxl-fabric-textfield [label]="label" [required]="required" [isDisabled]="isDisabled" formControlName="testControl"></pxl-fabric-textfield>
    </form>
    `
})
class TestFabricTextFieldComponent {
  form: FormGroup;
  label: string;
  required: boolean;
  isDisabled: boolean;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      testControl: ['']
    });
  }
}

describe('FabricTextfieldComponent', () => {
  let fixture: ComponentFixture<TestFabricTextFieldComponent>;
  let component: TestFabricTextFieldComponent;
  let formControl: AbstractControl;
  let textFieldNativeElement: HTMLTextAreaElement;

  const getHtmlElement = (selector: string) => {
    return fixture.debugElement.query(By.directive(FabricTextfieldComponent)).query(By.css(selector));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FabricTextfieldComponent, TestFabricTextFieldComponent],
      imports: [BrowserModule, FormsModule, ReactiveFormsModule],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestFabricTextFieldComponent);
        component = fixture.componentInstance;
        formControl = component.form.get('testControl');
        textFieldNativeElement = getHtmlElement('input[type="text"].ms-TextField-field').nativeElement;
      });
  }));

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should change value', async () => {
    const toCheck = 'test text';

    formControl.setValue(toCheck);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(textFieldNativeElement.value).toBe(toCheck);
  });

  it('should add "is-disabled" to textarea if control was disabled', () => {
    formControl.enable();
    formControl.disable();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div.ms-TextField')).nativeElement.classList).toContain('is-disabled');
  });

  it('should remove "is-disabled" from textarea if control was disabled', () => {
    formControl.disable();
    formControl.enable();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div.ms-TextField')).nativeElement.classList).not.toContain('is-disabled');
  });

  it('should contain label if it is specified', async () => {
    expect(component.label).toBeUndefined();

    expect(getHtmlElement('header')).toBeNull();

    const testLabel = 'Test label';
    component.label = testLabel;
    fixture.detectChanges();

    await fixture.whenStable();

    const nativeElement: HTMLElement = getHtmlElement('header.ms-Label > span').nativeElement;
    expect(nativeElement).toBeDefined();
    expect(nativeElement.childNodes[0].nodeValue).toEqual(testLabel);
  });

  it('should add " - Optional" to header if label is specified and control value is required', async () => {
    component.required = true;

    expect(component.label).toBeUndefined();
    expect(getHtmlElement('header > span.optional')).toBeNull();

    component.label = 'Test label';
    component.required = false;

    fixture.detectChanges();

    await fixture.whenStable();

    const nativeElement: HTMLElement = getHtmlElement('header > span.optional').nativeElement;
    expect(nativeElement).toBeDefined();
    expect(nativeElement.innerText).toEqual(' - Optional');
  });
});
