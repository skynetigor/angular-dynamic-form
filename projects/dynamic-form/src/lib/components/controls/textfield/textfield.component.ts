import { Component, Input } from '@angular/core';

import { AbstractValueAccessor, MakeProvider } from '../../../abstractions';

@Component({
  selector: 'lib-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  providers: [MakeProvider(TextfieldComponent)]
})
export class TextfieldComponent extends AbstractValueAccessor {
  @Input()
  placeholder = '';

  setDisabledState(isDisabled: boolean) {
    console.log(isDisabled);
    this.isDisabled = isDisabled;
  }
}
