import { Injectable, Type } from '@angular/core';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { AbstractDynamicControl, DynamicFormGroup } from 'dynamic-form';
import { Validators } from '@angular/forms';
import { isArray } from 'util';

const emailRexexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

function pattern(validatorObj) {
  return control => {
    const phone = Validators.pattern(validatorObj.regexp)(control);
    if (phone) {
      return {
        [validatorObj.field]: {
          regexp: validatorObj.regexp,
          value: control.value
        }
      };
    }
  };
}

@Injectable()
export class FormModelBuilderService {
  static dictionary: { [key: string]: Type<AbstractDynamicControl<any>> } = {
    BootstrapDropdown: BootstrapDropdownControlModel,
    BootstrapTextfield: BootstrapTextFieldModel
  };

  static validatorsDictionary = {
    required: Validators.required,
    maxLength: validatorObj => Validators.maxLength(validatorObj.value),
    minLength: validatorObj => Validators.minLength(validatorObj.value),
    email: control => {
      const email = Validators.pattern(emailRexexp)(control);
      if (email) {
        return { email: true };
      }
    },
    phone: control => {
      const phone = Validators.pattern(phoneRegexp)(control);
      if (phone) {
        return { phone: true };
      }
    },
    pattern: pattern
  };

  constructor() {}

  buildFormModel(form: any): DynamicFormGroup<any> {
    const formKeys = Object.keys(form);
    const result = {};

    formKeys.forEach(key => {
      const f = form[key];
      const modelClass = FormModelBuilderService.dictionary[f.type];

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
            validators.push(FormModelBuilderService.validatorsDictionary[element]);
            break;
          default:
            validators.push(FormModelBuilderService.validatorsDictionary[element.name](element));
        }
      });
    }

    return validators;
  }
}
