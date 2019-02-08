import { Component, Input } from '@angular/core';
import { MakeProvider, AbstractValueAccessor } from 'dynamic-form';
import { IBootstrapTextfieldInputs } from '../../interfaces';

@Component({
  selector: 'lib-bootstrap-textfield',
  templateUrl: './bootstrap-textfield.component.html',
  styleUrls: ['./bootstrap-textfield.component.scss', '../common-styles.scss'],
  providers: [MakeProvider(BootstrapTextfieldComponent)]
})
export class BootstrapTextfieldComponent extends AbstractValueAccessor implements IBootstrapTextfieldInputs {
  @Input()
  placeholder = '';
  @Input()
  multiline = false;
  @Input()
  type: 'text' | 'number' = 'text';

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
