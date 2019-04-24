import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule, ValidatorFn, Validator } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import {
  DynamicFormControlOutletDirective,
  BindControlInputsDirective,
  BindControlOutputsDirective
} from './directives';
import { FormModelBuilderService } from './services';
import { AbstractDynamicControl } from './models';
import { DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from './constants';
import { defaultValidatorsDictionary } from './default-validators-dictionary';

@NgModule({
  declarations: [
    DynamicFormOutletComponent,
    DynamicFormControlOutletDirective,
    BindControlInputsDirective,
    BindControlOutputsDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    ReactiveFormsModule,
    DynamicFormOutletComponent,
    FormsModule,
    DynamicFormControlOutletDirective,
    BindControlInputsDirective,
    BindControlOutputsDirective
  ],
  entryComponents: [DynamicFormOutletComponent]
})
export class DynamicFormModule {
  static withFormModelBuilderFromJson(
    dynamicControlsDictionary: {
      [key: string]: Type<AbstractDynamicControl<any>>;
    },
    validatorsDictionary?: { [key: string]: ValidatorFn | Validator }
  ): ModuleWithProviders {
    return {
      ngModule: DynamicFormModule,
      providers: [
        { provide: DYNAMIC_CONTROLS_DICTIONARY, useValue: dynamicControlsDictionary },
        {
          provide: VALIDATORS_DICTIONARY,
          useValue: validatorsDictionary
            ? { ...defaultValidatorsDictionary, ...validatorsDictionary }
            : defaultValidatorsDictionary
        },
        FormModelBuilderService
      ]
    };
  }
}
