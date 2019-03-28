import { AbstractDynamicControl } from './abstract-dynamic-control.model';
import { IControlConfiguration, OutputsObject } from '../../types';
import { Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class GenericDynamicControl<
  TControlComponent extends ControlValueAccessor,
  TInputs = any,
  TOutputs extends OutputsObject = any,
  TValue = any
> extends AbstractDynamicControl<TControlComponent, TInputs, TOutputs, TValue> {
  constructor(config: IControlConfiguration<TInputs, any, TValue>, componentType: Type<TControlComponent>) {
    super(config, componentType);
  }
}
