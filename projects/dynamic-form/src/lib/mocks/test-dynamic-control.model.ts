import { AbstractDynamicControl } from '../models';
import { TestDynamicControlComponent } from './test-dynamic-control.component';
import { IControlConfiguration } from '../types';

export class TestDynamicControlModel<TInput> extends AbstractDynamicControl<TestDynamicControlComponent> {
  constructor(config: IControlConfiguration<TInput, any, any>) {
    super(config, TestDynamicControlComponent);
  }
}
