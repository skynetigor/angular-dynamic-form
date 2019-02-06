import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { dynamicTemplateHiddenAttrName, dynamicTemplateHostAttrName } from '../../constants';
import { TemplateModel } from '../../models';

@Component({
  selector: 'lib-template-wrapper',
  templateUrl: './template-wrapper.component.html',
  styleUrls: ['./template-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateWrapperComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions: Subscription[] = [];
  private hostNativeElement: HTMLElement;

  @ViewChild('host', { read: ViewContainerRef })
  private viewContainerRef: ViewContainerRef;

  @Input()
  template: TemplateModel;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.hostNativeElement = elementRef.nativeElement;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe();
  }

  ngOnChanges() {
    this.unsubscribe();
    const resolveTemplateSubscription = this.template.templateRefChanged$.subscribe(this.resolveTemplate.bind(this));

    const hideTemplateSubscription = this.template.hide$.subscribe(v => {
      if (v) {
        this.hostNativeElement.attributes.removeNamedItem(dynamicTemplateHostAttrName);
      } else {
        const attr = document.createAttribute(dynamicTemplateHiddenAttrName);
        this.hostNativeElement.attributes.setNamedItem(attr);
      }
    });

    const dynamicTemplateAttr = document.createAttribute(dynamicTemplateHostAttrName);
    this.hostNativeElement.attributes.setNamedItem(dynamicTemplateAttr);

    this.hostNativeElement.classList.add(this.template.name);

    this.subscriptions.push(resolveTemplateSubscription, hideTemplateSubscription);
  }

  private unsubscribe() {
    this.subscriptions.forEach(t => t.unsubscribe());
  }

  private resolveTemplate(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(templateRef, this.template.context);
    }
  }
}
