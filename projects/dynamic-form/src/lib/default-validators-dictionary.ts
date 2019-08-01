import { compareValidator, emailValidator, maxLength, minLength, patternValidator, phoneValidator, required } from './validators';

/**
 * Default validator dictionary that is used by FormModelBuilder
 */
export const defaultValidatorsDictionary = {
    required: required,
    maxLength: maxLength,
    minLength: minLength,
    email: emailValidator,
    phone: phoneValidator,
    pattern: patternValidator,
    compare: compareValidator
};
