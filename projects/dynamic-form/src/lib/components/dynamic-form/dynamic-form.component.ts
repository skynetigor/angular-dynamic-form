import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import { BaseControlModel, FormModel, TemplateModel } from '../../models';
import { isControl, isTemplate } from '../../utils/utils';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  private subscriptions: Subscription[] = [];
  private __formModel: FormModel<any>;

  public formGroup: FormGroup;
  private tmplBetweenAllSub: Subscription;

  @Input()
  formModel: FormModel<any>;

  renderingFormConfig: (BaseControlModel<any> | TemplateModel<any>)[];

  get formConfig() {
    return this.renderingFormConfig;
  }

  set formConfig(v) {
    this.renderingFormConfig = v;
    this.cd.detectChanges();
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.formModel !== this.__formModel) {
      this.unsubscribeFromAllSubscriptions();
      this.__formModel = this.formModel;

      if (!isNullOrUndefined(this.formModel)) {
        if (this.formModel instanceof FormModel) {
          this.formGroup = this.formModel.formGroup;
          this.buildMappedConfig();

          if (this.tmplBetweenAllSub) {
            this.tmplBetweenAllSub.unsubscribe();
          }

          this.subscriptions.push(this.formModel.tmplBetweenAllChanged$.subscribe(tmpl => this.tmplBetweenAll(tmpl)));
          this.subscriptions.push(this.formModel.controlsStateChanged$.subscribe(() => this.buildMappedConfig()));
        } else {
          throw Error('formModel value should inherit FormModel');
        }
      }
    }
  }

  tmplBetweenAll(tmpl: TemplateRef<any> | TemplateModel<any>) {
    if (tmpl) {
      if (!(tmpl instanceof TemplateModel)) {
        tmpl = new TemplateModel<any>(null, tmpl);
      }
      const temp = [];
      const configLength = this.formConfig.length;
      this.formConfig.forEach((el, index) => {
        temp.push(el);
        if (index < configLength) {
          temp.push(tmpl);
        }
      });

      this.formConfig = temp;
    } else {
      this.buildMappedConfig();
    }
  }

  private unsubscribeFromAllSubscriptions() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy() {
    this.unsubscribeFromAllSubscriptions();
  }

  buildMappedConfig() {
    this.formConfig = <any>(
      Object.values(this.formModel.controls).filter(value => isControl(value) || isTemplate(value))
    );
  }

  isControl(c) {
    return isControl(c);
  }

  isTemplate(t) {
    return isTemplate(t);
  }
}
