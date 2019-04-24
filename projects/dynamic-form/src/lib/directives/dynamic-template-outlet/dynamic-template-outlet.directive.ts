import { Directive, DoCheck, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';

import { TemplateModel } from '../../models';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicTemplateOutlet]'
})
export class DynamicTemplateOutletDirective implements OnChanges, DoCheck {
  private displayed = false;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @Input()
  dynamicTemplateOutlet: TemplateModel;

  ngOnChanges(simpleChanges: SimpleChanges) {
    if ('dynamicTemplateOutlet' in simpleChanges && simpleChanges.dynamicTemplateOutlet.currentValue) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.clear();
    }
  }

  ngDoCheck() {
    if (this.dynamicTemplateOutlet && this.displayed !== this.dynamicTemplateOutlet.displayed) {
      if (this.dynamicTemplateOutlet.displayed) {
        this.viewContainerRef.createEmbeddedView(this.dynamicTemplateOutlet.templateRef);
      }
    }
  }
}
