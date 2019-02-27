import {
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Self,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { BaseControlModel } from '../../models';

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
  dynamicFormControl: BaseControlModel<any, any, any>;

  constructor(
    @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessor: ControlValueAccessor[],
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    super();
    this.valueAccessor = valueAccessor[0];
  }

  ngOnChanges() {
    if (!(this.dynamicFormControl instanceof BaseControlModel)) {
      throw new Error('dynamicFormControl should be an inheritor of BaseControlModel');
    }

    const valueAccessor = this.valueAccessor;
    if (valueAccessor.registerOnChange) {
      this.dynamicFormControl.registerOnChange(v => valueAccessor.writeValue(v));
      valueAccessor.registerOnChange(v => {
        this.dynamicFormControl.setValue(v);
      });
    }
    if (valueAccessor.registerOnTouched) {
    }
    if (valueAccessor.setDisabledState) {
      this.dynamicFormControl.registerOnDisabledChange(v => valueAccessor.setDisabledState(v));
    }
    const componentType = (valueAccessor as any).__proto__.constructor;

    const changeDetector = this.viewContainerRef.injector.get(ChangeDetectorRef);

    const componentRef: any = {
      instance: valueAccessor,
      injector: this.viewContainerRef.injector,
      location: this.viewContainerRef.element,
      componentType: componentType,
      changeDetectorRef: changeDetector
    };

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.dynamicFormControl.componetController.registerComponent(
      componentRef,
      componentFactory.inputs.map(t => t.propName),
      componentFactory.outputs.map(t => t.propName)
    );
  }

  viewToModelUpdate(newValue: any): void {}
}
