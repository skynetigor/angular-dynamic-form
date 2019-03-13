import { AsyncValidatorFn, FormGroup, ValidatorFn, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { ControlOrTemplate } from '../types';
import { isControl, isTemplate } from '../utils/utils';
import { AbstractDynamicControl } from './controls';

function extractControls(items: { [key: string]: ControlOrTemplate }): { [key: string]: AbstractDynamicControl<any> } {
  const result = {};
  Object.keys(items)
    .filter(key => items[key] instanceof AbstractDynamicControl)
    .forEach(key => {
      result[key] = items[key];
      items[key]['_name'] = key;
    });
  return result;
}

export class DynamicFormGroup<T extends { [key: string]: ControlOrTemplate }> extends FormGroup {
  private __controlsStateChangedSbj = new BehaviorSubject<ControlOrTemplate[]>([]);

  public get controlsStateChanged$(): Observable<ControlOrTemplate[]> {
    return this.__controlsStateChangedSbj.asObservable();
  }

  controls: { [key: string]: AbstractDynamicControl<any> };

  constructor(
    public readonly items: T,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(extractControls(items), validatorOrOpts, asyncValidator);

    const controlsArray = <any>Object.keys(this.items)
      .map(key => this.items[key])
      .filter(value => isControl(value) || isTemplate(value));

    this.__controlsStateChangedSbj.next(controlsArray);
  }

  public get<TComponent extends ControlValueAccessor, TInputs, TOutputs, TValue>(
    name: string
  ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
    return super.get(name) as AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>;
  }

  public registerControl<TComponent extends ControlValueAccessor, TInputs, TOutputs, TValue>(
    name: string,
    control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
  ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Registering controls is not supported.');
  }

  public addControl<TComponent extends ControlValueAccessor, TInputs, TOutputs, TValue>(
    name: string,
    control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
  ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Adding controls is not supported.');
  }

  public removeControl(name: string): void {
    throw new Error('Removing controls is not supported.');
  }

  public setControl<TComponent extends ControlValueAccessor, TInputs, TOutputs, TValue>(
    name: string,
    control: AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue>
  ): AbstractDynamicControl<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Setting up control is not supported');
  }
}
