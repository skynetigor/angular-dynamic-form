import { TestBed } from '@angular/core/testing';

import { DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from '../../constants';
import { defaultValidatorsDictionary } from '../../default-validators-dictionary';
import { TestDynamicControlModel } from '../../mocks';
import { FormModelBuilderService } from './form-model-builder.service';

const dynamicControlsDictionary = {
    control1: TestDynamicControlModel
};

describe('FormModelBuilderService', () => {
    let service: FormModelBuilderService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FormModelBuilderService,
                { provide: DYNAMIC_CONTROLS_DICTIONARY, useValue: dynamicControlsDictionary },
                {
                    provide: VALIDATORS_DICTIONARY,
                    useValue: defaultValidatorsDictionary
                }
            ]
        });
        service = TestBed.get(FormModelBuilderService);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('buildFormModel', () => {
        it('should return DynamicFormGroup built from object ', () => {
            const controlName = 'someControl';
            const model = {
                controls: {
                    [controlName]: {
                        type: 'control1',
                        inputs: {
                            firstInput: 'firstInput',
                            secondInput: 'secondInput'
                        },
                        validators: ['required', { name: 'maxLength', value: 10 }]
                    }
                }
            };

            const definition = service.buildFormModel(model);

            expect(controlName in definition.dynamicFormGroup.items).toBeTruthy();
            expect(model.controls[controlName].inputs.firstInput).toBe(definition.dynamicFormGroup.items[controlName].inputs.firstInput);
            expect(model.controls[controlName].inputs.secondInput).toBe(definition.dynamicFormGroup.items[controlName].inputs.secondInput);

            definition.dynamicFormGroup.controls[controlName].setValue(null);
            expect(definition.dynamicFormGroup.controls[controlName].errors).toEqual({ required: true });

            definition.dynamicFormGroup.controls[controlName].setValue('01234567890');
            expect(definition.dynamicFormGroup.controls[controlName].errors.maxlength).toBeTruthy();
        });

        it('should return DynamicFormGroup built from json representation of an object ', () => {
            const controlName = 'someControl';
            const model = {
                controls: {
                    [controlName]: {
                        type: 'control1',
                        inputs: {
                            firstInput: 'firstInput',
                            secondInput: 'secondInput'
                        },
                        validators: ['required', { name: 'maxLength', value: 10 }]
                    }
                }
            };

            const json = JSON.stringify(model);

            const definition = service.buildFormModel(json);

            expect(controlName in definition.dynamicFormGroup.items).toBeTruthy();
            expect(model.controls[controlName].inputs.firstInput).toBe(definition.dynamicFormGroup.items[controlName].inputs.firstInput);
            expect(model.controls[controlName].inputs.secondInput).toBe(definition.dynamicFormGroup.items[controlName].inputs.secondInput);

            definition.dynamicFormGroup.controls[controlName].setValue(null);
            expect(definition.dynamicFormGroup.controls[controlName].errors).toEqual({ required: true });

            definition.dynamicFormGroup.controls[controlName].setValue('01234567890');
            expect(definition.dynamicFormGroup.controls[controlName].errors.maxlength).toBeTruthy();
        });
    });
});
