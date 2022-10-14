import { ControlValueAccessor, FormControl } from '@angular/forms';
import { setupControl } from './setup-control.function';

describe('setupControl', () => {
    function createValueAccessor(): ControlValueAccessor {
        return {
            writeValue: jasmine.createSpy('writeValue'),
            registerOnChange: jasmine.createSpy('registerOnChange'),
            registerOnTouched: jasmine.createSpy('registerOnTouched'),
            setDisabledState: jasmine.createSpy('setDisabledState')
        };
    }

    let fakeValueAccessor: ControlValueAccessor;
    let fakeRegisterOnChangeCallback: (v) => void;

    beforeEach(() => {
        fakeValueAccessor = createValueAccessor();
        fakeValueAccessor.registerOnChange = (fakeValueAccessor.registerOnChange as jasmine.Spy).and.callFake(callback => {
            fakeRegisterOnChangeCallback = callback;
        });
    });

    it('should bind form control to value changes of value accessor and bind value accessor on value changes of form control', () => {
        const control = new FormControl('kjkj');
        // eslint-disable-next-line @typescript-eslint/ban-types
        
        setupControl(control, fakeValueAccessor);

        expect(fakeValueAccessor.writeValue).toHaveBeenCalledWith(control.value);

        control.setValue('198778');
        control.disable();

        expect(fakeValueAccessor.writeValue).toHaveBeenCalledWith('198778');

        fakeRegisterOnChangeCallback('1213232');
        expect(control.value).toBe('1213232');

        expect(fakeValueAccessor.setDisabledState).toHaveBeenCalledWith(true);
    });

    describe('registerOnChange is called', () => {
        it('should call setValue with value coming as argument to registerOnChagne', () => {
            // Arrange
            const fakeValue = '1213232';
            const control = new FormControl('kjkj');
            spyOn(control, 'setValue').and.callThrough();

            // Act
            setupControl(control, fakeValueAccessor);
            fakeRegisterOnChangeCallback(fakeValue);

            // Assert
            expect(control.setValue).toHaveBeenCalledWith(fakeValue, { emitModelToViewChange: false });
        });
    });
});
