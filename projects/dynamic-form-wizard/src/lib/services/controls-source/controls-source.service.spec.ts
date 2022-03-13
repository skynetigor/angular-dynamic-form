import { ControlsSourceService } from "./controls-source.service";
import { TestBed } from "@angular/core/testing";

describe("ControlsSourceService", () => {

  let service: ControlsSourceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ControlsSourceService
      ]
    });
    service = TestBed.get(ControlsSourceService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
