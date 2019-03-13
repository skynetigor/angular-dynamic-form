import { AbstractDynamicControl } from './abstract-dynamic-control.model';
import { IControlConfiguration } from '../../types';
import { Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class GenericDynamicControl<
  TControlComponent extends ControlValueAccessor,
  TInputs = any,
  TOutputs = any,
  TValue = any
> extends AbstractDynamicControl<TControlComponent, TInputs, TOutputs, TValue> {
  constructor(config: IControlConfiguration<TInputs, TValue>, componentType: Type<TControlComponent>) {
    super(config, componentType);
  }
}
