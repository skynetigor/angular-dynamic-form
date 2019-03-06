import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleFormNgTemplateComponent } from './components';
import { DynamicFormModule } from 'dynamic-form';
import { BootstrapControlsModule } from 'bootstrap-controls';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SimpleFormNgTemplateComponent }]),
    DynamicFormModule,
    BootstrapControlsModule
  ],
  declarations: [SimpleFormNgTemplateComponent]
})
export class SimpleFormNgTemplateModule {}
