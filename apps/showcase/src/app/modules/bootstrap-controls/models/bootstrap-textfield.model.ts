import { DynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';

import { BootstrapTextfieldComponent } from '../components';
import { IBootstrapTextfieldInputs } from '../interfaces';

export class BootstrapTextFieldModel extends DynamicControl<BootstrapTextfieldComponent, IBootstrapTextfieldInputs, any, string> {
    constructor(config: ControlConfiguration<IBootstrapTextfieldInputs, any, string>) {
        super(config, BootstrapTextfieldComponent);
    }
}
