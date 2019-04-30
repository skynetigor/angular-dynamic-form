import { AbstractDynamicControl } from '../../models';

export function isDynamicControl(obj: any) {
    return obj instanceof AbstractDynamicControl;
}
