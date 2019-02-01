import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { isArray } from 'util';

import { ControlOrTemplate } from '../types';
import { TemplateModel, BaseControlModel } from './controls';

export class FormModel<T extends { [key: string]: ControlOrTemplate }> {
  private formBuilder: FormBuilder;

  private __tmplBetweenAll: TemplateRef<any> | TemplateModel<any>;
  private __tmplBetweenAllChangedSbj = new Subject<TemplateRef<any> | TemplateModel<any>>();
  private __controlsStateChangedSbj = new Subject<any>();

  formGroup: FormGroup;

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
      this.__tmplBetweenAllChangedSbj.next(t);
    }
  }

  constructor(public controls: T) {
    this.formBuilder = new FormBuilder();

    this.initialize();
  }

  public addControl<TСontrol>(name: string, control: BaseControlModel<TСontrol>, index?: number) {
    if (index && index < 0) {
      throw new Error(`Index should be equal or greater than 0, but was ${index}.`);
    }

    const controlKeys = Object.keys(this.controls)
      .filter(t => this.controls[t])
      .map(t => ({ key: t, value: this.controls[t] }));

    if (!index || index > controlKeys.length - 1) {
      controlKeys.push({ key: name, value: control });
    } else {
      controlKeys.splice(index, 0, { key: name, value: control });
    }

    this.controls = <any>{};
    controlKeys.forEach(t => (this.controls[t.key] = t.value));

    if (!control.formControl) {
      control.formControl = this.createReactiveFormControl(name, control);
    }

    this.formGroup.addControl(name, this.createReactiveFormControl(name, control));
    this.__controlsStateChangedSbj.next(this.controls);
  }

  private initialize() {
    const controlsForFormGroup = [];

    Object.keys(this.controls).forEach((key: any) => {
      const control = this.controls[key];

      if (control instanceof BaseControlModel) {
        if (!control.formControl) {
          control.formControl = this.createReactiveFormControl(key, control);
        }

        controlsForFormGroup.push({ name: key, formControl: control.formControl });
      }
    });

    this.formGroup = this.formBuilder.group({});

    controlsForFormGroup.forEach(v => this.formGroup.addControl(v.name, v.formControl));
  }

  private createReactiveFormControl(name: string, control: BaseControlModel<any>) {
    control['_name'] = name;
    const validators = isArray(control.validators) ? control.validators : [];
    const asyncValidators = isArray(control.asyncValidators) ? control.asyncValidators : [];
    return this.formBuilder.control('', validators, asyncValidators);
  }
}
