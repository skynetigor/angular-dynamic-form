import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormModel, TemplateModel } from 'dynamic-form';
import { BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';

@Component({
  selector: 'app-simple-form-ng-template',
  templateUrl: './simple-form-ng-template.component.html',
  styleUrls: ['./simple-form-ng-template.component.scss']
})
export class SimpleFormNgTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('redBox') redBoxTmpl;
  @ViewChild('greenBox') greenBoxTmpl;

  formModel = new FormModel({
    greenBox: new TemplateModel({
      text:
        'This is template applied in FormModel as first element. Click here to add redbox template between elements in FormModel and click again to hide them'
    }),
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
      options: [{ name: 'Incorrect work', obj: { empty: 'isEmty' } }],
      required: true,
      displayedProperty: 'name',
      placeholder: 'Please pick subject'
    }),
    message: new BootstrapTextFieldModel({ label: 'Your message', placeholder: 'Message', multiline: true })
  });

  get formGroup() {
    return this.formModel.formGroup;
  }

  constructor() {}

  click() {
    if (this.formModel.tmplBetweenAll) {
      this.formModel.tmplBetweenAll = null;
    } else {
      this.formModel.tmplBetweenAll = new TemplateModel(
        { text: 'This is template between elements in FormModel' },
        this.redBoxTmpl
      );
    }
  }

  ngOnInit() {
    this.formModel.controls.greenBox.templateRef = this.greenBoxTmpl;
  }

  ngAfterViewInit() {}
}
