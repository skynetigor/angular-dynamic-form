import { ComponentFactory } from '@angular/core';

export class InputsHandlerService {
  constructor(private componentFactory: ComponentFactory<any>) {}

  /**
   * Synchronizes properties of object with inputs of provided component instance
   * @param objWithInputs Object with inputs that component inputs are synchronized with based on its properties
   * @param componentInstance Component instance
   */
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
