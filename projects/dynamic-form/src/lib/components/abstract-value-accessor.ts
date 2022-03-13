import { AfterViewInit, forwardRef, Injectable, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Injectable()
export abstract class AbstractValueAccessor implements ControlValueAccessor, OnInit, AfterViewInit {
  dirty = false;

  @Input()
  required = false;
  @Input()
  disabled = false;
  @Input()
  placeholder;

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
    this.disabled = isDisabled;
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
