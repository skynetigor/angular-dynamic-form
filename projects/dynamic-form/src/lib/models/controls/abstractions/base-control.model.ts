import { AbstractControl } from '@angular/forms';

import { IBaseControl } from '../interfaces';
import { ComponentController } from './component-controller';

export class BaseControlModel<TValue, TInterface extends IBaseControl<TValue>> extends ComponentController<
  TInterface,
  any
> {
  formControl: AbstractControl;
  isDisplayed: boolean;

  constructor(config: TInterface, componentType) {
    super(componentType, config);
  }
}
