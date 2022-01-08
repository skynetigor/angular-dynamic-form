import { ComponentFactory } from '@angular/core';

import { InputsHandlerService } from './inputs-handler.service';

describe('FormModelBuilderService', () => {
    let service: InputsHandlerService;
    let componentFactory: ComponentFactory<any>;

    beforeEach(() => {
        componentFactory = <any>{
            get inputs() {
                return [];
            }
        };
        service = new InputsHandlerService(componentFactory);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('handle', () => {
        it('should sync inputs of component with object based on component factory', () => {
            const inputs = [
                {
                    propName: 'someProp'
                }
            ];
            spyOnProperty(componentFactory, 'inputs').and.returnValue(inputs);
            const obj = {
                someProp: 'somePropValue'
            };
            const componentInstance: any = {};

            service.handle(obj, componentInstance);

            expect(obj.someProp).toBe(componentInstance.someProp);
        });

        it('should not set property of component instance to undefined if property with the same name does not exist in object', () => {
            const inputs = [
                {
                    propName: 'someProp'
                }
            ];
            spyOnProperty(componentFactory, 'inputs').and.returnValue(inputs);
            const obj = {};
            const componentInstance: any = {
                someProp: 'jjjjjjj'
            };

            service.handle(obj, componentInstance);

            expect(componentInstance.someProp).not.toBeUndefined();
        });
    });
});
