import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { isArray } from 'util';

import { TemplateModel } from './controls';
import { TemplateRef } from '@angular/core';

export class FormModel<TControlsInterface> {
  formGroup: FormGroup;

  private __tmplBetweenAll: TemplateRef<any> | TemplateModel<any>;
  private __tmplBetweenAllChangedSbj = new Subject<TemplateRef<any> | TemplateModel<any>>();

  public get tmplBetweenAllChanged$() {
    return this.__tmplBetweenAllChangedSbj.asObservable();
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

  constructor(public controls: TControlsInterface) {
    const formBuilder = new FormBuilder();

    this.initialize(formBuilder);
  }

  private initialize(formBuilder: FormBuilder) {
    const controlsForFormGroup = [];

    Object.keys(this.controls).forEach((key: any) => {
      const control = this.controls[key];

      if (!control.formControl) {
        const validators = isArray(control.validators) ? control.validators : [];
        const asyncValidators = isArray(control.asyncValidators) ? control.asyncValidators : [];

        control.formControl = formBuilder.control('', validators, asyncValidators);
      }

      controlsForFormGroup.push({ name: key, formControl: control.formControl });
    });

    this.formGroup = formBuilder.group({});

    controlsForFormGroup.forEach(v => this.formGroup.addControl(v.name, v.formControl));
  }
}
