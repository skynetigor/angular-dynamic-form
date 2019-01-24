import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { isArray } from 'util';

import { TemplateModel } from './controls';

export class FormModel<TControlsInterface> {
  formGroup: FormGroup;

  private ____templateBetweenAll: TemplateModel<any>;
  private ____templateBetweenAllChangedSbj = new Subject<TemplateModel<any>>();

  public get tmplBetweenAllChanged$() {
    return this.____templateBetweenAllChangedSbj.asObservable();
  }

  public get templateBetweenAll() {
    return this.____templateBetweenAll;
  }
  public set templateBetweenAll(template) {
    if (this.____templateBetweenAll !== template) {
      this.____templateBetweenAll = template;
      this.____templateBetweenAllChangedSbj.next(template);
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
