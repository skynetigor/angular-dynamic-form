import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormGroupInjectionToken } from '../../constants';
import { DynamicFormControlOutletDirective, NestedDynamicFormGroupOutletDirective } from '../../directives';
import { TestDynamicControlModel } from '../../mocks';
import { DynamicFormGroup } from '../../models';
import { DynamicFormOutletComponent } from '../dynamic-form-outlet/dynamic-form-outlet.component';
import { FormGroupComponent } from './form-group.component';

const formGroup = new DynamicFormGroup({
    firstControl: new TestDynamicControlModel({
        initialInputs: {
            firstInput: 'firstInput',
            secondInput: 'secondInput'
        },
        outputs: {
            firstOutput: jasmine.createSpy('firstOutputSpy'),
            secondOutput: jasmine.createSpy('secondOutputSpy')
        }
    }),
    secondControl: new TestDynamicControlModel({
        initialInputs: {
            firstInput: 'firstInput',
            secondInput: 'secondInput'
        }
    })
});

describe('FormGroupComponent', () => {
    let fixture: ComponentFixture<FormGroupComponent>;
    let component: FormGroupComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{ provide: DynamicFormGroupInjectionToken, useValue: formGroup }],
            declarations: [
                FormGroupComponent,
                DynamicFormOutletComponent,
                DynamicFormControlOutletDirective,
                NestedDynamicFormGroupOutletDirective
            ]
        });

        fixture = TestBed.createComponent(FormGroupComponent);
        component = fixture.componentInstance;
    });

    it('should be able to create component instance', () => {
        expect(component).toBeDefined();
    });
});
