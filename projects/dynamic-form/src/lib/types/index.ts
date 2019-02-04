import { BaseControlModel, TemplateModel } from '../models';
import { ComponentRef } from '@angular/core';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export declare type ControlOrTemplate = BaseControlModel<any> | TemplateModel<any>;

export declare interface IComponentMetadata<TComponent, TInput> {
  inputs: TInput;
  componentRef: ComponentRef<TComponent>;
}

export declare interface IControlConfiguration<TInputs> {
  initialInputs?: TInputs;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
}
