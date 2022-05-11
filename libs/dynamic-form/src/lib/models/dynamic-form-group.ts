import { AsyncValidatorFn, ControlValueAccessor, FormGroup, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from '../utils/is-null-or-undefined/is-null-or-undefined.function';

import { ControlOrTemplate, OutputsObject } from '../types';
import { AbstractDynamicControl } from './controls';

function extractControls(items: {
    [key: string]: ControlOrTemplate | DynamicFormGroup<any>;
}): { [key: string]: AbstractDynamicControl<any> } {
    const result = {};
    Object.keys(items)
        .filter(key => items[key] instanceof AbstractDynamicControl || items[key] instanceof DynamicFormGroup)
        .forEach(key => {
            result[key] = items[key];
            items[key]['_name'] = key;
        });

    return result;
}

/** Strong typed dynamic form group */
export class DynamicFormGroup<T extends { [key: string]: ControlOrTemplate | DynamicFormGroup<any> }> extends FormGroup {
    private _name: string;

    /** @inheritdoc */
    controls: { [key: string]: AbstractDynamicControl<any> };

    get name(): string {
        return this._name;
    }

    displayed = true;

    constructor(
        public readonly items: T,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(extractControls(items), validatorOrOpts, asyncValidator);

        if (isNullOrUndefined(this.parent)) {
            this._name = 'root';
        }
    }

    /** @inheritdoc */
    public get<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string
    ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
        return super.get(name) as AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>;
    }

    /** @inheritdoc */
    public registerControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
        super.registerControl(name, control);
        return control;
    }

    /** @inheritdoc */
    public addControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
        const items: any = this.items;
        items[name] = control;
        super.addControl(name, control);
        return control;
    }

    public addFormGroup<TConfig extends { [key: string]: ControlOrTemplate | DynamicFormGroup<any> }>(
        name: string,
        formGroup: DynamicFormGroup<TConfig>
    ): DynamicFormGroup<TConfig> {
        (this.items as any)[name] = formGroup;
        super.addControl(name, formGroup);
        return formGroup;
    }

    /** @inheritdoc */
    public removeControl(name: string): void {
        throw new Error('Removing controls is not supported.');
    }

    /** @inheritdoc */
    public setControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
        throw new Error('Setting up control is not supported');
    }
}