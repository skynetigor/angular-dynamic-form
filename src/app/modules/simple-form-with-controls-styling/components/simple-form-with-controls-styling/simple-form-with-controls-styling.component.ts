import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormGroup, TemplateModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-form-with-controls-styling',
  templateUrl: './simple-form-with-controls-styling.component.html',
  styleUrls: ['./simple-form-with-controls-styling.component.scss']
})
export class SimpleFormWithControlsStylingComponent implements OnInit {
  @ViewChild('infoTmpl') infoTmpl;

  private errorTexts = {
    required: 'This field is required'
  };

  formModel = new DynamicFormGroup({
    info: new TemplateModel(),
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

  ngOnInit() {
    this.formModel.items.info.templateRef = this.infoTmpl;
  }
}
