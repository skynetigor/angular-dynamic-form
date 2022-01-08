import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { ControlConfigurationComponent, DynamicFormWizardComponent, MaterialTextFieldComponent } from './components';
import { MaterialSelectComponent } from './components/material-select/material-select.component';
import { WIZARD_CONTROLS } from './constants';
import { DraggableDirective, DropAreaDirective } from './directives';
import { ControlsSourceService, WizardControlsFactory } from './services';
import { SelectControlProvider, TextfieldControlProvider } from './services/wizard-controls-providers';
import { WizardControl } from './types/wizard-control';

@NgModule({
    imports: [CommonModule, DynamicFormModule, DragDropModule, MatInputModule, MatSelectModule, MatButtonModule],
    declarations: [
        DynamicFormWizardComponent,
        DropAreaDirective,
        DraggableDirective,
        ControlConfigurationComponent,
        MaterialTextFieldComponent,
        MaterialSelectComponent
    ],
    exports: [DynamicFormModule, DynamicFormWizardComponent, ControlConfigurationComponent],
    entryComponents: [MaterialTextFieldComponent, MaterialSelectComponent],
    providers: [ControlsSourceService, WizardControlsFactory, TextfieldControlProvider, SelectControlProvider]
})
export class DynamicFormWizardModule {
    static withControls(controls: WizardControl[]): ModuleWithProviders {
        return {
            ngModule: DynamicFormWizardModule,
            providers: [
                { provide: WIZARD_CONTROLS, useValue: controls },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: controls, multi: true }
            ]
        };
    }
}
