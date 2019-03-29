import { TestBed } from '@angular/core/testing';
import { DynamicControlHandlerService } from './dynamic-control-handler.service';

describe('DynamicControlHandlerService', () => {
  let service: DynamicControlHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicControlHandlerService]
    });
    service = TestBed.get(DynamicControlHandlerService);
  });

  it('should be able to create service instance', () => {
    expect(service).toBeDefined();
  });
});
