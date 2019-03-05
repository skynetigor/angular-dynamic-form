import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import {
  DdynamicTemplateOutletDirective,
  DynamicFormControlDirective,
  DynamicFormControlOutletDirective
} from './directives';

@NgModule({
  declarations: [
    DynamicFormOutletComponent,
    DynamicFormControlDirective,
    DynamicFormControlOutletDirective,
    DdynamicTemplateOutletDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, DynamicFormOutletComponent, FormsModule, DynamicFormControlDirective]
})
export class DynamicFormModule {}
