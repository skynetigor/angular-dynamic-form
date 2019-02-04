import { BaseControlModel, IControlConfiguration } from 'dynamic-form';

import { BootstrapDropdownComponent } from '../components';
import { IBootstrapDropdownInputs } from '../interfaces';

export class BootstrapDropdownControlModel<T> extends BaseControlModel<
  BootstrapDropdownComponent,
  IBootstrapDropdownInputs<T>
> {
  constructor(config: IControlConfiguration<IBootstrapDropdownInputs<T>>) {
    super(config, BootstrapDropdownComponent);
  }
}
