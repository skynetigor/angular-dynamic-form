import { Injectable } from '@angular/core';

import { AbstractDynamicControl, GenericDynamicControl } from '../../../../dynamic-form/models';
import { ControlConfiguration } from '../../../../dynamic-form/types';
import { MaterialSelectComponent } from '../../../components/material-select/material-select.component';
import { Config } from '../../../types';
import { AbstractControlProvider } from '../abstract-control-provider';

@Injectable()
export class SelectControlProvider extends AbstractControlProvider {
    create(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any, any, any, any> {
        const config = {
            initialInputs: {
                label: def.displayName,
                options: def.data,
                displayProperty: def.displayProperty,
                valueProperty: def.valueProperty,
                multiple: def.multiple
            },
            initialValue: currentConfig.initialValue
        };

        return new GenericDynamicControl(config, MaterialSelectComponent);
    }
}
