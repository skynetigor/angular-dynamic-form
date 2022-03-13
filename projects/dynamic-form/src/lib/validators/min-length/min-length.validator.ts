import { Validators } from '@angular/forms';

export function minLength(validatorCfg: { value: number }) {
    return Validators.minLength(validatorCfg.value);
}
