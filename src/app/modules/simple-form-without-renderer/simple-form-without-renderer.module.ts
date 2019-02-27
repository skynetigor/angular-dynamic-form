import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';

import { SimpleFormWithoutRendererComponent } from './components';
import { DynamicFormModule } from 'dynamic-form';

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
