import { Validators } from '@angular/forms';

/**
 * Pattern validator for the FormModelBuilderService
 */
export function patternValidator(validatorObj) {
  return control => {
    const phone = Validators.pattern(validatorObj.regexp)(control);
    if (phone) {
      return {
        [validatorObj.field]: {
          regexp: validatorObj.regexp,
          value: control.value
        }
      };
    }
  };
}
