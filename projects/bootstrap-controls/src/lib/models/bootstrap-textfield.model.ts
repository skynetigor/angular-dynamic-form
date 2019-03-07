import { IBootstrapTextfieldInputs } from '../interfaces';
import { AbstractDynamicControl, IControlConfiguration } from 'dynamic-form';
import { BootstrapTextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends AbstractDynamicControl<
  BootstrapTextfieldComponent,
  IBootstrapTextfieldInputs,
  string
> {
  constructor(config: IControlConfiguration<IBootstrapTextfieldInputs, string>) {
    super(config, BootstrapTextfieldComponent);
  }
}
