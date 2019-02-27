import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { FormModel } from 'dynamic-form';

@Component({
  selector: 'app-simple-form-without-renderer',
  templateUrl: './simple-form-without-renderer.component.html',
  styleUrls: ['./simple-form-without-renderer.component.scss']
})
export class SimpleFormWithoutRendererComponent implements OnInit, AfterViewInit {
  formModel = new FormModel({
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
    return this.formModel.formGroup;
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.formModel.controls.message.setValue('HELLLLLLOOOOO');
    }, 4000);
  }
}
