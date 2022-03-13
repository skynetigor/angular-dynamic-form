import { Type } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ControlConfiguration } from '../../dynamic-form/types';

import { ControlDefinition } from './control-configuration.model';

export interface WizardControl {
    initialConfig: ControlConfiguration<any, any, any>;
    componentType: Type<ControlValueAccessor>;
    controlDefinition: ControlDefinition;
}
