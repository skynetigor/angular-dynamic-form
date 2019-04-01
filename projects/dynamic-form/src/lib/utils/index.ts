import { AbstractDynamicControl, TemplateModel } from '../models/controls';
import { ControlValueAccessor } from '@angular/forms';

export function isControl(v: any) {
  return v instanceof AbstractDynamicControl;
}

export function isTemplate(v: any) {
  return v instanceof TemplateModel;
}

export function setupControl(control: AbstractDynamicControl<any>, valueAccessor: ControlValueAccessor) {
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
