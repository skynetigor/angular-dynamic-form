import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validator, ValidatorFn } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import { DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from './constants';
import { defaultValidatorsDictionary } from './default-validators-dictionary';
import { BindControlInputsDirective, BindControlOutputsDirective, DynamicFormControlOutletDirective } from './directives';
import { AbstractDynamicControl } from './models';
import { FormModelBuilderService } from './services';

@NgModule({
    declarations: [DynamicFormOutletComponent, DynamicFormControlOutletDirective, BindControlInputsDirective, BindControlOutputsDirective],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    entryComponents: [DynamicFormOutletComponent],
    exports: [
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
    ): ModuleWithProviders<DynamicFormModule> {
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
