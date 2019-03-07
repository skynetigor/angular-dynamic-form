import { Directive, forwardRef, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TemplateModel } from '../../models';

export const formControlBinding: any = {
  provide: NgControl,
  useExisting: forwardRef(() => DynamicTemplateOutletDirective)
};

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicTemplateOutlet]', providers: [formControlBinding] })
export class DynamicTemplateOutletDirective implements OnChanges, OnDestroy {
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
