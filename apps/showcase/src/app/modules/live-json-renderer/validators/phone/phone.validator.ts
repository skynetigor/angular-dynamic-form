import { patternValidator } from '../pattern/pattern.validator';
export const phoneRegExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

/**
 * Phone validator for the {@link FormModelBuilderService}
 */
export function phoneValidator(validatorCfg?: { regExp: RegExp | string; requiredFormat?: string }) {
    if (validatorCfg) {
        return patternValidator({ regExp: validatorCfg.regExp, field: 'phone', requiredFormat: validatorCfg.requiredFormat });
    } else {
        return patternValidator({ regExp: phoneRegExp, field: 'phone', requiredFormat: '+XX-XXXX-XXXX' });
    }
}
