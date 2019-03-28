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
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';
import { AbstractDynamicFormControlDirective } from '../abstract-dynamic-form-control/abstract-dynamic-form-control.directive';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlNameDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlName]', providers: [formControlBinding], exportAs: 'ngForm' })
export class DynamicFormControlNameDirective extends AbstractDynamicFormControlDirective implements OnChanges {
  @Input()
  dynamicFormControlName: string;

  constructor(
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    private viewContainerRef: ViewContainerRef,
    private formGroup: FormGroupDirective,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(componentFactoryResolver);
    this.valueAccessor = valueAccessor[0];
  }

  ngOnChanges() {
    const _control = <AbstractDynamicControl<any>>this.formGroup.control.get(this.dynamicFormControlName);

    const componentType = (this.valueAccessor as any).constructor;
    const changeDetector: ChangeDetectorRef = this.viewContainerRef.injector.get(ChangeDetectorRef);

    const dynamicComponentRef: IDynamicComponentRef<any> = {
      instance: this.valueAccessor,
      location: this.viewContainerRef.element,
      injector: this.viewContainerRef.injector,
      componentType: componentType,
      changeDetectorRef: changeDetector
    };

    this.registerComponentControl(dynamicComponentRef, <AbstractDynamicControl<any>>_control);
  }

  viewToModelUpdate(newValue: any): void {}
}
