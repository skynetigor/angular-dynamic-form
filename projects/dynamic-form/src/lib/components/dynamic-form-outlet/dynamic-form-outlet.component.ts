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
import { isControl, isTemplate } from '../../utils';

@Component({
  selector: 'lib-dynamic-form-outlet',
  templateUrl: './dynamic-form-outlet.component.html'
})
export class DynamicFormOutletComponent implements OnChanges, DoCheck {
  @ViewChild('defaultControlWrapper') private defaultControlWrapper: TemplateRef<any>;
  @ViewChild('defaultTemplateWrapper') private defaultTemplateWrapper: TemplateRef<any>;

  private _differ = this.differs.find({}).create();

  @Input()
  formModel: DynamicFormGroup<any>;
  @Input()
  controlWrapper: TemplateRef<any>;

  formBody = [];

  constructor(private differs: KeyValueDiffers) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('controlWrapper' in changes) {
      this.buildFormBody();
    }
  }

  private buildFormBody() {
    const parsed = [];

    Object.values(this.formModel.items).forEach(t => {
      if (isControl(t)) {
        const template = this.controlWrapper ? this.controlWrapper : this.defaultControlWrapper;
        parsed.push({ instance: t, template: template, context: { control: t } });
      } else if (isTemplate(t)) {
        parsed.push({ instance: t, template: this.defaultTemplateWrapper, context: { templateModel: t } });
      }
    });

    this.formBody = parsed;
  }

  trackByFn(_, obj) {
    return obj.template;
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
}
