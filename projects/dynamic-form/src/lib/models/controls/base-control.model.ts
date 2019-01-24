import { AbstractControl } from '@angular/forms';

import { ComponentController } from './component-controller';
import { ComponentRef } from '@angular/core';

export class BaseControlModel<TInterface> extends ComponentController<TInterface, any> {
  formControl: AbstractControl;
  isDisplayed: boolean;

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
  ) {}
}
