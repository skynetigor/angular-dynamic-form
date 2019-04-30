import { ValidatorFn, Validators } from '@angular/forms';

/**
 * Pattern validator for the FormModelBuilderService
 */
export function patternValidator(validatorCfg: { regExp: RegExp | string; field: string; requiredFormat?: string }): ValidatorFn {
    return control => {
        let patternError = Validators.pattern(validatorCfg.regExp)(control);

        if (patternError) {
            patternError = {
                [validatorCfg.field]: {
                    ...patternError.pattern
                }
            };

            if (validatorCfg.requiredFormat) {
                patternError[validatorCfg.field].requiredFormat = validatorCfg.requiredFormat;
            }

            return patternError;
        } else {
            return null;
        }
    };
}
