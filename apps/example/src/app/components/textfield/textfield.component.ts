/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'textfield-control',
  template: `
    <div class="flex flex-col gap-1">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <input
        class="block w-full border border-gray-300 rounded-md sm:text-sm shadow-sm outline-indigo-500 p-3"
        [disabled]="isDisabled"
        [type]="type"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [disabled]="isDisabled"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
})
export class TextfieldComponent implements ControlValueAccessor {
  private _value: string;

  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  isDisabled: boolean;

  @Input()
  label: string;

  @Input()
  placeholder = '';

  @Input()
  type: 'text' | 'number' = 'text';

  onChange = (_) => {};

  onTouch = () => {};

  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
