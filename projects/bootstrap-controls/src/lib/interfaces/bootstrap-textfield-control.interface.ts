import { IBaseBootstrapControl } from './base-bootstrap-control.interface';

export interface IBootstrapTextfieldControl extends IBaseBootstrapControl<string> {
  type?: 'text' | 'number';
  multiline?: boolean;
}
