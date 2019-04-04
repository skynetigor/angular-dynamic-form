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
import { FormGroupDirective, NgControl } from '@angular/forms';
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
  private dynamicControl: AbstractDynamicControl<any>;
  private displayed = false;
  private componentViewRefIndex: number;
  private componentRef: ComponentRef<any>;

  get control() {
    return this.dynamicControl;
  }

  private dynamicControlHandlerService: DynamicControlHandlerService;

  @Input()
  dynamicFormControlOutlet: AbstractDynamicControl<any> | string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
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
          this.dynamicControl = <AbstractDynamicControl<any>>(
            this.formGroup.control.get(this.dynamicFormControlOutlet as string)
          );
        } else {
          this.dynamicControl = this.dynamicFormControlOutlet as AbstractDynamicControl<any>;
        }

        this.viewContainerRef.clear();

        this.buildComponentInstance();
      } else {
        this.viewContainerRef.clear();
      }
    }
  }

  private buildComponentInstance() {
    if (this.dynamicFormControlOutlet instanceof AbstractDynamicControl) {
      if (!this.componentRef) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.control.componentType);

        this.componentRef = componentFactory.create(
          Injector.create({
            providers: [{ provide: NgControl, useValue: this }],
            parent: this.injector
          })
        );
      }

      this.dynamicControlHandlerService = this.dynamicControlHandlerFactory.create(this.control, this.componentRef);
    }
  }

  private changeDisplayingState() {
    if (this.displayed !== this.control.displayed) {
      if (this.control.displayed && !this.componentRef.hostView.destroyed) {
        this.viewContainerRef.insert(this.componentRef.hostView);
      } else {
        this.viewContainerRef.detach(this.componentViewRefIndex);
      }

      this.displayed = this.control.displayed;
    }
  }

  ngDoCheck() {
    if (this.componentRef && this.componentRef.componentType !== this.control.componentType) {
      this.buildComponentInstance();
    }

    if (this.dynamicControlHandlerService) {
      this.dynamicControlHandlerService.doCheck();
    }

    this.changeDisplayingState();
  }

  ngOnDestroy() {
    if (!this.componentRef.hostView.destroyed) {
      this.componentRef.destroy();
    }
  }

  viewToModelUpdate(newValue: any): void {}
}
