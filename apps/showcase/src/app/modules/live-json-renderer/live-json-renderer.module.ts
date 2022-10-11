import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { BootstrapControlsModule, BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormModule } from '@skynet-ng/dynamic-form';

import { LiveJsonRendererComponent } from './components';
import { JsonEditorComponent } from './components/json-editor/json-editor.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: LiveJsonRendererComponent }]),
        ReactiveFormsModule,
        BootstrapControlsModule,
        DynamicFormModule.withFormModelBuilderFromJson({
            BootstrapDropdown: BootstrapDropdownControlModel,
            BootstrapTextField: BootstrapTextFieldModel
        }),
        NgJsonEditorModule
    ],
    declarations: [LiveJsonRendererComponent, JsonEditorComponent]
})
export class LiveJsonRendererModule {}
