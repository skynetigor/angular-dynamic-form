import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleFormComponent } from './components';
import { DynamicFormModule } from '@skynet-ng/dynamic-form';
import { BootstrapControlsModule } from 'bootstrap-controls';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SimpleFormComponent }]),
    CommonModule,
    DynamicFormModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormComponent]
})
export class SimpleFormModule {}
