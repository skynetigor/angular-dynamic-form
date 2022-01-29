export { DynamicFormModule } from './lib/dynamic-form/dynamic-form.module';
export { DynamicFormOutletComponent } from './lib/dynamic-form/components';
export { AbstractDynamicControl, GenericDynamicControl, TemplateModel, DynamicFormGroup } from './lib/dynamic-form/models';
export { DynamicFormControlOutletDirective, BindControlInputsDirective, BindControlOutputsDirective } from './lib/dynamic-form/directives';
export { ControlConfiguration, ControlOrTemplate, OutputsObject } from './lib/dynamic-form/types';
export { FormModelBuilderService, InputsHandlerService, OutputsHandlerService } from './lib/dynamic-form/services';
// temp
export { dynamicControlAttrName, DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from './lib/dynamic-form/constants';
export { isDynamicControl, isTemplateModel, setupControl } from './lib/dynamic-form/utils';
export {
    emailValidator,
    phoneValidator,
    patternValidator,
    maxLength,
    minLength,
    required,
    compareValidator
} from './lib/dynamic-form/validators';
export * from './lib/dynamic-form-wizard';
