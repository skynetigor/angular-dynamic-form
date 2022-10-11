import { FormControl } from '@angular/forms';

import { phoneRegExp, phoneValidator } from './phone.validator';

describe('phone validator', () => {
    describe('if regular expression and format is not specified explicitly', () => {
        it('should return error if phone in control value has wrong format by using default phone regular expression', () => {
            const control = new FormControl('+112-1234-12324', phoneValidator());

            expect(control.errors).toEqual({
                phone: {
                    actualValue: control.value,
                    requiredFormat: '+XX-XXXX-XXXX',
                    requiredPattern: phoneRegExp.toString()
                }
            });
        });

        it('should return null if phone in control value has correct format', () => {
            const control = new FormControl('+12-1234-1234', phoneValidator());

            expect(control.errors).toBeNull();
        });
    });

    describe('if regular expression is specified explicitly', () => {
        it('should return error if phone in control value has wrong format by using specified phone regular expression', () => {
            const regExp = '^123$';
            const control = new FormControl('124', phoneValidator({ regExp: regExp }));

            expect(control.errors).toEqual({
                phone: {
                    actualValue: control.value,
                    requiredPattern: regExp.toString()
                }
            });
        });

        it('should return null if phone in control value has correct format', () => {
            const regExp = '123';
            const control = new FormControl('123', phoneValidator({ regExp: regExp }));

            expect(control.errors).toBeNull();
        });
    });

    describe('if regular expression and format is specified explicitly', () => {
        it('should return error if phone in control value has wrong format by using specified phone regular expression', () => {
            const regExp = '^123$';
            const requiredFormat = '123';
            const control = new FormControl('124', phoneValidator({ regExp: regExp, requiredFormat: requiredFormat }));

            expect(control.errors).toEqual({
                phone: {
                    actualValue: control.value,
                    requiredFormat: requiredFormat,
                    requiredPattern: regExp.toString()
                }
            });
        });

        it('should return null if phone in control value has correct format', () => {
            const regExp = '^123$';
            const requiredFormat = '123';
            const control = new FormControl('123', phoneValidator({ regExp: regExp, requiredFormat: requiredFormat }));

            expect(control.errors).toBeNull();
        });
    });
});
