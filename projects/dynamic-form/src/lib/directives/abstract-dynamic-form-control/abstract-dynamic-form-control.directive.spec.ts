import { ComponentFactoryResolver, Inject, Injectable, OnChanges, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractDynamicControl } from '../../models';
import { AbstractDynamicFormControlDirective } from './abstract-dynamic-form-control.directive';
import { MockViewContainerRef, TestDynamicControlComponent, ComponentFactoryResolverMock } from '../../mocks';
import { CommonModule } from '@angular/common';

@Injectable()
class AbstractDynamicFormControlDirectiveTestInheritor extends AbstractDynamicFormControlDirective
  implements OnChanges {
  get registerComponentControlFunc() {
    return this.registerComponentControl;
  }

  ngOnChanges() {}

  constructor(
    @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef
  ) {
    super(valueAccessor, componentFactoryResolver, viewContainerRef);
  }
}

class DynamicControlToTest extends AbstractDynamicControl<any, any> {
  constructor() {
    super({}, TestDynamicControlComponent);
  }
}

describe('AbstractDynamicFormControlDirective', () => {
  let directive: AbstractDynamicFormControlDirectiveTestInheritor;
  let componentFactoryResolver: ComponentFactoryResolver;
  let viewContainerRef: ViewContainerRef;
  let valueAccessor: ControlValueAccessor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        AbstractDynamicFormControlDirectiveTestInheritor,
        { provide: ComponentFactoryResolver, useClass: ComponentFactoryResolverMock },
        { provide: ViewContainerRef, useClass: MockViewContainerRef },
        {
          provide: NG_VALUE_ACCESSOR,
          useClass: TestDynamicControlComponent,
          multi: true
        }
      ]
    });

    directive = TestBed.get(AbstractDynamicFormControlDirectiveTestInheritor);
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    viewContainerRef = TestBed.get(ViewContainerRef);
    valueAccessor = TestBed.get(NG_VALUE_ACCESSOR);
  });

  describe('registerComponentControl function', () => {
    it('should set value accessor', () => {
      // Assert
      expect(directive.valueAccessor).toBe(valueAccessor[0]);
    });

    it('should register value accessor component in the given DynamicControl', () => {
      // Arrange
      const componentFactoryToReturn = {};
      const control: AbstractDynamicControl<any> = new DynamicControlToTest();
      (control as any).prototype = AbstractDynamicControl;
      const changeDetectorRefToReturn = {};
      control.componetController.registerComponent = jasmine.createSpy('registerComponent');
      const resolveComponentFactorySpy = spyOn(componentFactoryResolver, 'resolveComponentFactory').and.returnValue(
        componentFactoryToReturn
      );
      control.componetController.setComponentFactory = jasmine.createSpy('setComponentFactory');

      spyOn(viewContainerRef.injector, 'get').and.returnValue(changeDetectorRefToReturn);

      // Act
      directive.registerComponentControlFunc(control);

      // Assert
      expect(control.componetController.setComponentFactory).toHaveBeenCalledWith(componentFactoryToReturn);
      expect(resolveComponentFactorySpy).toHaveBeenCalledWith(TestDynamicControlComponent);
      expect(control.componetController.registerComponent).toHaveBeenCalled();
    });
  });
});
