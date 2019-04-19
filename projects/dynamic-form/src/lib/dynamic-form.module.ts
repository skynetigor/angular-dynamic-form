import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import {
  DynamicFormControlOutletDirective,
  BindControlInputsDirective,
  BindControlOutputsDirective
} from './directives';
import { DynamicControlHandlerFactoryService } from './services';

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
  providers: [DynamicControlHandlerFactoryService],
  entryComponents: [DynamicFormOutletComponent]
})
export class DynamicFormModule {}
