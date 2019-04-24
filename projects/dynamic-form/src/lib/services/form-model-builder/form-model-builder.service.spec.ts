import { FormModelBuilderService } from "./form-model-builder.service";
import { TestBed } from "@angular/core/testing";

describe("FormModelBuilderService", () => {

  let service: FormModelBuilderService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormModelBuilderService
      ]
    });
    service = TestBed.get(FormModelBuilderService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
