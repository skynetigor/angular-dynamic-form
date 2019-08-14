import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDynamicControlModel } from '../../mocks';
import { DynamicFormGroup } from '../../models';
import { FormGroupComponent } from './form-group.component';
import { DynamicFormGroupInjectionToken } from '../../constants';

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
            declarations: [FormGroupComponent]
        });

        fixture = TestBed.createComponent(FormGroupComponent);
        component = fixture.componentInstance;
    });

    it('should be able to create component instance', () => {
        expect(component).toBeDefined();
    });
});
