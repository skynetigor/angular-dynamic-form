import { Injectable, Type } from '@angular/core';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { AbstractDynamicControl, DynamicFormGroup } from 'dynamic-form';

@Injectable()
export class FormModelBuilderService {
  static dictionary: { [key: string]: Type<AbstractDynamicControl<any>> } = {
    BootstrapDropdown: BootstrapDropdownControlModel,
    BootstrapTextfield: BootstrapTextFieldModel
  };

  constructor() {}

  buildFormModel(form: any): DynamicFormGroup<any> {
    const formKeys = Object.keys(form);
    const result = {};

    formKeys.forEach(key => {
      const f = form[key];
      const modelClass = FormModelBuilderService.dictionary[f.type];

      if (modelClass) {
        result[key] = new modelClass({ initialInputs: f.inputs });
      }
    });

    return new DynamicFormGroup(result);
  }
}
