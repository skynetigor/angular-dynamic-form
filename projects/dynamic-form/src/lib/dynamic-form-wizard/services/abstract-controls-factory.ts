import { AbstractDynamicControl } from '../../dynamic-form/models';
import { ControlConfiguration } from '../../dynamic-form/types';
import { Config } from '../types';

export abstract class AbstractControlsFactory {
    abstract createControl(def: Config, currentConfig: ControlConfiguration<any, any, any>): AbstractDynamicControl<any>;
}
