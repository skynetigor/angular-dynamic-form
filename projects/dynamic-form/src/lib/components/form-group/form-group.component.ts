import { Component, ElementRef, Inject, OnInit } from '@angular/core';

import { DynamicFormGroupInjectionToken } from '../../constants';
import { DynamicFormGroup } from '../../models';

@Component({
    selector: 'lib-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
    constructor(@Inject(DynamicFormGroupInjectionToken) public readonly formModel: DynamicFormGroup<any>, private elementRef: ElementRef) {}

    ngOnInit(): void {
        const componentNativeElement = this.elementRef.nativeElement as HTMLElement;
        componentNativeElement.id = this.formModel.name;
    }
}
