export { DynamicFormModule } from './lib/dynamic-form.module';
export { DynamicFormOutletComponent } from './lib/components';
export { DynamicControl, TemplateModel, DynamicFormGroup } from './lib/models';
export { DynamicFormControlOutletDirective, BindControlInputsDirective, BindControlOutputsDirective } from './lib/directives';
export { ControlConfiguration, ControlOrTemplate, OutputsObject } from './lib/types';
// temp
export { dynamicControlAttrName, DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from './lib/constants';
export { isDynamicControl, isTemplateModel, setupControl } from './lib/utils';
export {
    emailValidator,
    phoneValidator,
    patternValidator,
    maxLength,
    minLength,
    required,
    compareValidator
} from './lib/validators';
