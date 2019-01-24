import { IBootstrapTextfieldControl } from '../interfaces';
import { BaseControlModel } from 'dynamic-form';
import { BootstrapTextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends BaseControlModel<IBootstrapTextfieldControl> {
  constructor(config: IBootstrapTextfieldControl) {
    super(config, BootstrapTextfieldComponent);
  }
}
