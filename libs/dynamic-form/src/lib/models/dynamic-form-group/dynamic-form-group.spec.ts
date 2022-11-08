import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DynamicControl } from '../controls';
import { DynamicFormGroup } from './dynamic-form-group';

@Component({})
class FakeComponent implements ControlValueAccessor {
    writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }
}

fdescribe('DynamicFormGroup', () => {
  let underTest: DynamicFormGroup<any>;

  describe('when DynamicFormGroup is instantiated', () => {
    beforeEach(() => {
        underTest = new DynamicFormGroup({});
    });

    [{ functionName: 'addControl', itemName: 'control', itemCreationCallback: (controlName: string) => {
        const control = new DynamicControl({ }, FakeComponent);
        underTest.addControl(controlName, control);
        return control;
    } },
    { functionName: 'addControl', itemName: 'control', itemCreationCallback: (controlName: string) => {
        const control = new DynamicFormGroup({ });
        underTest.addFormGroup(controlName, control);
        return control;
    } }
    ].forEach((testCase) => {
        describe(testCase.functionName, () => {
            const fakeName = 'fakeName';

            it(`should add ${testCase.itemName} to controls property`, () => {
                // Arrange
                // Act
                const item = testCase.itemCreationCallback(fakeName);

                // Assert
                expect(underTest.controls[fakeName]).toBe(item as any);
            });

            it(`should add ${testCase.itemName} to items property`, () => {
                // Arrange
                // Act
                const item = testCase.itemCreationCallback(fakeName);

                // Assert
                expect(underTest.items[fakeName]).toBe(item);
            });

            it(`should assign name property of ${testCase.itemName}`, () => {
                // Arrange
                // Act
                const item = testCase.itemCreationCallback(fakeName);

                // Assert
                expect(item.name).toBe(fakeName);
            });

            describe('get()', () => {
                it(`should return ${testCase.itemName}`, () => {
                    // Arrange
                    // Act
                    const item = testCase.itemCreationCallback(fakeName);

                    // Assert
                    expect(underTest.get(fakeName)).toBe(item as any);
                });
            });
        });
    });
  });
});
