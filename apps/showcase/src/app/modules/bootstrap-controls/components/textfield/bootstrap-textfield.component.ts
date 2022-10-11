import { Component, Input } from '@angular/core';

import { AbstractValueAccessor, MakeProvider } from '../../abstractions';
import { IBootstrapTextfieldInputs } from '../../interfaces';

@Component({
    selector: 'showcase-bootstrap-textfield',
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
