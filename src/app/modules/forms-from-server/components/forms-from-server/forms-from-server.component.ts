import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BootstrapDropdownControlModel } from 'bootstrap-controls';
import { DynamicFormGroup, FormModelBuilderService } from 'dynamic-form';
import { never, Observable } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';

import { FormsApiService } from '../../services';

@Component({
    selector: 'app-forms-from-server',
    templateUrl: './forms-from-server.component.html',
    styleUrls: ['./forms-from-server.component.scss']
})
export class FormsFromServerComponent implements OnInit, AfterViewInit {
    formGroup: FormGroup;

    selectorFormModel = new DynamicFormGroup({
        selectForm: new BootstrapDropdownControlModel({
            initialInputs: {
                label: 'Select form from server',
                placeholder: 'Select form',
                displayedProperty: 'name',
                options: []
            }
        })
    });

    selectFormValueChanges: Observable<any>;

    constructor(private formsApiService: FormsApiService, private formModelBuilderService: FormModelBuilderService) {}

    ngOnInit() {
        this.selectorFormModel.items.selectForm.valueChanges
            .pipe(
                switchMap((t: any) => {
                    if (t) {
                        if (typeof t.value === 'string') {
                            return this.formsApiService.getByName(t.value).pipe(map(r => this.formModelBuilderService.buildFormModel(r)));
                        }
                        return t.value.pipe(map(r => this.formModelBuilderService.buildFormModel(r)));
                    }

                    return never();
                })
            )
            .subscribe((r: any) => (this.formGroup = r));
    }

    ngAfterViewInit() {
        this.selectorFormModel.items.selectForm.inputs.options = [
            { name: 'Login form', value: this.formsApiService.getLoginForm() },
            { name: 'Registration form', value: this.formsApiService.getRegistrationForm() },
            { name: 'All available controls', value: this.formsApiService.getAllAvailableControls() },
            { name: 'for test', value: 'for-test' }
        ];
    }
}
