import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { DynamicFormGroup, TemplateModel } from '../../../dynamic-form/models';
import { ControlConfiguration } from '../../../dynamic-form/types';
import { WizardControlsFactory } from '../../services';
import { Config, ControlDefinition } from '../../types';

@Component({
    selector: 'lib-control-configuration',
    templateUrl: './control-configuration.component.html',
    styleUrls: ['./control-configuration.component.scss']
})
export class ControlConfigurationComponent implements OnInit {
    private static InitialInputsKey = 'initialInputs';

    private staticControls: Config[] = [{ name: 'controlName', required: true, viewType: 'textfield', displayName: 'Control id (name)' }];

    @ViewChild('section')
    sectionTemplateRef: TemplateRef<any>;

    @Input()
    controlConfiguration: ControlConfiguration<any, any, any>;

    @Input()
    controlDefinition: ControlDefinition;

    @Input()
    controlName: string;

    formGroup = new DynamicFormGroup({
        info: null,
        initialInputsSection: null,
        [ControlConfigurationComponent.InitialInputsKey]: null
    });

    @Output()
    submit = new EventEmitter<any>();

    constructor(private controlsFactory: WizardControlsFactory) {}

    ngOnInit() {
        let controls = {};

        this.formGroup.items.initialInputsSection = new TemplateModel({ name: 'Controls inputs' }, this.sectionTemplateRef);

        this.staticControls.forEach(def => {
            controls[def.name] = this.controlsFactory.createControl(def, this.controlConfiguration);
        });

        this.formGroup.items.info = new DynamicFormGroup(controls);

        this.formGroup.addFormGroup('info', new DynamicFormGroup(controls));

        controls = {};
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
