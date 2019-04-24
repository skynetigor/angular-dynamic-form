import { Validators } from '@angular/forms';
import { emailValidator, phoneValidator, patternValidator } from './validators';

/**
 * Default validator dictionary that is used by FormModelBuilder
 */
export const defaultValidatorsDictionary = {
  required: Validators.required,
  maxLength: validatorObj => Validators.maxLength(validatorObj.value),
  minLength: validatorObj => Validators.minLength(validatorObj.value),
  email: emailValidator,
  phone: phoneValidator,
  pattern: patternValidator
};
