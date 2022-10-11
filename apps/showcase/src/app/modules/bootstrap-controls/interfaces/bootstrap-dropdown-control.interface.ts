import { IBaseBootstrapInputs } from './base-bootstrap-control.interface';

export interface IBootstrapDropdownInputs<TValue = any> extends IBaseBootstrapInputs {
  options?: TValue[];
  displayedProperty?: string;
}
