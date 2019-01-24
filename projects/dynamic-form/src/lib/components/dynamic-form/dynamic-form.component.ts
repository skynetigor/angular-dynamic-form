import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlModel, FormModel, TemplateModel } from '../../models';
import { isControl, isTemplate } from '../../utils/utils';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  encapsulation: ViewEncapsulation.None
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges {
  public formGroup: FormGroup;
  private tmplBetweenAllSub: Subscription;

  @Input()
  formModel: FormModel<any>;

  mappedConfig: (BaseControlModel<any> | TemplateModel<any>)[];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.formModel) {
      if (this.formModel instanceof FormModel) {
        this.formGroup = this.formModel.formGroup;
        this.mappedConfig = this.buildMappedConfig();

        if (this.tmplBetweenAllSub) {
          this.tmplBetweenAllSub.unsubscribe();
        }

        this.formModel.tmplBetweenAllChanged$.subscribe(tmpl => this.tmplBetweenAll(tmpl));
      } else {
        throw Error('formModel value should inherit FormModel');
      }
    }
  }

  tmplBetweenAll(tmpl: TemplateModel<any>) {
    if (tmpl) {
      if (!(tmpl instanceof TemplateModel)) {
        tmpl = new TemplateModel<any>(null, tmpl);
      }
      const temp = [];
      const configLength = this.mappedConfig.length;
      this.mappedConfig.forEach((el, index) => {
        temp.push(el);
        if (index < configLength) {
          temp.push(tmpl);
        }
      });

      this.mappedConfig = temp;
    } else {
      this.mappedConfig = this.buildMappedConfig();
    }

    this.cd.detectChanges();
  }

  buildMappedConfig() {
    return <any>Object.values(this.formModel.controls).filter(value => isControl(value) || isTemplate(value));
  }

  isControl(c) {
    return isControl(c);
  }

  isTemplate(t) {
    console.log(isTemplate(t));
    return isTemplate(t);
  }
}
