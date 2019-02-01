import { ComponentRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { dynamicControlAttrName, dynamicComponentHiddenAttrName } from '../../constants';
import { ComponentController } from './component-controller';

export class BaseControlModel<TInterface> extends ComponentController<TInterface, any> {
  private _isDisplayed = true;
  private _dynamicControlHiddenAttr = document.createAttribute(dynamicComponentHiddenAttrName);
  private _dynamicControlAttr = document.createAttribute(dynamicControlAttrName);

  formControl: AbstractControl;
  validators: ValidatorFn | ValidatorFn[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];

  get isDisplayed(): boolean {
    return this._isDisplayed;
  }
  set isDisplayed(v: boolean) {
    if (v !== this._isDisplayed) {
      const componentNativeElement = this.metadataObj.componentRef.location.nativeElement as HTMLElement;

      if (v) {
        componentNativeElement.attributes.removeNamedItem(dynamicComponentHiddenAttrName);
      } else {
        componentNativeElement.attributes.setNamedItem(this._dynamicControlHiddenAttr);
      }

      this._isDisplayed = v;
    }
  }

  get componentNativeElement(): HTMLElement {
    if (this.metadataObj.componentRef) {
      return this.metadataObj.componentRef.location.nativeElement;
    }
  }

  constructor(config: TInterface, componentType) {
    super(componentType, config);
  }

  protected componentRegistered(
    componentRef: ComponentRef<any>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    super.componentRegistered(componentRef, inputsProperties, outputsProperties);
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;

    componentNativeElement.attributes.setNamedItem(this._dynamicControlAttr);
  }
}
