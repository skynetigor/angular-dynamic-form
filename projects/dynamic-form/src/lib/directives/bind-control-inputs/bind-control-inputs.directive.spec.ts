import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestDynamicControlComponent } from '../../mocks';
import { BindControlInputsDirective } from './bind-control-inputs.directive';

@Component({
    selector: 'lib-test-component',
    template: `
        <form [formGroup]="formGroup">
            <lib-test-control-component formControlName="firstControl" [bindControlInputs]="controlInputs.firstControl">
            </lib-test-control-component>
        </form>
    `
})
class TestComponent {
    formGroup: FormGroup;
    controlInputs = {
        firstControl: {}
    };

    constructor(formBuilder: FormBuilder) {
        this.formGroup = formBuilder.group({
            firstControl: null
        });
    }
}

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [BindControlInputsDirective, TestDynamicControlComponent, TestComponent],
    entryComponents: [TestDynamicControlComponent]
})
export class TestModule {}

describe('BindControlInputsDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should synchronize inputs of the control with inputs provided to it', async () => {
        fixture.detectChanges();

        // Arrange
        const componentFactoryResolver: ComponentFactoryResolver = fixture.debugElement.injector.get(ComponentFactoryResolver);
        const componentFactory = componentFactoryResolver.resolveComponentFactory(TestDynamicControlComponent);
        const controlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent)).componentInstance;

        componentFactory.inputs.forEach((prop, index) => {
            component.controlInputs.firstControl[prop.propName] = `someStringToSync${index}`;
        });

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        componentFactory.inputs.forEach(prop => {
            expect(controlComponent[prop.propName]).toBe(component.controlInputs.firstControl[prop.propName]);
        });
    });
});
