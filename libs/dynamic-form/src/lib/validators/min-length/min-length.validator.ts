import { ValidatorFn, Validators } from '@angular/forms';

export function minLength(validatorCfg: { value: number }): ValidatorFn {
    return Validators.minLength(validatorCfg.value);
}
