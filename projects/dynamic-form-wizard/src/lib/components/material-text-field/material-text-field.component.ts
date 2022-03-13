import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractValueAccessor } from '../abstract-value-accessor';

@Component({
    selector: 'lib-text-field',
    templateUrl: './material-text-field.component.html',
    styleUrls: ['./material-text-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MaterialTextFieldComponent),
            multi: true
        }
    ]
})
export class MaterialTextFieldComponent extends AbstractValueAccessor {}
