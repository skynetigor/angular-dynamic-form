import { ComponentFactory } from '@angular/core';
import { of } from 'rxjs';

import { OutputsHandlerService } from './outputs-handler.service';

describe('FormModelBuilderService', () => {
    let service: OutputsHandlerService;
    let componentFactory: ComponentFactory<any>;

    beforeEach(() => {
        componentFactory = <any>{
            get outputs() {
                return [];
            }
        };
        service = new OutputsHandlerService(componentFactory);
    });

    it('should be able to create service instance', () => {
        expect(service).toBeDefined();
    });

    describe('handle', () => {
        it('should bind a function to subscription of observable being existed in the component instance', () => {
            const outputs = [
                {
                    propName: 'someProp'
                }
            ];
            spyOnProperty(componentFactory, 'outputs').and.returnValue(outputs);
            const obj = {
                someProp: function() {}
            };
            const componentInstance = {
                someProp: of()
            };

            spyOn(componentInstance.someProp, 'subscribe');

            service.handle(obj, componentInstance);

            expect(componentInstance.someProp.subscribe).toHaveBeenCalledWith(obj.someProp);
        });
    });
});
