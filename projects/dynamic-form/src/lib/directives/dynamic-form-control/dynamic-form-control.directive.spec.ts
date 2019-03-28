import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ComponentFactoryResolverMock, MockViewContainerRef, TestDynamicControlComponent } from '../../mocks';
import { DynamicFormControlDirective } from './dynamic-form-control.directive';

@Injectable()
class DynamicFormControlInheritorDirective extends DynamicFormControlDirective {
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
        }
      ]
    });

    directive = TestBed.get(DynamicFormControlInheritorDirective);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    viewContainerRef = TestBed.get(ViewContainerRef);
    valueAccessor = TestBed.get(NG_VALUE_ACCESSOR);
  });

  describe('ngOnChanges function', () => {
    it('should call registerComponentControl with dynamicFormControl', () => {
      directive.dynamicFormControl = <any>{};

      directive.ngOnChanges();

      expect(directive.registerComponentControlFunc).toHaveBeenCalledWith(directive.dynamicFormControl);
    });
  });
});
