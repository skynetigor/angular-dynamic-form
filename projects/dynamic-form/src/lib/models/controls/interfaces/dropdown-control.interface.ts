import { IBaseControl } from './base-control.interface';

export interface IDropDownControl<TValue> extends IBaseControl<TValue> {
  options?: TValue[];
}
