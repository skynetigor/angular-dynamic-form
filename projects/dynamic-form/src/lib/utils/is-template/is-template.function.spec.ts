import { TemplateModel } from '../../models';
import { isTemplateModel } from './is-template.function';

describe('isTemplate function', () => {
    it('should return true if TemplateModel instance is passed', () => {
        expect(isTemplateModel(new TemplateModel())).toBeTruthy();
    });

    it('should return false if any other object is passed', () => {
        expect(isTemplateModel({})).toBeFalsy();
    });
});
