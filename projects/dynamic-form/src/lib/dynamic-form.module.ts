import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import {
  DynamicTemplateOutletDirective,
  DynamicFormControlDirective,
  DynamicFormControlOutletDirective,
  DynamicFormControlNameDirective
} from './directives';

@NgModule({
  declarations: [
    DynamicFormOutletComponent,
    DynamicFormControlDirective,
    DynamicFormControlOutletDirective,
    DynamicTemplateOutletDirective,
    DynamicFormControlNameDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    ReactiveFormsModule,
    DynamicFormOutletComponent,
    FormsModule,
    DynamicFormControlDirective,
    DynamicTemplateOutletDirective,
    DynamicFormControlOutletDirective,
    DynamicFormControlNameDirective
  ]
})
export class DynamicFormModule {}
