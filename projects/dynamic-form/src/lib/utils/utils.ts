import { AbstractDynamicControl, TemplateModel } from '../models/controls';

export function isControl(v: any) {
  return v instanceof AbstractDynamicControl;
}
export function isTemplate(v: any) {
  return v instanceof TemplateModel;
}
