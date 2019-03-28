import { ComponentFactory, ComponentFactoryResolver, DoCheck, Injectable, OnChanges, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';

@Injectable()
export abstract class AbstractDynamicFormControlDirective extends NgControl implements OnChanges, OnDestroy, DoCheck {
  protected subscriptions: Subscription[] = [];
  private outputsSubscriptions: Subscription[] = [];
  private componentRef: IDynamicComponentRef<any>;
  private compFactory: ComponentFactory<any>;

  private _control;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  get control(): AbstractDynamicControl<any> {
    return this._control;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(t => t.unsubscribe());
  }

  abstract ngOnChanges();

  protected registerComponentControl(
    dynamicComponentRef: IDynamicComponentRef<any>,
    control: AbstractDynamicControl<any>
  ) {
    if (!(control instanceof AbstractDynamicControl)) {
      throw new Error('dynamicFormControl should be an inheritor of BaseControlModel');
    }

    this._control = control;
    this.componentRef = dynamicComponentRef;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(control.componentType);
    this.compFactory = componentFactory;

    this.registerValueAccessor(dynamicComponentRef, control);
  }

  private unsubscribeFromOutputsSubscription() {
    this.outputsSubscriptions.forEach(s => s.unsubscribe());
  }

  // IMPLEMENT DIFFERS!!!!
  ngDoCheck() {
    if (this.control) {
      if (this.control.inputs) {
        this.compFactory.inputs.forEach(prop => {
          const key = prop.propName;
          if (this.control.inputs.hasOwnProperty(key) && this.componentRef.instance[key] !== this.control.inputs[key]) {
            this.componentRef.instance[key] = this.control.inputs[key];
          }
        });
      }

      this.unsubscribeFromOutputsSubscription();

      if (this.control.outputs) {
        this.compFactory.outputs.forEach(prop => {
          const key = prop.propName;

          if (this.control.outputs[key]) {
            this.outputsSubscriptions.push(
              this.componentRef.instance[key].subscribe(this.control.outputs[key].bind(this.componentRef.instance))
            );
          }
        });
      }

      const compNativeElem: HTMLElement = this.componentRef.location.nativeElement;

      if (this.control.isDisplayed && compNativeElem.style.display === 'none') {
        compNativeElem.style.removeProperty('display');
      } else if (!this.control.isDisplayed && compNativeElem.style.display !== 'none') {
        compNativeElem.style.setProperty('display', 'none');
      }
    }
  }

  private registerValueAccessor(dynamicComponentRef: IDynamicComponentRef<any>, control: AbstractDynamicControl<any>) {
    if (isString(control.name)) {
      dynamicComponentRef.location.nativeElement.id = control.name;
    }

    const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
    dynamicComponentRef.location.nativeElement.attributes.setNamedItem(dynamicControlAttr);

    if (dynamicComponentRef.instance.registerOnChange) {
      control.registerOnChange(v => {
        dynamicComponentRef.instance.writeValue(v);
        dynamicComponentRef.changeDetectorRef.markForCheck();
      });

      dynamicComponentRef.instance.registerOnChange(v => {
        control.setValue(v);
      });

      dynamicComponentRef.instance.writeValue(control.value);
    }

    if (dynamicComponentRef.instance.registerOnTouched) {
    }

    if (dynamicComponentRef.instance.setDisabledState) {
      control.registerOnDisabledChange(v => {
        dynamicComponentRef.instance.setDisabledState(v);
        dynamicComponentRef.changeDetectorRef.markForCheck();
      });
    }
  }

  viewToModelUpdate(newValue: any): void {}
}
