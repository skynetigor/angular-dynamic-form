import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'lib-test-component',
  template: ``
  //   providers: [
  //     {
  //       provide: NG_VALUE_ACCESSOR,
  //       useExisting: forwardRef(() => TestDynamicControlComponent),
  //       multi: true
  //     }
  //   ]
})
export class TestDynamicControlComponent implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
