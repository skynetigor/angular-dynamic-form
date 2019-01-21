import { AfterViewChecked, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DropdownControlModel, FormModel, TemplateModel, TextFieldModel } from 'dynamic-form';
import { TextfieldComponent } from 'dynamic-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  config = new FormModel({
    list: new DropdownControlModel({
      options: ['hello', 'amigos', 'privet', 'medved'],
      placeholder: 'list'
    }),
    list2: new DropdownControlModel({
      options: ['kniga', 'amiknigagos', 'privetkniga', 'medved'],
      placeholder: 'kniga'
    }),
    list3: new DropdownControlModel({
      options: ['heldropalo', 'amigos', 'pridropavet', 'dropadropadropa'],
      placeholder: 'dropa',
      label: 'Some label'
    }),
    tmpl: new TemplateModel(),
    text: new TextFieldModel({
      label: 'I dont know',
      placeholder: 'type here',
      required: true
    }),
    someTemplate1: new TemplateModel<any>(),
    letTmpl: new TemplateModel({ age: 200 }),
    letTmpl1: new TemplateModel({ age: 123321 }),
    letTmpl2: new TemplateModel({ age: 'Hello' })
  });

  text = 'Hello from ng-template';

  @ViewChild('temp') temp;
  @ViewChild('late') late;
  @ViewChild('letTmpl') letTmpl;

  ngOnInit(): void {
    this.config.controls.tmpl.templateRef = this.temp;
    this.config.controls.someTemplate1.templateRef = this.late;
    this.config.controls.letTmpl.templateRef = this.letTmpl;
    this.config.controls.letTmpl1.templateRef = this.letTmpl;
    this.config.controls.letTmpl2.templateRef = this.letTmpl;
  }

  public click() {
    this.config.controls.list2.inputs.options = ['somename1', 'somename4', 'somename21', '2213'];
    if (!this.config.controls.text.formControl.disabled) {
      this.config.controls.text.formControl.disable();
    } else {
      this.config.controls.text.formControl.enable();
    }
  }

  ngAfterViewInit(): void {
    this.config.controls.list3.outputs.dropdownOpened.subscribe(console.log);
    this.config.controls.list.outputs.dropdown2Opened.subscribe(t => {
      console.log(` dropdown2Opened ${t}`);
    });
  }
}
