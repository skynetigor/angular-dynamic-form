import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'showcase-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
    hideFormStateReflection = true;

    constructor() {}

    ngOnInit() {}
}
