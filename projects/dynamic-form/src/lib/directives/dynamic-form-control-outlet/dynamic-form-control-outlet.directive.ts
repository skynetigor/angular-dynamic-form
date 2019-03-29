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
  SimpleChanges,
  ViewContainerRef,
  Optional
} from '@angular/core';
import { ControlValueAccessor, NgControl, FormGroupDirective } from '@angular/forms';

import { AbstractDynamicControl } from '../../models';
import { DynamicControlHandlerFactoryService, DynamicControlHandlerService } from '../../services';
import { IDynamicComponentRef } from '../../types';
import { isString } from 'util';

const dynamicFormControlOutletProp = 'dynamicFormControlOutlet';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlOutlet]', providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends NgControl implements OnChanges, OnDestroy, OnInit, DoCheck {
  private _control: AbstractDynamicControl<any>;

  private dynamicComponentRef: IDynamicComponentRef;

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

          const dynamicComponentRef: IDynamicComponentRef = {
            instance: componentRef.instance,
            injector: componentRef.injector,
            location: componentRef.location,
            componentType: componentRef.componentType,
            changeDetectorRef: componentRef.changeDetectorRef
          };

          this.dynamicComponentRef = dynamicComponentRef;

          this.dynamicControlHandlerService = this.dynamicControlHandlerFactory.create(
            this.control,
            dynamicComponentRef
          );

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

      const dynamicComponentRef: IDynamicComponentRef = {
        instance: componentRef.instance,
        injector: componentRef.injector,
        location: componentRef.location,
        componentType: componentRef.componentType,
        changeDetectorRef: componentRef.changeDetectorRef
      };

      this.dynamicComponentRef = dynamicComponentRef;

      this.dynamicControlHandlerService = this.dynamicControlHandlerFactory.create(this.control, dynamicComponentRef);

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
  }

  ngOnDestroy() {}

  viewToModelUpdate(newValue: any): void {}
}
