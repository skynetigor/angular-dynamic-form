import { ValidatorFn, Validators } from '@angular/forms';

export function maxLength(validatorCfg: { value: number }): ValidatorFn {
    return Validators.maxLength(validatorCfg.value);
}
