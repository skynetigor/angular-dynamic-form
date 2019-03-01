import { BaseControlModel, TemplateModel } from '../models';
import { Injector, ElementRef, Type, ChangeDetectorRef } from '@angular/core';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export declare interface IDynamicComponentRef<T = any> {
  instance: T;
  injector: Injector;
  location: ElementRef<HTMLElement>;
  componentType: Type<T>;
  changeDetectorRef: ChangeDetectorRef;
}

export declare type ControlOrTemplate = BaseControlModel<any> | TemplateModel<any>;

export declare interface IComponentMetadata<TComponent, TInput> {
  inputs: TInput;
  componentRef: IDynamicComponentRef;
}

export declare interface IControlConfiguration<TInputs, TValue> {
  initialInputs?: TInputs;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[] | AsyncValidatorFn;
  initialValue?: TValue;
}
