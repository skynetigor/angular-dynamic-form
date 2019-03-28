import {
  Injector,
  ViewContainerRef,
  ViewRef,
  ComponentFactory,
  NgModuleRef,
  ComponentRef,
  TemplateRef,
  EmbeddedViewRef
} from '@angular/core';
import { InjectorMock } from './injector.mock';

export class ViewContainerRefMock extends ViewContainerRef {
  element;
  injector = new InjectorMock();
  parentInjector = new InjectorMock();
  length = 0;

  clear(): void {}

  remove(index?: number): void {}

  insert(viewRef: ViewRef, index?: number): ViewRef {
    return null;
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    return null;
  }

  indexOf(viewRef: ViewRef): number {
    return 0;
  }

  detach(index?: number): ViewRef | null {
    return null;
  }

  createComponent<C>(
    componentFactory: ComponentFactory<C>,
    index?: number,
    injector?: Injector,
    projectableNodes?: any[][],
    ngModule?: NgModuleRef<any>
  ): ComponentRef<C> {
    return null;
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C> {
    return null;
  }

  get(index: number): ViewRef | null {
    return null;
  }
}
