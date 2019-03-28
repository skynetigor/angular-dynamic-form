import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';
import { AbstractDynamicFormControlDirective } from '../abstract-dynamic-form-control/abstract-dynamic-form-control.directive';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlOutlet]', providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends AbstractDynamicFormControlDirective
  implements OnChanges, OnDestroy, OnInit {
  get control() {
    return this.dynamicFormControlOutlet;
  }

  @Input()
  dynamicFormControlOutlet: AbstractDynamicControl<any, any, any>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(componentFactoryResolver);
  }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (isNullOrUndefined(this.dynamicFormControlOutlet)) {
      this.viewContainerRef.clear();
    } else if (this.dynamicFormControlOutlet && !(this.dynamicFormControlOutlet instanceof AbstractDynamicControl)) {
      throw new Error(
        `DynamicFormControlOutlet requires an inheritor of BaseControlModel, but it was "${
          (this.dynamicFormControlOutlet as any).__proto__.constructor.name
        }"`
      );
    }

    this.viewContainerRef.clear();

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.control.componentType);

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

    this.registerComponentControl(dynamicComponentRef, this.control);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  viewToModelUpdate(newValue: any): void {}
}
