import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'lib-test-control-component',
    template: `
        Control is working
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TestDynamicControlComponent),
            multi: true
        }
    ]
})
export class TestDynamicControlComponent implements ControlValueAccessor {
    @Input()
    firstInput;

    @Input()
    secondInput;

    @Output()
    firstOutput = new EventEmitter();

    @Output()
    secondOutput = new EventEmitter();

    propagateChange: (v) => void;

    writeValue(obj: any): void {}

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {}
}
