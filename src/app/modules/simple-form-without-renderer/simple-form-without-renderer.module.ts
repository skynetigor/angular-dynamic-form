import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';

import { SimpleFormWithoutRendererComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormWithoutRendererComponent }]),
    ReactiveFormsModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormWithoutRendererComponent]
})
export class SimpleFormWithoutRendererModule {}
