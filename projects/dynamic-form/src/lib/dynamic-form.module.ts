import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ControlWrapperComponent,
  TextfieldComponent,
  DynamicFormComponent,
  TemplateWrapperComponent
} from './components';
import { DropdownComponent } from './components';

const controls = [DropdownComponent, TextfieldComponent];
@NgModule({
  declarations: [
    ...controls,
    ControlWrapperComponent,
    DynamicFormComponent,
    ControlWrapperComponent,
    TemplateWrapperComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...controls, ReactiveFormsModule, DynamicFormComponent],
  entryComponents: controls
})
export class FormRendererModule {}
