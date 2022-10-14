import { DynamicControl } from '../../models';
import { isDynamicControl } from './is-dynamic-control.function';

class TestControl extends DynamicControl<any> {
    constructor() {
        super({}, null);
    }
}

describe('isDynamicControl function', () => {
    it('should return true if DynamicControls instance is passed', () => {
        expect(isDynamicControl(new TestControl())).toBeTruthy();
    });

    it('should return false if any object is passed', () => {
        expect(isDynamicControl({})).toBeFalsy();
    });
});
