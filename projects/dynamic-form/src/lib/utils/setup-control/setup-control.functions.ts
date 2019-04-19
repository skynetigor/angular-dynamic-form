import { ControlValueAccessor, FormControl } from '@angular/forms';

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

  if (valueAccessor.registerOnTouched) {
  }

  if (valueAccessor.setDisabledState) {
    control.registerOnDisabledChange(v => {
      valueAccessor.setDisabledState(v);
    });
  }
}
