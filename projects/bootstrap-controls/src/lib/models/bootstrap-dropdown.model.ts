import { BaseControlModel } from 'dynamic-form';

import { BootstrapDropdownComponent } from '../components';
import { IBootstrapDropdownControl } from '../interfaces';

export class BootstrapDropdownControlModel<T> extends BaseControlModel<
  BootstrapDropdownComponent,
  IBootstrapDropdownControl<T>
> {
  constructor(config: IBootstrapDropdownControl<T>) {
    super(config, BootstrapDropdownComponent);
  }
}
