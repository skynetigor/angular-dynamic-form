import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import {
  DynamicFormControlOutletDirective,
  BindControlInputsDirective,
  BindControlOutputsDirective
} from './directives';

@NgModule({
  declarations: [
    DynamicFormOutletComponent,
    DynamicFormControlOutletDirective,
    BindControlInputsDirective,
    BindControlOutputsDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    ReactiveFormsModule,
    DynamicFormOutletComponent,
    FormsModule,
    DynamicFormControlOutletDirective,
    BindControlInputsDirective,
    BindControlOutputsDirective
  ],
  entryComponents: [DynamicFormOutletComponent]
})
export class DynamicFormModule {}
