import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-simple-form-native-approach',
  templateUrl: './simple-form-native-approach.component.html',
  styleUrls: ['./simple-form-native-approach.component.scss']
})
export class SimpleFormNativeApproachComponent implements OnInit {
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
