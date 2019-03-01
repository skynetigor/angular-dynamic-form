import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormGroup, TemplateModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form-with-controls-styling',
  templateUrl: './simple-form-with-controls-styling.component.html',
  styleUrls: ['./simple-form-with-controls-styling.component.scss']
})
export class SimpleFormWithControlsStylingComponent implements OnInit {
  @ViewChild('infoTmpl') infoTmpl;

  formModel = new DynamicFormGroup({
    info: new TemplateModel(),
    name: new BootstrapTextFieldModel({
      initialInputs: {
        label: 'Your name',
        placeholder: 'Please enter your name here',
        required: true
      }
    }),
    email: new BootstrapTextFieldModel({
      initialInputs: {
        label: 'Email',
        placeholder: 'Please enter youre email here',
        required: true
      }
    }),
    subject: new BootstrapDropdownControlModel({
      initialInputs: {
        label: 'Subject',
        options: ['Incorrect work', 'Unexpected behaviour'],
        required: true,
        placeholder: 'Please pick subject'
      }
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
