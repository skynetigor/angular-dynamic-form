import { TemplateRef } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { ControlOrTemplate } from '../types';
import { isControl, isTemplate } from '../utils/utils';
import { BaseControlModel, TemplateModel } from './controls';

function extractControls(items: { [key: string]: ControlOrTemplate }): { [key: string]: BaseControlModel<any> } {
  const result = {};
  Object.keys(items)
    .filter(key => items[key] instanceof BaseControlModel)
    .forEach(key => {
      result[key] = items[key];
      items[key]['_name'] = key;
    });
  return result;
}

export class DynamicFormGroup<T extends { [key: string]: ControlOrTemplate }> extends FormGroup {
  private __tmplBetweenAll: TemplateRef<any> | TemplateModel<any>;
  private __tmplBetweenAllChangedSbj = new Subject<TemplateRef<any> | TemplateModel<any>>();
  private __controlsStateChangedSbj = new BehaviorSubject<ControlOrTemplate[]>([]);

  public get tmplBetweenAllChanged$() {
    return this.__tmplBetweenAllChangedSbj.asObservable();
  }

  public get controlsStateChanged$() {
    return this.__controlsStateChangedSbj.asObservable();
  }

  public get tmplBetweenAll() {
    return this.__tmplBetweenAll;
  }
  public set tmplBetweenAll(t: TemplateRef<any> | TemplateModel<any>) {
    if (this.__tmplBetweenAll !== t) {
      this.__tmplBetweenAll = t;
      this.changeTmplBetweenAll(t);
    }
  }

  controls: { [key: string]: BaseControlModel<any> };

  constructor(
    public readonly items: T,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(extractControls(items), validatorOrOpts, asyncValidator);

    const controlsArray = <any>Object.values(this.items).filter(value => isControl(value) || isTemplate(value));

    this.__controlsStateChangedSbj.next(controlsArray);
  }

  changeTmplBetweenAll(tmpl: TemplateRef<any> | TemplateModel<any>) {
    if (tmpl) {
      if (!(tmpl instanceof TemplateModel)) {
        tmpl = new TemplateModel<any>(null, tmpl);
      }
      tmpl['_name'] = 'dynamic-template-between-controls';
      const temp = [];
      const controlsArray = this.buildControlsArray();
      const configLength = controlsArray.length;

      controlsArray.forEach((el, index) => {
        temp.push(el);
        if (index < configLength) {
          temp.push(tmpl);
        }
      });

      this.__controlsStateChangedSbj.next(temp);
    } else {
      this.__controlsStateChangedSbj.next(this.buildControlsArray());
    }
  }

  public get<TComponent, TInputs, TOutputs, TValue>(
    name: string
  ): BaseControlModel<TComponent, TInputs, TOutputs, TValue> {
    return super.get(name) as BaseControlModel<TComponent, TInputs, TOutputs, TValue>;
  }

  public registerControl<TComponent, TInputs, TOutputs, TValue>(
    name: string,
    control: BaseControlModel<TComponent, TInputs, TOutputs, TValue>
  ): BaseControlModel<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Registering controls is not supported.');
  }

  public addControl<TComponent, TInputs, TOutputs, TValue>(
    name: string,
    control: BaseControlModel<TComponent, TInputs, TOutputs, TValue>
  ): BaseControlModel<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Adding controls is not supported.');
  }

  public removeControl(name: string): void {
    throw new Error('Removing controls is not supported.');
  }

  public setControl<TComponent, TInputs, TOutputs, TValue>(
    name: string,
    control: BaseControlModel<TComponent, TInputs, TOutputs, TValue>
  ): BaseControlModel<TComponent, TInputs, TOutputs, TValue> {
    throw new Error('Method not implemented.');
  }

  private buildControlsArray() {
    return <any>Object.values(this.items).filter(value => isControl(value) || isTemplate(value));
  }
}
