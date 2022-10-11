import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  BootstrapDropdownControlModel,
  BootstrapTextFieldModel,
} from 'bootstrap-controls';
import { DynamicFormGroup } from '@skynet-ng/dynamic-form';

@Component({
  selector: 'showcase-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent {
  private errorTexts = {
    required: 'This field is required',
  };

  formModel = new DynamicFormGroup({
    name: new BootstrapTextFieldModel({
      initialInputs: {
        label: 'Your name',
        placeholder: 'Please enter your name here',
        required: true,
        errorTexts: this.errorTexts,
      },
      displayed: true,
      validators: Validators.required,
    }),
    email: new BootstrapTextFieldModel({
      initialInputs: {
        label: 'Email',
        placeholder: 'Please enter youre email here',
        required: true,
        errorTexts: this.errorTexts,
      },
      validators: Validators.required,
    }),
    subject: new BootstrapDropdownControlModel({
      initialInputs: {
        label: 'Subject',
        options: ['Incorrect work', 'Unexpected behaviour'],
        required: true,
        placeholder: 'Please pick subject',
        errorTexts: this.errorTexts,
      },
      outputs: {
        dropdownOpened: this.subjectToggled.bind(this),
      },
      validators: Validators.required,
    }),
    message: new BootstrapTextFieldModel({
      initialInputs: {
        label: 'Your message',
        placeholder: 'Message',
        multiline: true,
      },
    }),
  });

  get formGroup() {
    return this.formModel;
  }

  subjectToggled(v) {
    console.log(v);
  }

  send(): void {
    console.log('SEND');
  }
}
