import { IBaseControl } from './base-control.interface';

export interface ITextfieldControl extends IBaseControl<string> {
  type?: string;
}
