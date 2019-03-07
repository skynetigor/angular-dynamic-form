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

import { AbstractDynamicControl, DynamicFormGroup } from '../../models';
import { IDynamicComponentRef } from '../../types';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlNameDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlName]', providers: [formControlBinding], exportAs: 'ngForm' })
export class DynamicFormControlNameDirective extends NgControl implements OnChanges {
  private _control: AbstractDynamicControl<any>;

  get control() {
    return this._control;
  }

  @Input()
  dynamicFormControlName: string;

  constructor(
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private formGroup: FormGroupDirective
  ) {
    super();
    this.valueAccessor = valueAccessor[0];
  }

  ngOnChanges() {
    if (!(this.formGroup.control instanceof DynamicFormGroup)) {
      throw new Error(
        'DynamicFormControlNameDirective directive requires FormGroupDirective as parent with DynamicFormGroup as value'
      );
    }

    this._control = this.formGroup.control.get(this.dynamicFormControlName);

    const valueAccessor = this.valueAccessor;
    if (valueAccessor.registerOnChange) {
      this.control.registerOnChange(v => valueAccessor.writeValue(v));
      valueAccessor.registerOnChange(v => {
        this.control.setValue(v);
      });
    }
    if (valueAccessor.registerOnTouched) {
    }
    if (valueAccessor.setDisabledState) {
      this.control.registerOnDisabledChange(v => valueAccessor.setDisabledState(v));
    }
    const componentType = (valueAccessor as any).__proto__.constructor;

    const changeDetector = this.viewContainerRef.injector.get(ChangeDetectorRef);

    const componentRef: IDynamicComponentRef = {
      instance: valueAccessor,
      injector: this.viewContainerRef.injector,
      location: this.viewContainerRef.element,
      componentType: componentType,
      changeDetectorRef: changeDetector
    };

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.control.componetController.registerComponent(
      componentRef,
      componentFactory.inputs.map(t => t.propName),
      componentFactory.outputs.map(t => t.propName)
    );
  }

  viewToModelUpdate(newValue: any): void {}
}
