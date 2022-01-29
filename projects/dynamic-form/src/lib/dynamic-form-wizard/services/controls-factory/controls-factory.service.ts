import { Injectable, Injector, Type } from '@angular/core';

import { AbstractDynamicControl } from '../../../dynamic-form/models';
import { ControlConfiguration } from '../../../dynamic-form/types';
import { Config } from '../../types';
import { AbstractControlsFactory } from '../abstract-controls-factory';
import { AbstractControlProvider, SelectControlProvider, TextfieldControlProvider } from '../wizard-controls-providers';

@Injectable()
export class WizardControlsFactory extends AbstractControlsFactory {
    constructor(private injector: Injector) {
        super();
    }

    private controlsProviders: { [key: string]: Type<AbstractControlProvider> } = {
        textfield: TextfieldControlProvider,
        select: SelectControlProvider
    };

    createControl(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any> {
        const customFactory = this.injector.get(AbstractControlsFactory, null) as AbstractControlsFactory;
        let abs: AbstractDynamicControl<any>;

        if (customFactory) {
            abs = customFactory.createControl(def, currentConfig);
        }

        if (abs === null || abs === undefined) {
            abs = (this.injector.get(this.controlsProviders[def.viewType]) as AbstractControlProvider).create(def, currentConfig);
        }

        return abs;
    }
}
