import { ControlValueAccessor, FormControl } from '@angular/forms';
import { isFunction } from '../is-function/is-function';

/**
 * Function that binds value accessor on state changes of form control
 * @param control A form control that value accessor will be subscribed on state changes of
 * @param valueAccessor Value accessor
 */
export function setupControl(control: FormControl, valueAccessor: ControlValueAccessor): void {
    if (isFunction(valueAccessor.registerOnChange)) {
        valueAccessor.registerOnChange(v => {
            control.setValue(v, { emitModelToViewChange: false });
        });
    }

    if (isFunction(valueAccessor.setDisabledState)) {
        control.registerOnDisabledChange(v => {
            valueAccessor.setDisabledState(v);
        });
    }

    control.registerOnChange(v => {
        valueAccessor.writeValue(v);
    });

    valueAccessor.writeValue(control.value);
    valueAccessor.setDisabledState(control.disabled);
}
