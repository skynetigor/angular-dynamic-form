import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';

import { SimpleFormNativeApproachComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormNativeApproachComponent }]),
    ReactiveFormsModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormNativeApproachComponent]
})
export class SimpleFormNativeApproachModule {}
