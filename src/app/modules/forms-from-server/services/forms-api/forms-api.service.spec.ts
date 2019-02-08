import { FormsApiService } from "./forms-api.service";
import { TestBed } from "@angular/core/testing";

describe("FormsApiService", () => {

  let service: FormsApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormsApiService
      ]
    });
    service = TestBed.get(FormsApiService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
