import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormOutletComponent } from './components';
import { DynamicFormControlOutletDirective } from './directives';
import { DynamicControlHandlerFactoryService } from './services';

@NgModule({
  declarations: [DynamicFormOutletComponent, DynamicFormControlOutletDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, DynamicFormOutletComponent, FormsModule, DynamicFormControlOutletDirective],
  providers: [DynamicControlHandlerFactoryService],
  entryComponents: [DynamicFormOutletComponent]
})
export class DynamicFormModule {}
