import { DynamicControlHandlerFactoryService } from "./dynamic-control-handler-factory.service";
import { TestBed } from "@angular/core/testing";

describe("DynamicControlHandlerFactoryService", () => {

  let service: DynamicControlHandlerFactoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicControlHandlerFactoryService
      ]
    });
    service = TestBed.get(DynamicControlHandlerFactoryService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
