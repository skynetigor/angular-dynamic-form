import { FormControl } from '@angular/forms';
import { minLength } from './min-length.validator';

describe('minLength validator', () => {
    it('should return error if control has string value with length less then specified', () => {
        const control = new FormControl('12345', minLength({ value: 6 }));

        expect(control.errors).toEqual({
            minlength: {
                actualLength: 5,
                requiredLength: 6
            }
        });
    });

    it('should return null if control has string value with specified or greater length then specified', () => {
        const control = new FormControl('123456', minLength({ value: 6 }));

        expect(control.errors).toBeNull();
    });
});
