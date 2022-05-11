import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormOutletComponent } from './components';
import { BindControlInputsDirective, BindControlOutputsDirective, DynamicFormControlOutletDirective } from './directives';

@NgModule({
    declarations: [DynamicFormOutletComponent, DynamicFormControlOutletDirective, BindControlInputsDirective, BindControlOutputsDirective],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    entryComponents: [DynamicFormOutletComponent],
    exports: [
        ReactiveFormsModule,
        DynamicFormOutletComponent,
        FormsModule,
        DynamicFormControlOutletDirective,
        BindControlInputsDirective,
        BindControlOutputsDirective
    ]
})
export class DynamicFormModule {
}
