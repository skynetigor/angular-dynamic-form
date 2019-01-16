import { IDropDownControl } from '../interfaces';

import { DropdownComponent } from '../../../components';
import { BaseControlModel } from '../abstractions';

export class DropdownControlModel<T> extends BaseControlModel<T, IDropDownControl<T>> {
  constructor(config: IDropDownControl<T>) {
    super(config, DropdownComponent);
  }
}
