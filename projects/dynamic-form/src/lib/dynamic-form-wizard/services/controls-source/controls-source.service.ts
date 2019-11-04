import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { WIZARD_CONTROLS } from '../../constants';
import { WizardControl } from '../../types';

@Injectable()
export class ControlsSourceService {
    private subject: BehaviorSubject<WizardControl[]>;

    constructor(injector: Injector) {
        const wizardControls = injector.get(WIZARD_CONTROLS, []);
        this.subject = new BehaviorSubject<WizardControl[]>(wizardControls);
    }

    getWizardControlsStream(): Observable<WizardControl[]> {
        return this.subject.asObservable();
    }

    setWizardControls(wizardControls: WizardControl[]) {
        this.subject.next(wizardControls);
    }
}
