import { TextfieldControlProvider } from './textfield-control-provider.service';
import { TestBed } from '@angular/core/testing';

describe('TextfieldControlProviderService', () => {
    let service: TextfieldControlProvider;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TextfieldControlProvider]
        });
        service = TestBed.get(TextfieldControlProvider);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });
});
