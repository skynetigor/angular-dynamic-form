import { Type } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { IControlConfiguration, OutputsObject } from '../../types';

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
  public outputs: TOutputs;

  public isDisplayed = true;

  readonly valueChanges: Observable<TValue>;

  constructor(
    config: IControlConfiguration<TInputs, TOutputs, TValue>,
    public readonly componentType: Type<TControlComponent>
  ) {
    super(config.validators, config.asyncValidators);
    this.inputs = config.initialInputs;
    this.outputs = config.outputs;
  }

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

  reset(value?: TValue, options?: Object): void {
    super.reset(value, options);
  }
}
