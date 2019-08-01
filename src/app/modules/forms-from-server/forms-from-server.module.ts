import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule, BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormModule } from 'dynamic-form';

import { FormsFromServerComponent } from './components';
import { FormsApiService } from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: FormsFromServerComponent }]),
        DynamicFormModule.withFormModelBuilderFromJson({
            BootstrapDropdown: BootstrapDropdownControlModel,
            BootstrapTextField: BootstrapTextFieldModel
        }),
        BootstrapControlsModule,
        HttpModule
    ],
    declarations: [FormsFromServerComponent],
    providers: [FormsApiService]
})
export class FormsFromServerModule {}
