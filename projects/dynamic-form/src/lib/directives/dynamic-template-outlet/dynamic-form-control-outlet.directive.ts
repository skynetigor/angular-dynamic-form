import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  forwardRef,
  Input,
  OnChanges,
  ViewContainerRef,
  OnDestroy,
  Injector,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlModel, TemplateModel } from '../../models';
import { IDynamicComponentRef } from '../../types';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DdynamicTemplateOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicTemplateOutlet]', providers: [formControlBinding] })
export class DdynamicTemplateOutletDirective implements OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];

  get control() {
    return this.dynamicTemplateOutlet;
  }

  @Input()
  dynamicTemplateOutlet: TemplateModel;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnChanges() {
    if (!(this.dynamicTemplateOutlet instanceof TemplateModel)) {
      throw new Error('dynamicFormControl should be an inheritor of BaseControlModel');
    }

    const subscription = this.dynamicTemplateOutlet.templateRefChanged$.subscribe((template: TemplateRef<any>) => {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(template, this.dynamicTemplateOutlet.context);
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
