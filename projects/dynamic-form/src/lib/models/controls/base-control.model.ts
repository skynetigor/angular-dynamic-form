import { ComponentRef, Type } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidatorFn, ControlValueAccessor } from '@angular/forms';

import { dynamicControlAttrName, dynamicComponentHiddenAttrName } from '../../constants';
import { ComponentController } from './component-controller';
import { IControlConfiguration } from '../../types';

export class BaseControlModel<
  TControlComponent extends ControlValueAccessor,
  TInterface = any
> extends ComponentController<TControlComponent, TInterface, any> {
  private _isDisplayed = true;

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
        const dynamicControlHiddenAttr = document.createAttribute(dynamicComponentHiddenAttrName);
        componentNativeElement.attributes.setNamedItem(dynamicControlHiddenAttr);
      }

      this._isDisplayed = v;
    }
  }

  constructor(config: IControlConfiguration<TInterface>, componentType: Type<TControlComponent>) {
    super(componentType, config.initialInputs);

    this.validators = config.validators;
    this.asyncValidators = config.asyncValidators;
  }

  protected componentRegistered(
    componentRef: ComponentRef<any>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    super.componentRegistered(componentRef, inputsProperties, outputsProperties);
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;
    const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);

    componentNativeElement.attributes.setNamedItem(dynamicControlAttr);
  }
}
