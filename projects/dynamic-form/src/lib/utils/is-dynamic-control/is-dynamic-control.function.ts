import { AbstractDynamicControl } from '../../models/controls/abstract-dynamic-control.model';

export function isDynamicControl(obj: any): boolean {
    return obj instanceof AbstractDynamicControl;
}
