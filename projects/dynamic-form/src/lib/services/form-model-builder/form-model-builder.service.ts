import { Injectable, Injector, Type } from '@angular/core';
import { isArray } from 'util';

import { DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from '../../constants';
import { AbstractDynamicControl, DynamicFormGroup } from '../../models';

@Injectable()
export class FormModelBuilderService {
    private dynamicControlsDictionary: { [key: string]: Type<AbstractDynamicControl<any>> };
    private validatorsDictionary;

    constructor(injector: Injector) {
        this.dynamicControlsDictionary = injector.get(DYNAMIC_CONTROLS_DICTIONARY);
        this.validatorsDictionary = injector.get(VALIDATORS_DICTIONARY);
    }

    /**
     * Builds DynamicFormGroup from a json
     * @param json An Object or string representation of the object that DynamicFormGroup is built with
     * @returns DynamicFormGroup
     */
    buildFormModel(json: string | Object): DynamicFormGroup<any> {
        const form = typeof json === 'string' ? JSON.parse(json) : json;

        const formKeys = Object.keys(form);
        const result = {};

        formKeys.forEach(key => {
            const f = form[key];
            const modelClass = this.dynamicControlsDictionary[f.type];

            if (modelClass) {
                result[key] = new modelClass({ initialInputs: f.inputs, validators: this.getValidators(f) });
            }
        });
        return new DynamicFormGroup(result);
    }

    private getValidators(control) {
        const validators = [];
        if (isArray(control.validators)) {
            control.validators.forEach(element => {
                switch (typeof element) {
                    case 'string':
                        validators.push(this.validatorsDictionary[element]());
                        break;
                    default:
                        validators.push(this.validatorsDictionary[element.name](element));
                }
            });
        }

        return validators;
    }
}
