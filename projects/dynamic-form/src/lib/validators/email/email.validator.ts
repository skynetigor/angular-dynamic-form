import { AbstractControl, Validators } from '@angular/forms';

/**
 * Email validator for the FormModelBuilderService
 */
// tslint:disable-next-line:max-line-length
const emailRexexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function emailValidator(control: AbstractControl) {
  const email = Validators.pattern(emailRexexp)(control);
  if (email) {
    return { email: true };
  }
}
