import { DynamicFormGroup } from '../../models';

export function isDynamicFormGroup(obj: any) {
    return obj instanceof DynamicFormGroup;
}
