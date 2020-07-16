import { Injectable } from '@angular/core';

import { AbstractDynamicControl, GenericDynamicControl } from '../../../../dynamic-form/models';
import { ControlConfiguration } from '../../../../dynamic-form/types';
import { MaterialTextFieldComponent } from '../../../components/material-text-field/material-text-field.component';
import { Config } from '../../../types';
import { AbstractControlProvider } from '../abstract-control-provider';
import { Validators } from '@angular/forms';

@Injectable()
export class TextfieldControlProvider extends AbstractControlProvider {
    create(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any, any, any, any> {
        const validators = [];

        if (def.required) {
            validators.push(Validators.required);
        }

        const config: ControlConfiguration<any, any, any> = {
            initialInputs: {
                label: def.displayName
            },
            initialValue: currentConfig.initialValue,
            validators
        };

        return new GenericDynamicControl(config, MaterialTextFieldComponent);
    }
}
