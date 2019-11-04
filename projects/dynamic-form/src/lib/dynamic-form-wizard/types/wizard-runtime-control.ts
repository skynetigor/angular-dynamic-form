import { ControlValueAccessor } from '@angular/forms';
import { GenericDynamicControl } from '../../dynamic-form/models';

import { WizardControl } from './wizard-control';

export interface WizardRuntimeControl extends WizardControl {
    control: GenericDynamicControl<ControlValueAccessor>;
}
