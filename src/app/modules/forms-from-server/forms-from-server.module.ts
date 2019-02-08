import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule } from 'bootstrap-controls';
import { DynamicFormModule } from 'dynamic-form';
import { FormsFromServerComponent } from './components';
import { HttpModule } from '@angular/http';
import { FormsApiService, FormModelBuilderService } from './services';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormsFromServerComponent }]),
    DynamicFormModule,
    BootstrapControlsModule,
    HttpModule
  ],
  declarations: [FormsFromServerComponent],
  providers: [FormsApiService, FormModelBuilderService]
})
export class FormsFromServerModule {}
