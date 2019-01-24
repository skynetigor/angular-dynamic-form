import { IBootstrapDropdownControl } from '../interfaces';
import { BootstrapDropdownComponent } from '../components';
import { BaseControlModel } from 'dynamic-form';

export class BootstrapDropdownControlModel<T> extends BaseControlModel<IBootstrapDropdownControl<T>> {
  constructor(config: IBootstrapDropdownControl<T>) {
    super(config, BootstrapDropdownComponent);
  }
}
