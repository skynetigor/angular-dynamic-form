import { IBaseBootstrapInputs } from './base-bootstrap-control.interface';

export interface IBootstrapTextfieldInputs extends IBaseBootstrapInputs {
  type?: 'text' | 'number';
  multiline?: boolean;
}
