import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';

import { SimpleFormWitInputsBinderComponent } from './components';
import { DynamicFormModule } from 'dynamic-form';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormWitInputsBinderComponent }]),
    ReactiveFormsModule,
    DynamicFormModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormWitInputsBinderComponent]
})
export class SimpleFormWitInputsBinderModule {}
