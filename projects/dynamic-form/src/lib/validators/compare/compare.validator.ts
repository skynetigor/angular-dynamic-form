import { AbstractControl } from '@angular/forms';

export function compareValidator(validatorCfg: { compareWith: string; comparisonProperties?: string[] }) {
    return (control: AbstractControl) => {
        if (control.parent) {
            const controlToCompareWith = control.parent.get(validatorCfg.compareWith);

            if (controlToCompareWith) {
                if (Array.isArray(validatorCfg.comparisonProperties)) {
                    for (let i = 0; i < validatorCfg.comparisonProperties.length; i++) {
                        const comparingProperty = validatorCfg.comparisonProperties[i];
                        const controlPropValue = control.value ? control.value[comparingProperty] : control.value;
                        const controlToCompareWithPropValue = controlToCompareWith.value
                            ? controlToCompareWith.value[comparingProperty]
                            : controlToCompareWith.value;
                        if (controlPropValue !== controlToCompareWithPropValue) {
                            return {
                                compare: {
                                    controlToCompareName: validatorCfg.compareWith,
                                    currentControlValue: control.value,
                                    controlToCompareValue: controlToCompareWith.value
                                }
                            };
                        }
                    }

                    return null;
                }

                if (control.value !== controlToCompareWith.value) {
                    return {
                        compare: {
                            controlToCompareName: validatorCfg.compareWith,
                            currentControlValue: control.value,
                            controlToCompareValue: controlToCompareWith.value
                        }
                    };
                }
            }
        }

        return null;
    };
}
