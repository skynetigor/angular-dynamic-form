import { BootstrapDropdownComponent } from 'bootstrap-controls';
import { AbstractControlsFactory, AbstractDynamicControl, Config, ControlConfiguration, GenericDynamicControl } from 'dynamic-form';

export class ControlsFactory extends AbstractControlsFactory {
    createControl(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any, any, any, any> {
        if (def.viewType === 'select') {
            return new GenericDynamicControl({}, BootstrapDropdownComponent);
        }
    }
}
