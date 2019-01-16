import { ITextfieldControl } from '../interfaces';
import { TextfieldComponent } from '../../../components';
import { BaseControlModel } from '../abstractions';

export class TextFieldModel extends BaseControlModel<string, ITextfieldControl> {
  constructor(config: ITextfieldControl) {
    super(config, TextfieldComponent);
  }
}
