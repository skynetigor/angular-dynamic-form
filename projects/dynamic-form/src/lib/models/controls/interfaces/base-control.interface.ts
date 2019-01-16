import { ValidatorFn } from '@angular/forms';

export interface IBaseControl<TValue> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  validationMessages?: { [key: string]: string } | {};
  validators?: ValidatorFn | ValidatorFn[];
  disabled?: boolean;
  value?: TValue;
}
