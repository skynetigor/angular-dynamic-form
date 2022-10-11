import { ValidatorFn } from '@angular/forms';

export interface IBaseBootstrapInputs {
  label?: string;
  placeholder?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  validationMessages?: { [key: string]: string } | {};
  validators?: ValidatorFn | ValidatorFn[];
  disabled?: boolean;
  errorTexts?: any;
}
