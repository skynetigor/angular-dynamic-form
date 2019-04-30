import { AbstractDynamicControl } from '../../models';
import { isDynamicControl } from './is-dynamic-control.function';

class TestControl extends AbstractDynamicControl<any> {
    constructor() {
        super({}, null);
    }
}

describe('isDynamicControl function', () => {
    it('should return true if AbstractDynamicControls instance is passed', () => {
        expect(isDynamicControl(new TestControl())).toBeTruthy();
    });

    it('should return false if any object is passed', () => {
        expect(isDynamicControl({})).toBeFalsy();
    });
});
