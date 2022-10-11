import { AbstractDynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';

import { BootstrapDropdownComponent } from '../components';
import { IBootstrapDropdownInputs } from '../interfaces';

export class BootstrapDropdownControlModel<T, TValue = any> extends AbstractDynamicControl<
  BootstrapDropdownComponent,
  IBootstrapDropdownInputs<T>,
  any,
  TValue[]
> {
  constructor(config: ControlConfiguration<IBootstrapDropdownInputs<T>, any, TValue[]>) {
    super(config, BootstrapDropdownComponent);
    this.setValue(config.initialValue, { emitEvent: false });
  }
}
