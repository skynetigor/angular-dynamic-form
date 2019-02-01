import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-simple-form-without-renderer',
  templateUrl: './simple-form-without-renderer.component.html',
  styleUrls: ['./simple-form-without-renderer.component.scss']
})
export class SimpleFormWithoutRendererComponent implements OnInit {
  config = {
    name: {
      controlName: 'name',
      label: 'Your name',
      placeholder: 'Please enter your name here',
      required: true
    },
    email: { controlName: 'email', label: 'Email', placeholder: 'Please enter youre email here', required: true },
    subject: {
      controlName: 'subject',
      label: 'Subject',
      options: ['Incorrect work', 'Unexpected behaviour'],
      required: true,
      placeholder: 'Please pick subject'
    },
    message: { controlName: 'message', label: 'Your message', placeholder: 'Message', multiline: true, required: false }
  };

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      subject: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    console.log(this.formGroup.valid);
    this.cd.detectChanges();
  }
}
