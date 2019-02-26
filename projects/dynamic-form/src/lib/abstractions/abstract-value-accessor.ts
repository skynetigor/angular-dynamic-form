import { forwardRef, Input, OnInit, Injector, Injectable, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NgControl } from '@angular/forms';

@Injectable()
export abstract class AbstractValueAccessor implements ControlValueAccessor, OnInit, AfterViewInit {
  dirty = false;

  @Input()
  errorTexts: { [key: string]: string };
  @Input()
  label: string;
  @Input()
  required = false;
  @Input()
  isDisabled = false;

  private _value: any = null;

  protected formControl: FormControl;

  constructor(private injector: Injector) {}

  get value(): any {
    return this._value;
  }
  set value(v: any) {
    if (v !== this._value) {
      this.writeValue(v);
      this.onChange(v);
    }
  }

  markAsDirty() {
    if (!this.dirty) {
      this.dirty = true;
      this.onTouch();
    }
  }

  buildErrorText(): string {
    if (this.errorTexts && this.formControl && this.formControl.errors) {
      return Object.keys(this.formControl.errors)
        .map(errorKey => this.errorTexts[errorKey])
        .join(' ');
    }

    return null;
  }

  writeValue(value: any) {
    this._value = value;
  }

  onChange = _ => {};

  onTouch = () => {};

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.formControl = this.injector.get(NgControl).control;
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
