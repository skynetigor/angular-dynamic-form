import { SelectControlProvider } from './select-control-provider.service';
import { TestBed } from '@angular/core/testing';

describe('SelectControlProviderService', () => {
    let service: SelectControlProvider;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SelectControlProvider]
        });
        service = TestBed.get(SelectControlProvider);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });
});
