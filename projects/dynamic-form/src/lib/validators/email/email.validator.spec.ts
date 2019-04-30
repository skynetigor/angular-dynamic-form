import { FormControl } from '@angular/forms';

import { emailRegExp } from '../../constants/regular-expressions';
import { emailValidator } from './email.validator';

describe('email validator for the FormModelBuilder', () => {
    it('should return error if email in control value is in wrong format', () => {
        const control = new FormControl('someamail.com.ua', emailValidator());

        expect(control.errors).toEqual({
            email: {
                actualValue: control.value,
                requiredPattern: emailRegExp.toString()
            }
        });
    });

    it('should return null if email in control value is in correct format', () => {
        const control = new FormControl('some-email@com.ua', emailValidator());

        expect(control.errors).toBeNull();
    });
});
