import { FormBuilder, FormControl } from '@angular/forms';

import { compareValidator } from './compare.validator';

describe('compareValidator', () => {
    it('should return error if control value is not equal to specified control value', () => {
        const formGroup = new FormBuilder().group({
            firstControl: ['123', compareValidator({ compareWith: 'secondControl' })],
            secondControl: ['12345']
        });

        const control = formGroup.controls.firstControl;
        control.updateValueAndValidity();

        expect(control.errors).toEqual({
            compare: { controlToCompareName: 'secondControl', currentControlValue: '123', controlToCompareValue: '12345' }
        });
    });

    it('should return null if control value is equal to specified control value', () => {
        const formGroup = new FormBuilder().group({
            firstControl: ['123', compareValidator({ compareWith: 'secondControl' })],
            secondControl: ['123']
        });

        const control = formGroup.controls.firstControl;
        control.updateValueAndValidity();

        expect(control.errors).toBeNull();
    });

    it('should return null if control that validation is run on has no parent', () => {
        const control = new FormControl('4717236');
        control.updateValueAndValidity();

        expect(control.errors).toBeNull();
    });

    it('should return error if specified control value property is not equal to specified control value property', () => {
        const formGroup = new FormBuilder().group({
            firstControl: [{ prop: '1234' }, compareValidator({ compareWith: 'secondControl', comparisonProperties: ['prop'] })],
            secondControl: [{ prop: '12345' }]
        });

        const control = formGroup.controls.firstControl;
        control.updateValueAndValidity();

        expect(control.errors).toEqual({
            compare: {
                controlToCompareName: 'secondControl',
                currentControlValue: { prop: '1234' },
                controlToCompareValue: { prop: '12345' }
            }
        });
    });

    it('should return null if specified control value property is equal to specified control value property', () => {
        const formGroup = new FormBuilder().group({
            firstControl: [{ prop: '12345' }, compareValidator({ compareWith: 'secondControl', comparisonProperties: ['prop'] })],
            secondControl: [{ prop: '12345' }]
        });

        const control = formGroup.controls.firstControl;
        control.updateValueAndValidity();

        expect(control.errors).toBeNull();
    });
});
