import { DynamicFormGroup } from '../../models/dynamic-form-group/dynamic-form-group';

export function isDynamicFormGroup(obj: any): boolean {
    return obj instanceof DynamicFormGroup;
}
