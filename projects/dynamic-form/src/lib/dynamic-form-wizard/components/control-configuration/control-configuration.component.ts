import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DynamicFormGroup } from '../../../dynamic-form/models';
import { ControlConfiguration } from '../../../dynamic-form/types';
import { WizardControlsFactory } from '../../services';
import { ControlDefinition } from '../../types';

@Component({
    selector: 'lib-control-configuration',
    templateUrl: './control-configuration.component.html',
    styleUrls: ['./control-configuration.component.scss']
})
export class ControlConfigurationComponent implements OnInit {
    private static InitialInputsKey = 'initialInputs';

    @Input()
    controlConfiguration: ControlConfiguration<any, any, any>;

    @Input()
    controlDefinition: ControlDefinition;

    formGroup = new DynamicFormGroup({
        [ControlConfigurationComponent.InitialInputsKey]: null
    });

    @Output()
    submit = new EventEmitter<any>();

    constructor(private controlsFactory: WizardControlsFactory) {}

    ngOnInit() {
        const controls = {};

        this.controlDefinition.inputs.forEach(def => {
            controls[def.name] = this.controlsFactory.createControl(def, this.controlConfiguration);
        });

        this.formGroup.addFormGroup(ControlConfigurationComponent.InitialInputsKey, new DynamicFormGroup(controls));

        Object.keys(this.formGroup.items.initialInputs.controls).forEach(key => {
            if (key in this.controlConfiguration.initialInputs) {
                this.formGroup.items.initialInputs.get(key).setValue(this.controlConfiguration.initialInputs[key], { emitEvent: false });
            }
        });
    }

    submitForm() {
        this.submit.emit(this.formGroup.value);
    }
}
