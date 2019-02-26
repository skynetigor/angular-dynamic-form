import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { ControlOrTemplate } from '../types';
import { isControl, isTemplate } from '../utils/utils';
import { BaseControlModel, ComponentController, TemplateModel } from './controls';

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
      this.changeTmplBetweenAll(t);
    }
  }

  constructor(public controls: T) {
    this.formBuilder = new FormBuilder();

    this.initialize();
  }

  private initialize() {
    const controlsForFormGroup = {};

    Object.keys(this.controls).forEach((key: any) => {
      const control = this.controls[key];

      if (control instanceof ComponentController || control instanceof TemplateModel) {
        control['_name'] = key;
      }

      if (control instanceof BaseControlModel) {
        controlsForFormGroup[key] = control.formControl;
      }
    });

    this.formGroup = this.formBuilder.group(controlsForFormGroup);

    const controlsArray = <any>Object.values(this.controls).filter(value => isControl(value) || isTemplate(value));

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

  private buildControlsArray() {
    return <any>Object.values(this.controls).filter(value => isControl(value) || isTemplate(value));
  }
}
