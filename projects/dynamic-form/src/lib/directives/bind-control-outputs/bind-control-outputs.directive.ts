import { ComponentFactoryResolver, Directive, DoCheck, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OutputsHandlerService } from '../../services';

/**
 * Directive that is used to bind form control outputs to functions that an object provided for bindControlOutputs input contains
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[bindControlOutputs]'
})
export class BindControlOutputsDirective implements OnInit, DoCheck {
    private valueAccessor: ControlValueAccessor;
    private outputsHandler: OutputsHandlerService;

    @Input()
    bindControlOutputs;

    constructor(
        @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.valueAccessor = valueAccessors[0];
    }

    ngOnInit() {
        const componentType = (<any>this.valueAccessor).constructor;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.outputsHandler = new OutputsHandlerService(componentFactory);
    }

    ngDoCheck(): void {
        this.outputsHandler.handle(this.bindControlOutputs, this.valueAccessor);
    }
}
