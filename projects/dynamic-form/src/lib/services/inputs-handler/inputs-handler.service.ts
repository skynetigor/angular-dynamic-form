import { ComponentFactory } from '@angular/core';

export class InputsHandlerService {
  constructor(private componentFactory: ComponentFactory<any>) {}

  handle(objWithInputs, componentInstance) {
    if (objWithInputs) {
      this.componentFactory.inputs.forEach(prop => {
        const key = prop.propName;
        if (objWithInputs.hasOwnProperty(key) && componentInstance[key] !== objWithInputs[key]) {
          componentInstance[key] = objWithInputs[key];
        }
      });
    }
  }
}
