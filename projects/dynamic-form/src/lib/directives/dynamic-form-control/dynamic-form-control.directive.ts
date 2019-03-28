import {
  ChangeDetectorRef,
  Directive,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Self,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';
import { AbstractDynamicFormControlDirective } from '../abstract-dynamic-form-control/abstract-dynamic-form-control.directive';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControl]', providers: [formControlBinding], exportAs: 'ngForm' })
export class DynamicFormControlDirective extends AbstractDynamicFormControlDirective implements OnChanges {
  @Input()
  dynamicFormControl: AbstractDynamicControl<any, any, any>;

  constructor(
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    private viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(componentFactoryResolver);
    this.valueAccessor = valueAccessor[0];
  }

  ngOnChanges() {
    const componentType = (this.valueAccessor as any).constructor;
    const changeDetector: ChangeDetectorRef = this.viewContainerRef.injector.get(ChangeDetectorRef);

    const dynamicComponentRef: IDynamicComponentRef<any> = {
      instance: this.valueAccessor,
      location: this.viewContainerRef.element,
      injector: this.viewContainerRef.injector,
      componentType: componentType,
      changeDetectorRef: changeDetector
    };

    this.registerComponentControl(dynamicComponentRef, this.dynamicFormControl);
  }

  viewToModelUpdate(newValue: any): void {}
}
