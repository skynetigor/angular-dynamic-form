import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-template-wrapper',
  templateUrl: './template-wrapper.component.html',
  styleUrls: ['./template-wrapper.component.scss']
})
export class TemplateWrapperComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @ViewChild('host', { read: ViewContainerRef })
  set prop(v) {
    this.viewContainerRef = v;
  }

  @Input()
  template;

  private viewContainerRef: ViewContainerRef;

  constructor() {}

  get displayTemplate() {
    return this.template.isDisplayed === null || this.template.isDisplayed === undefined || this.template.isDisplayed;
  }

  ngOnInit() {
    const resolveTemplateSubscription = this.template.templateRefChanged$.subscribe(this.resolveTemplate.bind(this));
    this.subscriptions.push(resolveTemplateSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private resolveTemplate(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(templateRef, this.template.context);
    }
  }
}
