import { DynamicFormGroup } from '../../models/dynamic-form-group';

export function isDynamicFormGroup(obj: any) {
    return obj instanceof DynamicFormGroup;
}
