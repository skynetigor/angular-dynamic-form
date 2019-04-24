import { ComponentFactoryResolver, Directive, DoCheck, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputsHandlerService } from '../../services';

/**
 * Directive that is used to bind form control inputs on changes of object provided to bindControlInputs input
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[bindControlInputs]'
})
export class BindControlInputsDirective implements OnInit, DoCheck {
  private valueAccessor: ControlValueAccessor;
  private inputsHandler: InputsHandlerService;

  @Input()
  bindControlInputs;

  constructor(
    @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.valueAccessor = valueAccessors[0];
  }

  ngOnInit() {
    const componentType = (<any>this.valueAccessor).constructor;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.inputsHandler = new InputsHandlerService(componentFactory);
  }

  ngDoCheck(): void {
    this.inputsHandler.handle(this.bindControlInputs, this.valueAccessor);
  }
}
