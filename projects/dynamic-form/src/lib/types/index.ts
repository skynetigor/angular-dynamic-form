import { BaseControlModel, TemplateModel } from '../models';
import { ComponentRef } from '@angular/core';

export declare type ControlOrTemplate = BaseControlModel<any> | TemplateModel<any>;

export declare interface ComponentMetadata<TComponent, TInput> {
  inputs: TInput;
  componentRef: ComponentRef<TComponent>;
}
