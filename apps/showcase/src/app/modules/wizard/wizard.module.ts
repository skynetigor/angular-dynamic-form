import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapControlsModule, BootstrapDropdownComponent, BootstrapTextfieldComponent } from 'bootstrap-controls';
import { DynamicFormWizardModule, WizardControl } from '@skynet-ng/dynamic-form';

import { WizardComponent } from './components/wizard/wizard.component';

const controls: WizardControl[] = [
    {
        componentType: BootstrapTextfieldComponent,
        initialConfig: {
            initialInputs: {
                label: 'Textfield',
                placeholder: 'Textfield'
            }
        },
        controlDefinition: {
            inputs: [
                { viewType: 'textfield', name: 'label', displayName: 'Label' },
                { viewType: 'select', name: 'type', displayName: 'Type', data: ['text', 'number'] },
                {
                    viewType: 'select',
                    name: 'multiline',
                    displayName: 'Multiline?',
                    data: [{ label: 'Yes', data: true }, { data: false, label: 'No' }],
                    displayProperty: 'label',
                    valueProperty: 'data'
                }
            ]
        } as any
    },
    {
        componentType: BootstrapDropdownComponent,
        initialConfig: {
            initialInputs: {
                label: 'Dropdown label',
                placeholder: 'Dropdown',
                options: ['First value', 'Second value', 'Third value']
            }
        },
        controlDefinition: {
            inputs: [
                { viewType: 'textfield', name: 'label', displayName: 'Label' },
                { viewType: 'textfield', name: 'displayedProperty', displayName: 'Display property' },
                {
                    viewType: 'select',
                    name: 'options',
                    multiple: true,
                    displayName: 'Options',
                    data: ['opt 1', 'opt 2', 'opt3']
                }
            ]
        }
    } as any
];

@NgModule({
    imports: [
        CommonModule,
        DynamicFormWizardModule.withControls(controls),
        BootstrapControlsModule,
        RouterModule.forChild([{ path: '', component: WizardComponent }])
    ],
    // providers: [{ provide: AbstractControlsFactory, useClass: ControlsFactory }],
    declarations: [WizardComponent]
})
export class WizardModule {}
