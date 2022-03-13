import { Component, Input, OnInit } from '@angular/core';

import { AbstractValueAccessor } from '../abstract-value-accessor';

@Component({
    selector: 'lib-material-select',
    templateUrl: './material-select.component.html',
    styleUrls: ['./material-select.component.scss']
})
export class MaterialSelectComponent extends AbstractValueAccessor implements OnInit {
    @Input()
    displayProperty: string;
    @Input()
    valueProperty: string;
    @Input()
    multiple: string;

    @Input()
    options: [];

    ngOnInit() {}
}
