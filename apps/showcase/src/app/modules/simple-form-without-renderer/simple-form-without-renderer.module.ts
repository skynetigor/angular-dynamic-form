import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';
import { DynamicFormModule } from '@skynet-ng/dynamic-form';

import { SimpleFormWithoutRendererComponent } from './components';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: SimpleFormWithoutRendererComponent }]),
        ReactiveFormsModule,
        BootstrapControlsModule,
        DynamicFormModule
    ],
    declarations: [SimpleFormWithoutRendererComponent]
})
export class SimpleFormWithoutRendererModule {}
