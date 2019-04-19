import { isTemplateModel } from './is-template.function';
import { TemplateModel } from '../../models';

describe('isTemplate function', () => {
  it('should return true if TemplateModel instance is passed', () => {
    expect(isTemplateModel(new TemplateModel())).toBeTruthy();
  });

  it('should return true if any other object is passed', () => {
    expect(isTemplateModel({})).toBeFalsy();
  });
});
