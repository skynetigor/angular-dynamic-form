import { ValidatorFn } from '@angular/forms';
import { emailRegExp } from '../../constants/regular-expressions';
import { patternValidator } from '../pattern/pattern.validator';

/**
 * Email validator for the {@link FormModelBuilderService}
 */
export function emailValidator(): ValidatorFn {
    return patternValidator({ regExp: emailRegExp, field: 'email' });
}
