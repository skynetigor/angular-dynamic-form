import { AbstractDynamicControl, IControlConfiguration } from 'dynamic-form';

import { BootstrapDropdownComponent } from '../components';
import { IBootstrapDropdownInputs } from '../interfaces';

export class BootstrapDropdownControlModel<T, TValue = any> extends AbstractDynamicControl<
  BootstrapDropdownComponent,
  IBootstrapDropdownInputs<T>,
  any,
  TValue[]
> {
  constructor(config: IControlConfiguration<IBootstrapDropdownInputs<T>, TValue[]>) {
    super(config, BootstrapDropdownComponent);
    this.setValue(config.initialValue, { emitEvent: false });
  }
}
