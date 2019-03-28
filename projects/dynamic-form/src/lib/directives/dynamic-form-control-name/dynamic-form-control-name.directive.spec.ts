import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective } from '@angular/forms';

import { ComponentFactoryResolverMock, MockViewContainerRef, TestDynamicControlComponent } from '../../mocks';
import { DynamicFormControlNameDirective } from './dynamic-form-control-name.directive';

@Injectable()
class DynamicFormControlInheritorDirective extends DynamicFormControlNameDirective {
  protected registerComponentControl = jasmine.createSpy('registerComponentControl');

  get registerComponentControlFunc() {
    return this.registerComponentControl;
  }
}

describe('AbstractDynamicFormControlDirective', () => {
  let directive: DynamicFormControlInheritorDirective;
  let componentFactoryResolver: ComponentFactoryResolver;
  let viewContainerRef: ViewContainerRef;
  let valueAccessor: ControlValueAccessor;
  let formGroupDirective: FormGroupDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        DynamicFormControlInheritorDirective,
        { provide: ComponentFactoryResolver, useClass: ComponentFactoryResolverMock },
        { provide: ViewContainerRef, useClass: MockViewContainerRef },
        {
          provide: NG_VALUE_ACCESSOR,
          useClass: TestDynamicControlComponent,
          multi: true
        },
        { provide: FormGroupDirective, useClass: {} }
      ]
    });

    directive = TestBed.get(DynamicFormControlInheritorDirective);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    viewContainerRef = TestBed.get(ViewContainerRef);
    valueAccessor = TestBed.get(NG_VALUE_ACCESSOR);
    formGroupDirective = TestBed.get(FormGroupDirective);
  });

  describe('ngOnChanges function', () => {
    it('should call registerComponentControl with control got from FormGroupDirective', () => {
      debugger;
      directive.dynamicFormControlName = '';
      const controlToReturn = {};
      formGroupDirective.control.get = jasmine.createSpy('get').and.returnValue(controlToReturn);

      directive.ngOnChanges();

      expect(directive.registerComponentControlFunc).toHaveBeenCalledWith(controlToReturn);
    });
  });
});
