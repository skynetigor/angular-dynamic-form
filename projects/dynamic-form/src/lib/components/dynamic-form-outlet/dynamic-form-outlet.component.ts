import {
  Component,
  DoCheck,
  Input,
  KeyValueDiffers,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { DynamicFormGroup } from '../../models';
import { isDynamicControl, isTemplateModel } from '../../utils';

/**
 * A component for rendering form based on @class DynamicFormGroup
 */
@Component({
  selector: 'lib-dynamic-form-outlet',
  templateUrl: './dynamic-form-outlet.component.html'
})
export class DynamicFormOutletComponent implements OnChanges, DoCheck {
  @ViewChild('defaultControlWrapper') private defaultControlWrapper: TemplateRef<any>;
  @ViewChild('defaultTemplateWrapper') private defaultTemplateWrapper: TemplateRef<any>;

  private _differ = this.differs.find({}).create();

  /**
   * A form model that is rendered @instance DynamicFormGroup
   */
  @Input()
  formModel: DynamicFormGroup<any>;

  /**
   * A template that wraps each control
   */
  @Input()
  controlWrapper: TemplateRef<any>;

  /**
   * Form body that is built based on FormModel
   */
  formBody = [];

  constructor(private differs: KeyValueDiffers) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('controlWrapper' in changes) {
      this.buildFormBody();
    }
  }

  trackByFn(_, obj) {
    return obj.instance;
  }

  ngDoCheck() {
    if (this.formModel instanceof DynamicFormGroup) {
      const diff = this._differ.diff(this.formModel.items);

      if (diff) {
        this.buildFormBody();
      }
    } else {
      this.formBody = [];
    }
  }

  private buildFormBody() {
    const parsed = [];

    Object.values(this.formModel.items).forEach(t => {
      if (isDynamicControl(t)) {
        const template = this.controlWrapper ? this.controlWrapper : this.defaultControlWrapper;
        parsed.push({ instance: t, template: template, context: { control: t } });
      } else if (isTemplateModel(t)) {
        parsed.push({ instance: t, template: this.defaultTemplateWrapper, context: { templateModel: t } });
      }
    });

    this.formBody = parsed;
  }
}
