import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DynamicFormGroup } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit, AfterViewInit {
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
      },
      outputs: {
        dropdownOpened: this.subjectToggled
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
    const c = this;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formModel.items.message.setValue('HELLLLLLOOOOO');
      this.formModel.items.name.setValue('HELLLLLLOOOOO');
      this.formModel.items.subject.inputs.label = 'hello1111';
      this.formModel.items.message = null;
    }, 4000);
  }

  subjectToggled(v) {
    console.log(v);
    console.log(this);
  }
}
