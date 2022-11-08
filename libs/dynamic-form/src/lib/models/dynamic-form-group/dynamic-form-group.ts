import { AbstractControl, AsyncValidatorFn, ControlValueAccessor, FormGroup, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from '../../utils/is-null-or-undefined/is-null-or-undefined.function';

import { ControlNamePrivatePropertyName, ControlOrTemplate, OutputsObject } from '../../types';
import { DynamicControl } from '../controls';

function extractControls(items: {
    [key: string]: ControlOrTemplate | DynamicFormGroup<any>;
}): { [key: string]: DynamicControl<any> } {
    const result = {};
    Object.keys(items)
        .filter(key => items[key] instanceof DynamicControl || items[key] instanceof DynamicFormGroup)
        .forEach(key => {
            result[key] = items[key];
            items[key][ControlNamePrivatePropertyName] = key;
        });

    return result;
}

/** Strong typed dynamic form group */
export class DynamicFormGroup<T extends { [key: string]: ControlOrTemplate | DynamicFormGroup<any> }> extends FormGroup {
    private _items: T;

    /** @inheritdoc */
    controls: { [key: string]: DynamicControl<any> };

    get items(): T {
        return this._items;
    }

    get name(): string {
        return this[ControlNamePrivatePropertyName];
    }

    displayed = true;

    constructor(
        items: T,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(extractControls(items), validatorOrOpts, asyncValidator);
        this._items = items;

        if (isNullOrUndefined(this.parent)) {
            this[ControlNamePrivatePropertyName] = 'root';
        }
    }

    /** @inheritdoc */
    public get<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string
    ): DynamicControl<TComponent, TInputs, TOutputs, TValue> {
        return super.get(name) as DynamicControl<TComponent, TInputs, TOutputs, TValue>;
    }

    /** @inheritdoc */
    public registerControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: DynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): DynamicControl<TComponent, TInputs, TOutputs, TValue> {
        super.registerControl(name, control);
        return control;
    }

    /** @inheritdoc */
    public addControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: DynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): DynamicControl<TComponent, TInputs, TOutputs, TValue> {
        this._addControl(name, control);
        return control;
    }

    public addFormGroup<TConfig extends { [key: string]: ControlOrTemplate | DynamicFormGroup<any> }>(
        name: string,
        formGroup: DynamicFormGroup<TConfig>
    ): DynamicFormGroup<TConfig> {
        this._addControl(name, formGroup);
        return formGroup;
    }

    /** @inheritdoc */
    public removeControl(name: string, options?: { emitEvent: boolean }): void {
        if (this.isControl(name)) {
            super.removeControl(name, options);
            this.deleteItem(name);
        }
    }

    public removeItem(name: string): void {
        if (this.doesItemExist(name)) {
            if (this.isControl(name)) {
                this.removeControl(name);
            } else {
                this.deleteItem(name);
            }
        }
    }

    /** @inheritdoc */
    public setControl<TComponent extends ControlValueAccessor, TInputs, TOutputs extends OutputsObject, TValue>(
        name: string,
        control: DynamicControl<TComponent, TInputs, TOutputs, TValue>
    ): DynamicControl<TComponent, TInputs, TOutputs, TValue> {
        throw new Error('Setting up control is not supported');
    }

    private isControl(name: string): boolean {
        return this._items[name] instanceof AbstractControl;
    }

    private doesItemExist(name: string): boolean {
        return name in this._items;
    }

    private deleteItem(name: string): void {
        delete this._items[name];
    }

    private _addControl(name: string, control: AbstractControl): void {
        const items: any = this.items;
        items[name] = control;
        control[ControlNamePrivatePropertyName] = name;
        super.addControl(name, control);
    }
}
