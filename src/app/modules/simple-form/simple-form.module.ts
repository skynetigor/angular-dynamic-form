import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleFormComponent } from './components';
import { DynamicFormModule } from 'dynamic-form';
import { BootstrapControlsModule } from 'bootstrap-controls';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormComponent }]),
    DynamicFormModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormComponent]
})
export class SimpleFormModule {}
