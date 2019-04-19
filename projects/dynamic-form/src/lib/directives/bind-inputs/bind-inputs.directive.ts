import { Directive, Input, DoCheck, OnChanges, SimpleChanges, Inject, OnInit, ComponentFactory } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ComponentFactoryResolver } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[bindControlInputs]'
})
export class BindControlInputsDirective implements OnInit, DoCheck, OnChanges {
  private valueAccessor: ControlValueAccessor;
  private componentFactory: ComponentFactory<ControlValueAccessor>;

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
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {}

  ngDoCheck(): void {
    if (this.bindControlInputs) {
        this.componentFactory.inputs.forEach(prop => {
          const key = prop.propName;
          if (this.bindControlInputs.hasOwnProperty(key) && this.valueAccessor[key] !== this.bindControlInputs[key]) {
            this.valueAccessor[key] = this.bindControlInputs[key];
          }
        });
      }
  }
}
