import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormGroup, TemplateModel } from '@skynet-ng/dynamic-form';

@Component({
    selector: 'app-simple-form-ng-template',
    templateUrl: './simple-form-ng-template.component.html',
    styleUrls: ['./simple-form-ng-template.component.scss']
})
export class SimpleFormNgTemplateComponent implements OnInit, AfterViewInit {
    @ViewChild('tmpl') tmpl;

    @ViewChild('wrapper')
    private wrapper;

    templates: { [key: string]: TemplateRef<any> };

    private errorTexts = {
        required: 'This field is required'
    };

    formModel = new DynamicFormGroup({
        greenBox: new TemplateModel({
            alertClass: 'alert-success',
            text:
                'This is template applied in FormModel as first element. Click here to add elements before and after form control and click again to hide them'
        }),
        name: new BootstrapTextFieldModel({
            initialInputs: {
                label: 'Your name',
                placeholder: 'Please enter your name here',
                required: true,
                errorTexts: this.errorTexts
            },
            validators: Validators.required
        }),
        email: new BootstrapTextFieldModel({
            initialInputs: {
                label: 'Email',
                placeholder: 'Please enter your email here',
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

    click() {
        if (!this.templates) {
            this.templates = {};

            ['name', 'email', 'subject', 'message'].forEach(str => (this.templates[str] = this.wrapper));

            (<any>this.formModel.items).hello = new BootstrapTextFieldModel({
                initialInputs: {
                    label: 'Email',
                    placeholder: 'Please enter youre email here',
                    required: true,
                    errorTexts: this.errorTexts
                }
            });
        } else {
            this.templates = null;
            (<any>this.formModel.items).hello = null;
        }
    }

    ngOnInit() {
        this.formModel.items.greenBox.templateRef = this.tmpl;
    }

    ngAfterViewInit() {}
}
