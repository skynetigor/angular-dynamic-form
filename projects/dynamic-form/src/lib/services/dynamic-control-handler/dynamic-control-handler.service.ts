import { ComponentFactory, ComponentRef, Injectable, OnDestroy, KeyValueDiffers } from '@angular/core';
import { Subscription } from 'rxjs';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { AbstractDynamicControl } from '../../models';
import { setupControl } from '../../utils';

@Injectable()
export class DynamicControlHandlerService implements OnDestroy {
  constructor(
    private componentFactory: ComponentFactory<any>,
    private componentRef: ComponentRef<any>,
    private control: AbstractDynamicControl<any>
  ) {}

  private outputsSubscriptions: Subscription[] = [];

  initialize() {
    if (isString(this.control.name)) {
      this.componentRef.location.nativeElement.id = this.control.name;
    }

    const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
    this.componentRef.location.nativeElement.attributes.setNamedItem(dynamicControlAttr);

    setupControl(this.control, this.componentRef.instance);
  }

  doCheck() {
    if (this.control) {
      if (this.control.inputs) {
        this.componentFactory.inputs.forEach(prop => {
          const key = prop.propName;
          if (this.control.inputs.hasOwnProperty(key) && this.componentRef.instance[key] !== this.control.inputs[key]) {
            this.componentRef.instance[key] = this.control.inputs[key];
          }
        });
      }

      this.unsubscribeFromOutputsSubscription();

      if (this.control.outputs) {
        this.componentFactory.outputs.forEach(prop => {
          const key = prop.propName;

          if (this.control.outputs[key]) {
            this.outputsSubscriptions.push(
              this.componentRef.instance[key].subscribe(this.control.outputs[key].bind(this.componentRef.instance))
            );
          }
        });
      } else {
        this.unsubscribeFromOutputsSubscription();
      }
    }

    const compNativeElem: HTMLElement = this.componentRef.location.nativeElement;

    // if (this.control.isDisplayed && compNativeElem.style.display === 'none') {
    //   compNativeElem.style.removeProperty('display');
    // } else if (!this.control.isDisplayed && compNativeElem.style.display !== 'none') {
    //   compNativeElem.style.setProperty('display', 'none');
    // }
  }

  private unsubscribeFromOutputsSubscription() {
    this.outputsSubscriptions.forEach(s => s.unsubscribe());
  }

  ngOnDestroy() {}
}
