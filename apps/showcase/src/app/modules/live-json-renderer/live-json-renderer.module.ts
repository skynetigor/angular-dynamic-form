import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import {
  BootstrapControlsModule,
  BootstrapDropdownControlModel,
  BootstrapTextFieldModel,
} from 'bootstrap-controls';
import { DynamicFormModule, DYNAMIC_CONTROLS_DICTIONARY, VALIDATORS_DICTIONARY } from '@skynet-ng/dynamic-form';

import { LiveJsonRendererComponent } from './components';
import { JsonEditorComponent } from './components/json-editor/json-editor.component';
import { validatorsDictionary } from './default-validators-dictionary';
import { FormModelBuilderService } from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LiveJsonRendererComponent }]),
    ReactiveFormsModule,
    BootstrapControlsModule,
    DynamicFormModule,
    NgJsonEditorModule,
  ],
  declarations: [LiveJsonRendererComponent, JsonEditorComponent],
  providers: [
    {
      provide: DYNAMIC_CONTROLS_DICTIONARY,
      useValue: {
        BootstrapDropdown: BootstrapDropdownControlModel,
        BootstrapTextField: BootstrapTextFieldModel
    },
    },
    {
      provide: VALIDATORS_DICTIONARY,
      useValue: validatorsDictionary,
    },
    FormModelBuilderService
  ],
})
export class LiveJsonRendererModule {}
