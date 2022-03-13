import { TemplateModel } from '../../models';

export function isTemplateModel(v: any): boolean {
    return v instanceof TemplateModel;
}
