import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Self,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControl]', providers: [formControlBinding], exportAs: 'ngForm' })
export class DynamicFormControlDirective extends NgControl implements OnChanges {
  get control() {
    return this.dynamicFormControl;
  }

  @Input()
  dynamicFormControl: AbstractDynamicControl<any, any, any>;

  constructor(
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
    this.valueAccessor = valueAccessor[0];
  }

  ngOnChanges() {
    if (!(this.dynamicFormControl instanceof AbstractDynamicControl)) {
      throw new Error('dynamicFormControl should be an inheritor of BaseControlModel');
    }

    const valueAccessor = this.valueAccessor;

    const componentType = (valueAccessor as any).__proto__.constructor;

    const changeDetector = this.viewContainerRef.injector.get(ChangeDetectorRef);

    const dynamicComponentRef: IDynamicComponentRef = {
      instance: valueAccessor,
      injector: this.viewContainerRef.injector,
      location: this.viewContainerRef.element,
      componentType: componentType,
      changeDetectorRef: changeDetector
    };

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<any>(componentType);
    this.dynamicFormControl.componetController.setComponentFactory(componentFactory);
    this.dynamicFormControl.componetController.registerComponent(dynamicComponentRef);
  }

  viewToModelUpdate(newValue: any): void {}
}
