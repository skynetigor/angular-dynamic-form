import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormGroup } from 'dynamic-form';

@Component({
  selector: 'app-simple-form-without-renderer',
  templateUrl: './simple-form-without-renderer.component.html',
  styleUrls: ['./simple-form-without-renderer.component.scss']
})
export class SimpleFormWithoutRendererComponent implements OnInit, AfterViewInit {
  formModel = new DynamicFormGroup({
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

  ngOnInit(): void {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.formModel.items.message.setValue('It is changed value through form control!');
      this.formModel.items.name.componetController.inputs.label = 'It is changed label from code!';
    }, 4000);
  }
}
