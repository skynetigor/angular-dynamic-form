import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validator, ValidatorFn } from '@angular/forms';

import { DynamicFormOutletComponent, FormGroupComponent } from './components';
import { DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from './constants';
import { defaultValidatorsDictionary } from './default-validators-dictionary';
import {
    BindControlInputsDirective,
    BindControlOutputsDirective,
    DynamicFormControlOutletDirective,
    NestedDynamicFormGroupOutletDirective
} from './directives';
import { AbstractDynamicControl } from './models';
import { FormModelBuilderService } from './services';

@NgModule({
    declarations: [
        DynamicFormOutletComponent,
        DynamicFormControlOutletDirective,
        NestedDynamicFormGroupOutletDirective,
        BindControlInputsDirective,
        BindControlOutputsDirective,
        FormGroupComponent
    ],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    entryComponents: [FormGroupComponent],
    exports: [
        NestedDynamicFormGroupOutletDirective,
        ReactiveFormsModule,
        DynamicFormOutletComponent,
        FormsModule,
        DynamicFormControlOutletDirective,
        BindControlInputsDirective,
        BindControlOutputsDirective
    ]
})
export class DynamicFormModule {
    static withFormModelBuilderFromJson(
        dynamicControlsDictionary: {
            [key: string]: Type<AbstractDynamicControl<any>>;
        },
        validatorsDictionary?: { [key: string]: (validatorCfg?) => ValidatorFn | Validator }
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
