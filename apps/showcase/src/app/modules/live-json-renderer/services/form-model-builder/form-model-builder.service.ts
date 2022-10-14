/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Injector, Type } from '@angular/core';
import {
  DynamicControl,
  DynamicFormGroup,
} from '@skynet-ng/dynamic-form';

import {
  DYNAMIC_CONTROLS_DICTIONARY,
  VALIDATORS_DICTIONARY,
} from '../../const';

function isArray(obj): boolean {
  return obj instanceof Array;
}

@Injectable()
export class FormModelBuilderService {
  private dynamicControlsDictionary: {
    [key: string]: Type<DynamicControl<any>>;
  };
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
  buildFormModel(json: string | Object): {
    dynamicFormGroup: DynamicFormGroup<any>;
    script: Function;
  } {
    const form = typeof json === 'string' ? JSON.parse(json) : json;

    const controlsObj = form.controls;
    const formKeys = Object.keys(controlsObj);
    const result = {};

    formKeys.forEach((key) => {
      const f = controlsObj[key];
      const modelClass = this.dynamicControlsDictionary[f.type];
      const outputs = {};

      if (f.outputs) {
        Object.keys(f.outputs).forEach((outputKey) => {
          const outputScript = f.outputs[outputKey];
          outputs[outputKey] = this.buildScriptsFunc(outputScript);
        });
      }

      if (modelClass) {
        result[key] = new modelClass({
          initialInputs: f.inputs,
          outputs: outputs,
          validators: this.getValidators(f),
        });
      }
    });

    if (form.script) {
      const b = this.buildScriptsFunc(form.script);
      return { dynamicFormGroup: new DynamicFormGroup(result), script: b };
    }

    return { dynamicFormGroup: new DynamicFormGroup(result), script: null };
  }

  private buildScriptsFunc(scriptStr: string) {
    let funcToReturn: Function;

    const funcTemplate = 'funcToReturn = function() { ##body## }';
    const funcStr = funcTemplate.replace('##body##', scriptStr);

    // tslint:disable-next-line:no-eval
    eval(funcStr);

    return funcToReturn;
  }

  private getValidators(control) {
    const validators = [];
    if (isArray(control.validators)) {
      control.validators.forEach((element) => {
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
