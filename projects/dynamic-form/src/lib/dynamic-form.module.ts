import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  DynamicControlOutletComponent,
  DynamicFormOutletComponent,
  DynamicTemplateOutletComponent
} from './components';

@NgModule({
  declarations: [DynamicControlOutletComponent, DynamicFormOutletComponent, DynamicTemplateOutletComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, DynamicFormOutletComponent, FormsModule]
})
export class DynamicFormModule {}
