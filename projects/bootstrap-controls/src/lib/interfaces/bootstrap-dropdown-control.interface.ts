import { IBaseBootstrapControl } from './base-bootstrap-control.interface';

export interface IBootstrapDropdownControl<TValue> extends IBaseBootstrapControl<TValue> {
  options?: TValue[];
  displayedProperty?: string;
}
