import { InjectionToken } from '@angular/core';

import { WizardControl } from '../types/wizard-control';

export const WIZARD_CONTROLS = new InjectionToken<WizardControl[]>('WIZARD_CONTROLS');
