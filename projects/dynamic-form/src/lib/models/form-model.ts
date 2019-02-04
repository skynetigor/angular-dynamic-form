import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { isArray } from 'util';

import { ControlOrTemplate } from '../types';
import { TemplateModel, BaseControlModel } from './controls';
import { isControl, isTemplate } from '../utils/utils';

export class FormModel<T extends { [key: string]: ControlOrTemplate }> {
  private formBuilder: FormBuilder;

  private __tmplBetweenAll: TemplateRef<any> | TemplateModel<any>;
  private __tmplBetweenAllChangedSbj = new Subject<TemplateRef<any> | TemplateModel<any>>();
  private __controlsStateChangedSbj = new BehaviorSubject<ControlOrTemplate[]>([]);

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
      this.OtmplBetweenAll(t);
    }
  }

  constructor(public controls: T) {
    this.formBuilder = new FormBuilder();

    this.initialize();
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

    const controlsArray = <any>Object.values(this.controls).filter(value => isControl(value) || isTemplate(value));

    this.__controlsStateChangedSbj.next(controlsArray);
  }

  OtmplBetweenAll(tmpl: TemplateRef<any> | TemplateModel<any>) {
    if (tmpl) {
      if (!(tmpl instanceof TemplateModel)) {
        tmpl = new TemplateModel<any>(null, tmpl);
      }
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

  private buildControlsArray() {
    return <any>Object.values(this.controls).filter(value => isControl(value) || isTemplate(value));
  }

  private createReactiveFormControl(name: string, control: BaseControlModel<any, any>) {
    control['_name'] = name;
    const validators = isArray(control.validators) ? control.validators : [];
    const asyncValidators = isArray(control.asyncValidators) ? control.asyncValidators : [];
    return this.formBuilder.control('', validators, asyncValidators);
  }
}
