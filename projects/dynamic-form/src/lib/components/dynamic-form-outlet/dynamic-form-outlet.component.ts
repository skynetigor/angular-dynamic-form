import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { FormModel } from '../../models';
import { isControl, isTemplate } from '../../utils/utils';

@Component({
  selector: 'lib-dynamic-form-outlet',
  templateUrl: './dynamic-form-outlet.component.html',
  styleUrls: ['./dynamic-form-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormOutletComponent implements OnChanges {
  @Input()
  formModel: FormModel<any>;

  constructor() {}

  ngOnChanges() {
    if (!isNullOrUndefined(this.formModel)) {
      if (!(this.formModel instanceof FormModel)) {
        throw Error('formModel value should inherit FormModel');
      }
    }
  }

  isControl(c) {
    return isControl(c);
  }

  isTemplate(t) {
    return isTemplate(t);
  }
}
