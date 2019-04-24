import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule, BootstrapDropdownControlModel, BootstrapTextFieldModel } from 'bootstrap-controls';
import { DynamicFormModule } from 'dynamic-form';
import { FormsFromServerComponent } from './components';
import { HttpModule } from '@angular/http';
import { FormsApiService } from './services';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FormsFromServerComponent }]),
    DynamicFormModule.withFormModelBuilderFromJson({
      BootstrapDropdown: BootstrapDropdownControlModel,
      BootstrapTextField: BootstrapTextFieldModel
    }),
    BootstrapControlsModule,
    HttpModule
  ],
  declarations: [FormsFromServerComponent],
  providers: [FormsApiService]
})
export class FormsFromServerModule {}
