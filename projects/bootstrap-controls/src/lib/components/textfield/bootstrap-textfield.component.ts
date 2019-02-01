import { Component, Input } from '@angular/core';
import { MakeProvider, AbstractValueAccessor } from 'dynamic-form';

@Component({
  selector: 'lib-bootstrap-textfield',
  templateUrl: './bootstrap-textfield.component.html',
  styleUrls: ['./bootstrap-textfield.component.scss', '../common-styles.scss'],
  providers: [MakeProvider(BootstrapTextfieldComponent)]
})
export class BootstrapTextfieldComponent extends AbstractValueAccessor {
  @Input()
  placeholder = '';
  @Input()
  type = 'text';
  @Input()
  multiline = false;

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
