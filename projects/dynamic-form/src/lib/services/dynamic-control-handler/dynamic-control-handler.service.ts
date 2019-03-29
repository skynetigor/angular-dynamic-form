import { ComponentFactory, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { AbstractDynamicControl } from '../../models';
import { IDynamicComponentRef } from '../../types';

@Injectable()
export class DynamicControlHandlerService implements OnDestroy {
  constructor(
    private componentFactory: ComponentFactory<any>,
    private dynamicComponentRef: IDynamicComponentRef,
    private control: AbstractDynamicControl<any>
  ) {}

  private outputsSubscriptions: Subscription[] = [];

  initialize() {
    if (isString(this.control.name)) {
      this.dynamicComponentRef.location.nativeElement.id = this.control.name;
    }

    const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
    this.dynamicComponentRef.location.nativeElement.attributes.setNamedItem(dynamicControlAttr);

    if (this.dynamicComponentRef.instance.registerOnChange) {
      this.control.registerOnChange(v => {
        this.dynamicComponentRef.instance.writeValue(v);
        this.dynamicComponentRef.changeDetectorRef.markForCheck();
      });

      this.dynamicComponentRef.instance.registerOnChange(v => {
        this.control.setValue(v);
      });

      this.dynamicComponentRef.instance.writeValue(this.control.value);
    }

    if (this.dynamicComponentRef.instance.registerOnTouched) {
    }

    if (this.dynamicComponentRef.instance.setDisabledState) {
      this.control.registerOnDisabledChange(v => {
        this.dynamicComponentRef.instance.setDisabledState(v);
        this.dynamicComponentRef.changeDetectorRef.markForCheck();
      });
    }
  }

  doCheck() {
    if (this.control) {
      if (this.control.inputs) {
        this.componentFactory.inputs.forEach(prop => {
          const key = prop.propName;
          if (
            this.control.inputs.hasOwnProperty(key) &&
            this.dynamicComponentRef.instance[key] !== this.control.inputs[key]
          ) {
            this.dynamicComponentRef.instance[key] = this.control.inputs[key];
          }
        });
      }

      this.unsubscribeFromOutputsSubscription();

      if (this.control.outputs) {
        this.componentFactory.outputs.forEach(prop => {
          const key = prop.propName;

          if (this.control.outputs[key]) {
            this.outputsSubscriptions.push(
              this.dynamicComponentRef.instance[key].subscribe(
                this.control.outputs[key].bind(this.dynamicComponentRef.instance)
              )
            );
          }
        });
      }
    }

    const compNativeElem: HTMLElement = this.dynamicComponentRef.location.nativeElement;

    if (this.control.isDisplayed && compNativeElem.style.display === 'none') {
      compNativeElem.style.removeProperty('display');
    } else if (!this.control.isDisplayed && compNativeElem.style.display !== 'none') {
      compNativeElem.style.setProperty('display', 'none');
    }
  }

  private unsubscribeFromOutputsSubscription() {
    this.outputsSubscriptions.forEach(s => s.unsubscribe());
  }

  ngOnDestroy() {}
}
