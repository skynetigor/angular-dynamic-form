import { ValidatorFn } from '@angular/forms';

export interface IBaseBootstrapControl<TValue> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  validationMessages?: { [key: string]: string } | {};
  validators?: ValidatorFn | ValidatorFn[];
  disabled?: boolean;
  value?: TValue;
}
