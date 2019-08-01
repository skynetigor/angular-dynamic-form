import { AbstractDynamicControl, IControlConfiguration } from 'dynamic-form';

import { BootstrapTextfieldComponent } from '../components';
import { IBootstrapTextfieldInputs } from '../interfaces';

export class BootstrapTextFieldModel extends AbstractDynamicControl<BootstrapTextfieldComponent, IBootstrapTextfieldInputs, any, string> {
    constructor(config: IControlConfiguration<IBootstrapTextfieldInputs, any, string>) {
        super(config, BootstrapTextfieldComponent);
    }
}
