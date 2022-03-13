import { AbstractDynamicControl } from '../../models/controls/abstract-dynamic-control.model';

export function isDynamicControl(obj: any) {
    return obj instanceof AbstractDynamicControl;
}
