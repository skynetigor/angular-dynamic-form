import { Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { ControlConfiguration, OutputsObject } from '../../types';
import { AbstractDynamicControl } from './abstract-dynamic-control.model';

export class GenericDynamicControl<
    TControlComponent extends ControlValueAccessor,
    TInputs = any,
    TOutputs extends OutputsObject = any,
    TValue = any
> extends AbstractDynamicControl<TControlComponent, TInputs, TOutputs, TValue> {
    constructor(config: ControlConfiguration<TInputs, any, TValue>, componentType: Type<TControlComponent>) {
        super(config, componentType);
    }
}
