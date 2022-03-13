import { ComponentFactory, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { isFunction } from '../../utils';

export class InputsHandlerService {
    // private firstChangeTrackingDictionary: { [key: string]: boolean } = {};
    private changedInputs: string[] = [];

    constructor(private componentFactory: ComponentFactory<any>) {}

    /**
     * Synchronizes properties of object with inputs of provided component instance
     * @param objWithInputs Object with inputs that component inputs are synchronized with based on its properties
     * @param componentInstance Component instance
     */
    handle(objWithInputs, componentInstance): void {
        const simpleChanges: SimpleChanges = {};

        if (objWithInputs) {
            this.componentFactory.inputs.forEach(prop => {
                const key = prop.propName;
                const isFirstChange = !this.changedInputs.includes(key);

                if (objWithInputs.hasOwnProperty(key) && componentInstance[key] !== objWithInputs[key]) {
                    simpleChanges[key] = new SimpleChange(componentInstance[key], objWithInputs[key], isFirstChange);
                    componentInstance[key] = objWithInputs[key];

                    if (isFirstChange) {
                        this.changedInputs.push(key);
                    }
                }
            });
        }

        const componentWithOnChangeHook = componentInstance as OnChanges;

        if (isFunction(componentWithOnChangeHook.ngOnChanges) && Object.keys(simpleChanges).length) {
            componentWithOnChangeHook.ngOnChanges(simpleChanges);
        }
    }
}
