import { AbstractDynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';
import { TextfieldComponent } from '../components';

export class TextfieldControl extends AbstractDynamicControl<TextfieldComponent> {
    constructor(config: ControlConfiguration<any, any, string>) {
        super(config, TextfieldComponent);
    }
}
