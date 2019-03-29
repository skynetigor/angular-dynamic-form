import { DynamicControlOutletHandlerService } from "./dynamic-control-outlet-handler.service";
import { TestBed } from "@angular/core/testing";

describe("DynamicControlOutletHandlerService", () => {

  let service: DynamicControlOutletHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicControlOutletHandlerService
      ]
    });
    service = TestBed.get(DynamicControlOutletHandlerService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
