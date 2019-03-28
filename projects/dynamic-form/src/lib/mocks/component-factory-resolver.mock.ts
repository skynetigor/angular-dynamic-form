import { ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';

export class ComponentFactoryResolverMock extends ComponentFactoryResolver {
  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
    return null;
  }
}
