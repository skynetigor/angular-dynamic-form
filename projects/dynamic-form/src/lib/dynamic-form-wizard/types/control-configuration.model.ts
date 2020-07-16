import { Config } from './config.model';

export interface ControlDefinition {
    controlName: string;
    inputs: Config[];
}
