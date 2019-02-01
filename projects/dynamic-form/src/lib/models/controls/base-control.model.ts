import { ComponentRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { ComponentController } from './component-controller';
import { dynamicControlClassName, dynamicControlHiddenAttrName } from '../../constants';

export class BaseControlModel<TInterface> extends ComponentController<TInterface, any> {
  private _name: string;
  private _isDisplayed = true;
  private _dynamicControlHiddenAttr = document.createAttribute(dynamicControlHiddenAttrName);

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
        componentNativeElement.attributes.removeNamedItem(dynamicControlHiddenAttrName);
      } else {
        componentNativeElement.attributes.setNamedItem(this._dynamicControlHiddenAttr);
      }

      this._isDisplayed = v;
    }
  }

  public get name() {
    return this._name;
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
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;
    componentNativeElement.classList.add(dynamicControlClassName);
    componentNativeElement.classList.add(this.name);
  }
}
