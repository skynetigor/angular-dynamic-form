import { AfterViewInit, Component, forwardRef, Injectable, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { formatString } from '../utils';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'abstract-value-accessor',
    template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class AbstractValueAccessor implements ControlValueAccessor, AfterViewInit {
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
        this.formControl.updateValueAndValidity();
        if (this.errorTexts && this.formControl && this.formControl.errors && this.dirty) {
            const c = Object.keys(this.formControl.errors)
                .map(errorKey => formatString(this.errorTexts[errorKey], ...Object.values(this.formControl.errors[errorKey])))
                .join(' ');

            return c;
        }

        return null;
    }

    writeValue(value: any) {
        this._value = value;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = _ => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
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

    ngAfterViewInit() {
        this.formControl = this.injector.get(NgControl).control as FormControl;
    }
}

export function MakeProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
