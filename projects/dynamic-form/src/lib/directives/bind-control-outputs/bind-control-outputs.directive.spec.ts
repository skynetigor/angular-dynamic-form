import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

import { TestDynamicControlComponent } from '../../mocks';
import { BindControlOutputsDirective } from './bind-control-outputs.directive';

@Component({
    selector: 'lib-test-component',
    template: `
        <form [formGroup]="formGroup">
            <lib-test-control-component formControlName="firstControl" [bindControlOutputs]="controlOutputs.firstControl">
            </lib-test-control-component>
        </form>
    `
})
class TestComponent {
    formGroup: FormGroup;
    controlOutputs = {
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
    declarations: [BindControlOutputsDirective, TestDynamicControlComponent, TestComponent],
    entryComponents: [TestDynamicControlComponent]
})
export class TestModule {}

describe('BindControlOutputsDirective', () => {
    configureTestSuite();

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeAll(async () => {
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

    it('should bind function to outputs of the control', async () => {
        fixture.detectChanges();

        // Arrange
        const componentFactoryResolver: ComponentFactoryResolver = fixture.debugElement.injector.get(ComponentFactoryResolver);
        const componentFactory = componentFactoryResolver.resolveComponentFactory(TestDynamicControlComponent);
        const controlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent)).componentInstance;

        componentFactory.outputs.forEach(prop => {
            component.controlOutputs.firstControl[prop.propName] = jasmine.createSpy(prop.propName);
        });

        // Act
        fixture.detectChanges();
        await fixture.whenStable();

        componentFactory.outputs.forEach((prop, index) => {
            controlComponent[prop.propName].emit(index);
        });

        await fixture.whenStable();

        // Assert
        componentFactory.outputs.forEach((prop, index) => {
            expect(component.controlOutputs.firstControl[prop.propName]).toHaveBeenCalledWith(index);
        });
    });
});
