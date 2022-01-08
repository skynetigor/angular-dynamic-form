import { TemplateModel } from '../../models';

export function isTemplateModel(v: any) {
    return v instanceof TemplateModel;
}
