import { FormsApiService } from "./forms-api.service";
import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

describe("FormsApiService", () => {

  let service: FormsApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
