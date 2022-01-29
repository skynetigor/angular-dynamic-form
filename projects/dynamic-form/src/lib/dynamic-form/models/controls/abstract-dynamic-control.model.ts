import { Type } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ControlConfiguration, OutputsObject } from '../../types';

function convertToValidatorsArray(obj) {
    return (Array.isArray(obj) ? obj : [obj]).filter(val => val);
}

/** Strongly typed dynamic form control */
export abstract class AbstractDynamicControl<
    TControlComponent extends ControlValueAccessor,
    TInputs = any,
    TOutputs extends OutputsObject = any,
    TValue = any
> extends FormControl {
    private _name: string;

    get name() {
        return this._name;
    }

    public inputs: TInputs;
    public outputs: TOutputs = <TOutputs>{};

    public displayed = true;

    readonly valueChanges: Observable<TValue>;

    /**
     * Constructs DynamicControl
     * @param config Configuration for the control
     * @param componentType Component type
     */
    constructor(config: ControlConfiguration<TInputs, TOutputs, TValue>, public readonly componentType: Type<TControlComponent>) {
        super(config.initialValue, convertToValidatorsArray(config.validators), convertToValidatorsArray(config.asyncValidators));
        this.inputs = config.initialInputs;
        this.outputs = config.outputs;
        this.displayed = config.hasOwnProperty('displayed') ? config.displayed : true;
    }

    /**@inheritdoc */
    setValue(
        value: TValue,
        options: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean;
        } = {}
    ): void {
        super.setValue(value, options);
    }

    /**@inheritdoc */
    patchValue(
        value: TValue,
        options: {
            onlySelf?: boolean;
            emitEvent?: boolean;
            emitModelToViewChange?: boolean;
            emitViewToModelChange?: boolean;
        } = {}
    ): void {
        super.patchValue(value, options);
    }

    /**@inheritdoc */
    reset(value?: TValue, options?: Object): void {
        super.reset(value, options);
    }
}
