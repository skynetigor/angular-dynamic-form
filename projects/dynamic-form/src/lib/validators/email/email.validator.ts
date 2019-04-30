import { emailRegExp } from '../../constants/regular-expressions';
import { patternValidator } from '../pattern/pattern.validator';

/**
 * Email validator for the {@link FormModelBuilderService}
 */
export function emailValidator() {
    return patternValidator({ regExp: emailRegExp, field: 'email' });
}
