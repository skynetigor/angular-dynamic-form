import { IBootstrapTextfieldInputs } from '../interfaces';
import { BaseControlModel, IControlConfiguration } from 'dynamic-form';
import { BootstrapTextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends BaseControlModel<
  BootstrapTextfieldComponent,
  IBootstrapTextfieldInputs,
  string
> {
  constructor(config: IControlConfiguration<IBootstrapTextfieldInputs, string>) {
    super(config, BootstrapTextfieldComponent);
  }
}
