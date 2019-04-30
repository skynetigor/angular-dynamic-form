import { FormControl } from '@angular/forms';
import { maxLength } from './max-length.validator';

describe('maxLength validator', () => {
    it('should return error if control has string value with length greater then specified', () => {
        const control = new FormControl('12345', maxLength({ value: 4 }));

        expect(control.errors).toEqual({
            maxlength: {
                actualLength: 5,
                requiredLength: 4
            }
        });
    });

    it('should return null if control has string value with specified or less length then specified', () => {
        const control = new FormControl('123456', maxLength({ value: 6 }));

        expect(control.errors).toBeNull();
    });
});
