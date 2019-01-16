import { FormBuilder, FormGroup } from '@angular/forms';
import { isArray } from 'util';

export class FormModel<TControlsInterface> {
  formGroup: FormGroup;

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
