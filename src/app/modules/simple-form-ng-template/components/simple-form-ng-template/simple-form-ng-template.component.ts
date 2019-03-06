import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DynamicFormGroup, TemplateModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form-ng-template',
  templateUrl: './simple-form-ng-template.component.html',
  styleUrls: ['./simple-form-ng-template.component.scss']
})
export class SimpleFormNgTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('tmpl') tmpl;

  showTeplatesInWrapper = false;

  formModel = new DynamicFormGroup({
    greenBox: new TemplateModel({
      alertClass: 'alert-success',
      text:
        'This is template applied in FormModel as first element. Click here to add elements before and after form control and click again to hide them'
    }),
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
        options: [{ name: 'Incorrect work' }, { name: 'One more value' }],
        required: true,
        displayedProperty: 'name',
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

  click() {
    if (this.showTeplatesInWrapper) {
      this.showTeplatesInWrapper = false;
    } else {
      this.showTeplatesInWrapper = true;
    }
  }

  ngOnInit() {
    this.formModel.items.greenBox.templateRef = this.tmpl;
  }

  ngAfterViewInit() {}
}
