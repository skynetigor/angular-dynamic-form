import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { AbstractDynamicControl, TemplateModel } from '../models';

export declare type ControlOrTemplate = AbstractDynamicControl<any> | TemplateModel<any>;

/**
 * The interface for configuring AbstractDynamicControl
 */
export declare interface ControlConfiguration<TInputs, TOutputs extends OutputsObject, TValue> {
    initialInputs?: TInputs;
    outputs?: TOutputs;
    validators?: ValidatorFn | ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[] | AsyncValidatorFn;
    displayed?: boolean;
    initialValue?: TValue;
}

/**
 * The interface for outputs
 */
export declare interface OutputsObject {
    [key: string]: Function;
}
