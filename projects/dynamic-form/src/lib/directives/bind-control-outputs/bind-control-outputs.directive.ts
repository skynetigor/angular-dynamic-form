import { Directive, Input, DoCheck, OnChanges, SimpleChanges, Inject, OnInit, ComponentFactory } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[bindControlOutputs]'
})
export class BindControlOutputsDirective implements OnInit, DoCheck, OnChanges {
  private valueAccessor: ControlValueAccessor;
  private componentFactory: ComponentFactory<ControlValueAccessor>;
  private outputsSubscriptions: Subscription[] = [];

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
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {}

  ngDoCheck(): void {
    this.unsubscribeFromOutputsSubscription();

      if (this.bindControlOutputs) {
        this.componentFactory.outputs.forEach(prop => {
          const key = prop.propName;

          if (this.bindControlOutputs.hasOwnProperty(prop.propName) && this.bindControlOutputs[key]) {
            this.outputsSubscriptions.push(
              this.valueAccessor[key].subscribe(this.bindControlOutputs[key].bind(this.valueAccessor))
            );
          }
        });
      } else {
        this.unsubscribeFromOutputsSubscription();
      }
  }

  private unsubscribeFromOutputsSubscription() {
    this.outputsSubscriptions.forEach(s => s.unsubscribe());
  }
}
