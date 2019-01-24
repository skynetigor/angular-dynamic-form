import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlWrapperComponent, DynamicFormComponent, TemplateWrapperComponent } from './components';

@NgModule({
  declarations: [ControlWrapperComponent, DynamicFormComponent, ControlWrapperComponent, TemplateWrapperComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, DynamicFormComponent, FormsModule]
})
export class DynamicFormModule {}
