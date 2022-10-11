import { AbstractDynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';
import { TestDynamicControlComponent } from './test-dynamic-control.component';

export class TestDynamicControlModel<TInput> extends AbstractDynamicControl<TestDynamicControlComponent> {
    constructor(config: ControlConfiguration<TInput, any, any>) {
        super(config, TestDynamicControlComponent);
    }
}
