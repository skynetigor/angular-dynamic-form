import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormGroup } from 'dynamic-form';

@Component({
    selector: 'app-simple-form',
    templateUrl: './simple-form.component.html',
    styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit, AfterViewInit {
    private errorTexts = {
        required: 'This field is required'
    };

    formModel = new DynamicFormGroup({
        name: new BootstrapTextFieldModel({
            initialInputs: {
                label: 'Your name',
                placeholder: 'Please enter your name here',
                required: true,
                errorTexts: this.errorTexts
            },
            displayed: false,
            validators: Validators.required
        }),
        email: new BootstrapTextFieldModel({
            initialInputs: {
                label: 'Email',
                placeholder: 'Please enter youre email here',
                required: true,
                errorTexts: this.errorTexts
            },
            validators: Validators.required
        }),
        subject: new BootstrapDropdownControlModel({
            initialInputs: {
                label: 'Subject',
                options: ['Incorrect work', 'Unexpected behaviour'],
                required: true,
                placeholder: 'Please pick subject',
                errorTexts: this.errorTexts
            },
            outputs: {
                dropdownOpened: this.subjectToggled.bind(this)
            },
            validators: Validators.required
        }),
        message: new BootstrapTextFieldModel({
            initialInputs: { label: 'Your message', placeholder: 'Message', multiline: true }
        })
    });

    get formGroup() {
        return this.formModel;
    }

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.formModel.items.message.setValue('HELLLLLLOOOOO');
            this.formModel.items.name.setValue('HELLLLLLOOOOO');
            this.formModel.items.subject.inputs.label = 'hello1111';
        }, 2000);
    }

    subjectToggled(v) {
        console.log(v);
    }

    click() {
        this.formModel.items.name.displayed = !this.formModel.items.name.displayed;
    }
}
