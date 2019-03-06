import { BaseControlModel, TemplateModel } from '../models/controls';

export function isControl(v: any) {
  return v instanceof BaseControlModel;
}
export function isTemplate(v: any) {
  return v instanceof TemplateModel;
}
