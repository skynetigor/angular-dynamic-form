import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { DynamicControlHandlerService } from '../dynamic-control-handler/dynamic-control-handler.service';
import { IDynamicComponentRef } from '../../types';
import { AbstractDynamicControl } from '../../models';

@Injectable()
export class DynamicControlHandlerFactoryService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {}

  create(
    control: AbstractDynamicControl<any>,
    dynamicComponentRef: IDynamicComponentRef
  ): DynamicControlHandlerService {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(control.componentType);

    return new DynamicControlHandlerService(componentFactory, dynamicComponentRef, control);
  }
}
