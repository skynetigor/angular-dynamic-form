import { ControlValueAccessor, FormControl } from '@angular/forms';
import { setupControl } from './setup-control.function';

describe('setupControl', () => {
    it('should bind form control to value changes of value accessor and bind value accessor on value changes of form control', () => {
        const control = new FormControl('kjkj');
        // eslint-disable-next-line @typescript-eslint/ban-types
        let registerOnChangeCallback: Function;

        const valueAccessor: ControlValueAccessor = {
            writeValue: jasmine.createSpy('writeValue'),
            registerOnChange: jasmine.createSpy('registerOnChange').and.callFake(callback => {
                registerOnChangeCallback = callback;
            }),
            registerOnTouched: jasmine.createSpy('registerOnTouched'),
            setDisabledState: jasmine.createSpy('setDisabledState')
        };

        setupControl(control, valueAccessor);

        expect(valueAccessor.writeValue).toHaveBeenCalledWith(control.value);

        control.setValue('198778');
        control.disable();

        expect(valueAccessor.writeValue).toHaveBeenCalledWith('198778');

        registerOnChangeCallback('1213232');
        expect(control.value).toBe('1213232');

        expect(valueAccessor.setDisabledState).toHaveBeenCalledWith(true);
    });
});
