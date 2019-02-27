import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DynamicControlOutletComponent,
  DynamicFormOutletComponent,
  DynamicTemplateOutletComponent
} from './components';
import { DynamicFormControlDirective } from './directives';

@NgModule({
  declarations: [
    DynamicControlOutletComponent,
    DynamicFormOutletComponent,
    DynamicTemplateOutletComponent,
    DynamicFormControlDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, DynamicFormOutletComponent, FormsModule, DynamicFormControlDirective]
})
export class DynamicFormModule {}
