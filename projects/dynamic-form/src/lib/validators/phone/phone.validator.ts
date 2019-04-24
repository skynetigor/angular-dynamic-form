import { Validators } from '@angular/forms';

const phoneRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

/**
 * Phone validator for the FormModelBuilderService
 */
export function phoneValidator(control) {
  const phone = Validators.pattern(phoneRegexp)(control);
  if (phone) {
    return { phone: true };
  }
}
