import { AbstractDynamicControl } from '../../models';

export function isDynamicControl(v: any) {
  return v instanceof AbstractDynamicControl;
}
