import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlModel } from '../../models';
import { IDynamicComponentRef } from '../../types';
import { isNullOrUndefined } from 'util';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlOutlet]', providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends NgControl implements OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];

  get control() {
    return this.dynamicFormControlOutlet;
  }

  @Input()
  dynamicFormControlOutlet: BaseControlModel<any, any, any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
    super();
  }

  ngOnChanges() {
    if (isNullOrUndefined(this.dynamicFormControlOutlet)) {
      this.viewContainerRef.clear();
    } else if (this.dynamicFormControlOutlet && !(this.dynamicFormControlOutlet instanceof BaseControlModel)) {
      throw new Error(
        `DynamicFormControlOutlet requires an inheritor of BaseControlModel, but it was "${
          (this.dynamicFormControlOutlet as any).__proto__.constructor.name
        }"`
      );
    }

    const subscriptions = this.dynamicFormControlOutlet.componetController.componentTypeChanged$.subscribe(
      componentType => {
        this.viewContainerRef.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef: ComponentRef<ControlValueAccessor> = <ComponentRef<ControlValueAccessor>>(
          this.viewContainerRef.createComponent(
            componentFactory,
            undefined,
            Injector.create({
              providers: [{ provide: NgControl, useValue: this }],
              parent: this.injector
            })
          )
        );

        const dynamicComponentRef: IDynamicComponentRef = {
          instance: componentRef.instance,
          injector: componentRef.injector,
          location: componentRef.location,
          componentType: componentRef.componentType,
          changeDetectorRef: componentRef.changeDetectorRef
        };

        this.registerValueAccessor(
          dynamicComponentRef,
          componentFactory.inputs.map(t => t.propName),
          componentFactory.outputs.map(t => t.propName)
        );

        componentRef.instance.writeValue(this.dynamicFormControlOutlet.value);
      }
    );

    this.subscriptions.push(subscriptions);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  viewToModelUpdate(newValue: any): void {}

  private registerValueAccessor(dynamicComponentRef: IDynamicComponentRef, inputs: string[], outputs: string[]) {
    this.dynamicFormControlOutlet.componetController.registerComponent(dynamicComponentRef, inputs, outputs);

    const valueAccessor = <ControlValueAccessor>dynamicComponentRef.instance;

    if (valueAccessor.registerOnChange) {
      this.dynamicFormControlOutlet.registerOnChange(v => valueAccessor.writeValue(v));
      valueAccessor.registerOnChange(v => {
        this.dynamicFormControlOutlet.setValue(v);
      });
    }
    if (valueAccessor.registerOnTouched) {
    }
    if (valueAccessor.setDisabledState) {
      this.dynamicFormControlOutlet.registerOnDisabledChange(v => valueAccessor.setDisabledState(v));
    }
  }
}
