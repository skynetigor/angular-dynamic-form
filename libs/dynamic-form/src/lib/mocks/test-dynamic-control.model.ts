import { DynamicControl } from '../models';
import { ControlConfiguration } from '../types';
import { TestDynamicControlComponent } from './test-dynamic-control.component';

export class TestDynamicControlModel<TInput> extends DynamicControl<TestDynamicControlComponent> {
    constructor(config: ControlConfiguration<TInput, any, any>) {
        super(config, TestDynamicControlComponent);
    }
}
