import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { isString } from 'util';

import { AbstractDynamicControl } from '../../models';
import { DynamicControlHandlerFactoryService, DynamicControlHandlerService } from '../../services';

const dynamicFormControlOutletProp = 'dynamicFormControlOutlet';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlOutlet]', providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends NgControl implements OnChanges, OnDestroy, OnInit, DoCheck {
  private _control: AbstractDynamicControl<any>;
  private isDisplayed = true;
  private index: number;
  private dynamicComponentRef: ComponentRef<any>;

  get control() {
    return this._control;
  }

  private dynamicControlHandlerService: DynamicControlHandlerService;

  @Input()
  dynamicFormControlOutlet: AbstractDynamicControl<any> | string;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private dynamicControlHandlerFactory: DynamicControlHandlerFactoryService,
    @Optional() private formGroup: FormGroupDirective
  ) {
    super();
  }

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (dynamicFormControlOutletProp in simpleChanges) {
      if (simpleChanges[dynamicFormControlOutletProp].currentValue) {
        if (isString(this.dynamicFormControlOutlet)) {
          this._control = <AbstractDynamicControl<any>>(
            this.formGroup.control.get(this.dynamicFormControlOutlet as string)
          );
        } else {
          this._control = this.dynamicFormControlOutlet as AbstractDynamicControl<any>;
        }

        this.viewContainerRef.clear();

        if (this._control instanceof AbstractDynamicControl) {
          const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.control.componentType);

          const componentRef: ComponentRef<ControlValueAccessor> = <ComponentRef<ControlValueAccessor>>(
            this.viewContainerRef.createComponent(
              componentFactory,
              undefined,
              Injector.create({
                providers: [{ provide: NgControl, useValue: this }],
                parent: this.injector
              })
            )
          );
          this.index = this.viewContainerRef.indexOf(componentRef.hostView);

          this.dynamicComponentRef = componentRef;

          this.dynamicControlHandlerService = this.dynamicControlHandlerFactory.create(this.control, componentRef);

          this.dynamicControlHandlerService.initialize();
        }
      } else {
        this.viewContainerRef.clear();
      }
    }
  }

  private init() {
    this.viewContainerRef.clear();

    if (this._control instanceof AbstractDynamicControl) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.control.componentType);

      const componentRef: ComponentRef<ControlValueAccessor> = <ComponentRef<ControlValueAccessor>>(
        this.viewContainerRef.createComponent(
          componentFactory,
          undefined,
          Injector.create({
            providers: [{ provide: NgControl, useValue: this }],
            parent: this.injector
          })
        )
      );

      this.dynamicControlHandlerService = this.dynamicControlHandlerFactory.create(this.control, componentRef);

      this.dynamicControlHandlerService.initialize();
    }
  }

  ngDoCheck() {
    if (this.dynamicComponentRef && this.dynamicComponentRef.componentType !== this.control.componentType) {
      this.init();
    }

    if (this.dynamicControlHandlerService) {
      this.dynamicControlHandlerService.doCheck();
    }

    if (this.isDisplayed !== this.control.isDisplayed) {
      if (this.control.isDisplayed && !this.dynamicComponentRef.hostView.destroyed) {
        this.viewContainerRef.insert(this.dynamicComponentRef.hostView);
      } else {
        this.viewContainerRef.detach(this.index);
      }

      this.isDisplayed = this.control.isDisplayed;
    }
  }

  ngOnDestroy() {}

  viewToModelUpdate(newValue: any): void {}
}
