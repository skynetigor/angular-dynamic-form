import { Injector } from '@angular/core';

export class InjectorMock extends Injector {
  get(token: any, notFoundValue?: any);
  get(token: any, notFoundValue?: any, flags?: any) {}
}
