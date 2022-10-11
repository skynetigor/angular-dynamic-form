import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'showcase-simple-form-with-inputs-binder-directive',
  templateUrl: './simple-form-with-inputs-binder-directive.component.html',
  styleUrls: ['./simple-form-with-inputs-binder-directive.component.scss']
})
export class SimpleFormWitInputsBinderComponent implements OnInit {
  subjectOptions = ['Incorrect work', 'Unexpected behaviour'];

  private errorTexts = {
    required: 'This field is required'
  };

  formGroup: FormGroup;

  formConfig = {
    name: {
      name: 'name',
      inputs: {
        label: 'Your name',
        placeholder: 'Please enter your name here',
        required: true,
        errorTexts: this.errorTexts
      }
    },
    email: {
      name: 'email',
      inputs: {
        label: 'Email',
        placeholder: 'Please enter youre email here',
        required: true,
        errorTexts: this.errorTexts
      },
      outputs: {}
    },
    subject: {
      name: 'subject',
      inputs: {
        label: 'Subject',
        options: ['Incorrect work', 'Unexpected behaviour'],
        required: true,
        placeholder: 'Please pick subject',
        errorTexts: this.errorTexts,
      },
      outputs: {
        dropdownOpened: (b) => alert(`Is dropdown opened? ${b}`)
      }
    },
    message: {
      name: 'message',
      inputs: { label: 'Your message', placeholder: 'Message', multiline: true },
      outputs: {}
    }
  };

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      subject: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    this.cd.detectChanges();
    setTimeout(() => {
      this.formConfig.subject.inputs.label = 'fgffffffffffffffffffffffff';
      this.formConfig.subject.inputs.placeholder = '123';
      this.formConfig.subject.inputs.options = ['1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2'];
    }, 5000);
  }
}
