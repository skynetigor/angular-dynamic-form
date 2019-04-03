import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';

import { AbstractDynamicControl, TemplateModel } from '../models';

export declare type ControlOrTemplate = AbstractDynamicControl<any> | TemplateModel<any>;

export declare interface IControlConfiguration<TInputs, TOutputs extends OutputsObject, TValue> {
  initialInputs?: TInputs;
  outputs?: TOutputs;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[] | AsyncValidatorFn;
  displayed?: boolean;
  initialValue?: TValue;
}

export declare interface OutputsObject {
  [key: string]: Function;
}
