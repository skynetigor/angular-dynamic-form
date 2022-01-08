import { ValidatorFn, Validators } from '@angular/forms';

export function required(): ValidatorFn {
    return Validators.required;
}
