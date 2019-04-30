import { Validators } from '@angular/forms';

export function maxLength(validatorCfg: { value: number }) {
    return Validators.maxLength(validatorCfg.value);
}
