import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicFormModule } from '@skynet-ng/dynamic-form';
import { BootstrapControlsModule } from 'bootstrap-controls';
import { SimpleFormWithControlsStylingComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormWithControlsStylingComponent }]),
    DynamicFormModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormWithControlsStylingComponent]
})
export class SimpleFormWithControlsStylingModule {}
