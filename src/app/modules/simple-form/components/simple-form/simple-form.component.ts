import { Component, OnInit } from '@angular/core';
import { FormModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {
  index = 0;
  formModel = new FormModel({
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

  ngOnInit() {}
}
