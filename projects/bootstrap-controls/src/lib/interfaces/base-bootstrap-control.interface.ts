import { ValidatorFn } from '@angular/forms';

export interface IBaseBootstrapInputs {
  label?: string;
  placeholder?: string;
  required?: boolean;
  validationMessages?: { [key: string]: string } | {};
  validators?: ValidatorFn | ValidatorFn[];
  disabled?: boolean;
}
