import { FormControl } from '@angular/forms';

import { patternValidator } from './pattern.validator';

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe('pattern validator', () => {
    describe('if requiredFormat is not specified', () => {
        it('should return error without requiredFormat property if control value has wrong format ', () => {
            const control = new FormControl('someamail.com.ua', patternValidator({ regExp: emailRegExp, field: 'email' }));

            expect(control.errors).toEqual({
                email: {
                    actualValue: control.value,
                    requiredPattern: emailRegExp.toString()
                }
            });
        });

        it('should return null if control value has correct format', () => {
            const control = new FormControl('someamail@com.ua', patternValidator({ regExp: emailRegExp, field: 'email' }));

            expect(control.errors).toBeNull();
        });
    });

    describe('if requiredFormat is specified', () => {
        it('should return error with required format property if control value has wrong format ', () => {
            const control = new FormControl(
                'someamail.com.ua',
                patternValidator({ regExp: emailRegExp, field: 'email', requiredFormat: 'email' })
            );

            expect(control.errors).toEqual({
                email: {
                    actualValue: control.value,
                    requiredPattern: emailRegExp.toString(),
                    requiredFormat: 'email'
                }
            });
        });

        it('should return null if control value has correct format', () => {
            const control = new FormControl(
                'someamail@com.ua',
                patternValidator({ regExp: emailRegExp, field: 'email', requiredFormat: 'email' })
            );

            expect(control.errors).toBeNull();
        });
    });
});
