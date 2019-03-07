import { AbstractDynamicControl, IControlConfiguration } from 'dynamic-form';

import { BootstrapDropdownComponent } from '../components';
import { IBootstrapDropdownInputs } from '../interfaces';
import { isArray } from 'util';

export class BootstrapDropdownControlModel<T, TValue = any> extends AbstractDynamicControl<
  BootstrapDropdownComponent,
  IBootstrapDropdownInputs<T>,
  TValue[]
> {
  constructor(config: IControlConfiguration<IBootstrapDropdownInputs<T>, TValue[]>) {
    super(config, BootstrapDropdownComponent);
    this.setValue(isArray(config.initialValue) ? config.initialValue : [], { emitEvent: false });
  }
}
