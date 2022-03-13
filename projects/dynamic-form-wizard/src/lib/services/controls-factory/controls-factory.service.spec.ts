import { TestBed } from '@angular/core/testing';

import { WizardControlsFactory } from './controls-factory.service';

describe('ControlsFactoryService', () => {
    let service: WizardControlsFactory;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WizardControlsFactory]
        });
        service = TestBed.get(WizardControlsFactory);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });
});
