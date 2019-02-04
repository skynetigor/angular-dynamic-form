import { BaseControlModel, TemplateModel } from '../models';
import { ComponentRef } from '@angular/core';

export declare type ControlOrTemplate = BaseControlModel<any> | TemplateModel<any>;

export declare interface ComponentMetadata<TComponent> {
  config: any;
  componentRef: ComponentRef<TComponent>;
}
