import { patternValidator } from '../pattern/pattern.validator';
const emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email validator for the {@link FormModelBuilderService}
 */
export function emailValidator() {
    return patternValidator({ regExp: emailRegExp, field: 'email' });
}
