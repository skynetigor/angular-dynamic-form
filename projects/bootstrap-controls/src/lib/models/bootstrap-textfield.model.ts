import { IBootstrapTextfieldInputs } from '../interfaces';
import { AbstractDynamicControl, IControlConfiguration } from 'dynamic-form';
import { BootstrapTextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends AbstractDynamicControl<
  BootstrapTextfieldComponent,
  IBootstrapTextfieldInputs,
  any,
  string
> {
  constructor(config: IControlConfiguration<IBootstrapTextfieldInputs, any, string>) {
    super(config, BootstrapTextfieldComponent);
  }
}
