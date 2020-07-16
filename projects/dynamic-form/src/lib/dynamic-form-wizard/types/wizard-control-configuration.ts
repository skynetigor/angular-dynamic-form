import { ControlConfiguration } from '../../dynamic-form/types';

export interface WizardControlConfiguration extends ControlConfiguration<any, any, any> {
    info: {
        controlName: string;
    };
}
