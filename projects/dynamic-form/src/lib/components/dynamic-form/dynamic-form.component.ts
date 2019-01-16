import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormModel } from '../../models/form-model';

@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  public formGroup: FormGroup;

  @Input()
  set formModel(v) {
    if (v instanceof FormModel) {
      if (v !== this._config) {
        this._config = v;
        this.formGroup = this._config.formGroup;
        this.buildMappedConfig();

        this.changeDetectorRef.detectChanges();
      }
    } else {
      throw Error('formModel value should inherit FormModel');
    }
  }

  _config: FormModel<any>;

  mappedConfig: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  buildMappedConfig() {
    this.mappedConfig = Object.keys(this._config.controls).map(key => ({
      name: key,
      config: this._config.controls[key]
    }));
  }
}
