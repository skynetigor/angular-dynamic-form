import { AfterViewInit, ElementRef, forwardRef, Injectable, Injector, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export abstract class AbstractValueAccessor implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {
    private _isDisabled = false;
    private _value: any = null;

    protected hostNativeElement: HTMLElement;
    protected formControl: AbstractControl;

    @Input()
    label = '';
    @Input()
    required: boolean;
    @Input()
    placeholder = '';
    @Input()
    tooltipText = '';

    @Input()
    set isDisabled(value: boolean) {
        if (this._isDisabled !== value) {
            if (value && this.formControl && this.formControl.enabled) {
                this.formControl.disable();
            } else if (!value && this.formControl && this.formControl.disabled) {
                this.formControl.enable();
            }

            this._isDisabled = value;
            this.isDisabled$.next(value);
        }
    }

    get isDisabled() {
        return this._isDisabled;
    }

    get dirty() {
        return this.formControl ? this.formControl.dirty : false;
    }

    get fieldName(): string {
        return this.hostNativeElement.id;
    }

    isDisabled$ = new BehaviorSubject<boolean>(this.isDisabled);

    subscriptions: Subscription[] = [];

    constructor(protected injector: Injector) {
        this.hostNativeElement = injector.get<ElementRef<HTMLElement>>(ElementRef as any).nativeElement;
    }

    get value(): any {
        return this._value;
    }
    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    markAsDirty() {
        if (!this.dirty) {
            this.formControl.markAsDirty();
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
        this.isDisabled = isDisabled;
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        const reqAttrName = 'required';

        if (reqAttrName in simpleChanges) {
            if (simpleChanges.required.currentValue) {
                const attr = document.createAttribute(reqAttrName);
                this.hostNativeElement.attributes.setNamedItem(attr);
            } else {
                if (this.hostNativeElement.getAttribute(reqAttrName)) {
                    this.hostNativeElement.attributes.removeNamedItem(reqAttrName);
                }
            }
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(t => t.unsubscribe());
    }

    ngAfterViewInit() {
        // It is used like this since we are not able to use abstract type as argument for get method of injector
        const ngControl = this.injector.get<NgControl>(NgControl as any);

        this.formControl = ngControl.control;
    }
}

export function MakeProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}
