import { FormControl } from '@angular/forms';
import { required } from './required.validator';

describe('minLength validator', () => {
    it('should return error if control does not have value', () => {
        const control = new FormControl(null, required());

        expect(control.errors).toEqual({
            required: true
        });
    });

    it('should return null if control has value', () => {
        const control = new FormControl('123456', required());
        expect(control.errors).toBeNull();
    });
});
