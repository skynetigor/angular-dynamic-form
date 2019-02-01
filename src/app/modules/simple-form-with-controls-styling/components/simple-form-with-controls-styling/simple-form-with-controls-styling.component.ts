import { Component, OnInit, ViewChild } from '@angular/core';
import { FormModel, TemplateModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form-with-controls-styling',
  templateUrl: './simple-form-with-controls-styling.component.html',
  styleUrls: ['./simple-form-with-controls-styling.component.scss']
})
export class SimpleFormWithControlsStylingComponent implements OnInit {
  @ViewChild('infoTmpl') infoTmpl;

  formModel = new FormModel({
    info: new TemplateModel(this.infoTmpl),
    name: new BootstrapTextFieldModel({
      label: 'Your name',
      placeholder: 'Please enter your name here',
      required: true
    }),
    email: new BootstrapTextFieldModel({
      label: 'Email',
      placeholder: 'Please enter youre email here',
      required: true
    }),
    subject: new BootstrapDropdownControlModel({
      label: 'Subject',
      options: ['Incorrect work', 'Unexpected behaviour'],
      required: true,
      placeholder: 'Please pick subject'
    }),
    message: new BootstrapTextFieldModel({ label: 'Your message', placeholder: 'Message', multiline: true })
  });

  get formGroup() {
    return this.formModel.formGroup;
  }

  constructor() {}

  ngOnInit() {
    this.formModel.controls.info.templateRef = this.infoTmpl;
  }
}
