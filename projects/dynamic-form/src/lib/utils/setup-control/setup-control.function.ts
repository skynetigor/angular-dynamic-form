import { ControlValueAccessor, FormControl } from '@angular/forms';

/**
 * Function that binds value accessor on state changes of form control
 * @param control A form control that value accessor will be subscribed on state changes of
 * @param valueAccessor Value accessor
 */
export function setupControl(control: FormControl, valueAccessor: ControlValueAccessor) {
    if (valueAccessor.registerOnChange) {
        control.registerOnChange(v => {
            valueAccessor.writeValue(v);
        });

        valueAccessor.registerOnChange(v => {
            control.setValue(v);
        });

        valueAccessor.writeValue(control.value);
    }

    if (valueAccessor.setDisabledState) {
        control.registerOnDisabledChange(v => {
            valueAccessor.setDisabledState(v);
        });
    }
}
