import { AbstractDynamicControl } from '../../../dynamic-form/models';
import { ControlConfiguration } from '../../../dynamic-form/types';
import { Config } from '../../types';

export abstract class AbstractControlProvider {
    abstract create(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any>;
}
