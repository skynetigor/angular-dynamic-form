import { DynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';
import { TextfieldComponent } from '../components';

export class TextfieldControl extends DynamicControl<TextfieldComponent> {
    constructor(config: ControlConfiguration<any, any, string>) {
        super(config, TextfieldComponent);
    }
}
