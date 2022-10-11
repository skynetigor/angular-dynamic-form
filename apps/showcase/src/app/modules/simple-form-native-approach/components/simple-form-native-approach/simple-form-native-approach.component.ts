import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'showcase-simple-form-native-approach',
  templateUrl: './simple-form-native-approach.component.html',
  styleUrls: ['./simple-form-native-approach.component.scss']
})
export class SimpleFormNativeApproachComponent implements OnInit {
  subjectOptions = ['Incorrect work', 'Unexpected behaviour'];

  public errorTexts = {
    required: 'This field is required'
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
