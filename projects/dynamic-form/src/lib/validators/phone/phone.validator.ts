import { phoneRegExp } from '../../constants/regular-expressions';
import { patternValidator } from '../pattern/pattern.validator';

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
