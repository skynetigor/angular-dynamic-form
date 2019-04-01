import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, KeyValueDiffers } from '@angular/core';

import { AbstractDynamicControl } from '../../models';
import { DynamicControlHandlerService } from '../dynamic-control-handler/dynamic-control-handler.service';

@Injectable()
export class DynamicControlHandlerFactoryService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  create(control: AbstractDynamicControl<any>, dynamicComponentRef: ComponentRef<any>): DynamicControlHandlerService {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(control.componentType);

    return new DynamicControlHandlerService(componentFactory, dynamicComponentRef, control);
  }
}
