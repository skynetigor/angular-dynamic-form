import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, NgModule, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TestDynamicControlComponent, TestDynamicControlModel } from '../../mocks';
import { DynamicFormGroup } from '../../models';
import { DynamicFormControlOutletDirective } from './dynamic-form-control-outlet.directive';
import { configureTestSuite } from 'ng-bullet';

@Component({
    selector: 'app-test-component',
    template: `
        <form [formGroup]="formGroup">
            <ng-container *dynamicFormControlOutlet="formGroup.items.firstControl"></ng-container>
            <ng-container *dynamicFormControlOutlet="'secondControl'"></ng-container>
        </form>
    `
})
class TestComponent {
    formGroup = new DynamicFormGroup({
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

    callBackOfFirstOutput(): void {}

    callBackOfSecondOutput(): void {}
}

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [DynamicFormControlOutletDirective, TestDynamicControlComponent, TestComponent],
    entryComponents: [TestDynamicControlComponent]
})
export class TestModule {}

describe('DynamicFormControlOutletDirective', () => {
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

    it('should render controls components', () => {
        // Arrange
        const items = Object.values(component.formGroup.items);

        // Act
        fixture.detectChanges();

        const controlsComponentsDebugElements = fixture.debugElement.queryAll(By.directive(TestDynamicControlComponent));

        // Assert
        expect(items.length).toBe(controlsComponentsDebugElements.length);

        controlsComponentsDebugElements.forEach((c, index) => {
            expect(c.componentInstance instanceof items[index].componentType).toBeTruthy();
        });
    });

    it('should register control component on value changes of form control', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;
        const writeValueSpy = spyOn(controlComponentInstance, 'writeValue');
        const someValueToSet = {};

        // Act
        component.formGroup.items.firstControl.setValue(someValueToSet);
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(writeValueSpy).toHaveBeenCalledWith(someValueToSet);
    });

    it('should register control component on disabled state changes of the form control', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;
        const setDisabledStateSpy = spyOn(controlComponentInstance, 'setDisabledState');

        // Act
        component.formGroup.items.firstControl.disable();
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(setDisabledStateSpy).toHaveBeenCalledWith(true);

        // Act
        component.formGroup.items.firstControl.enable();
        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(setDisabledStateSpy).toHaveBeenCalledWith(false);
    });

    it('should register form control on value changes from control component', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;

        const someValueToSet = {};

        // Act

        controlComponentInstance.propagateChange(someValueToSet);

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(component.formGroup.items.firstControl.value).toBe(someValueToSet);
    });

    it('should register itself as NgControl in the injector', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance = fixture.debugElement.query(By.directive(TestDynamicControlComponent));

        // Act

        const ngControl = controlComponentInstance.injector.get(NgControl);

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(ngControl instanceof NgControl).toBeTruthy();
    });

    it('should destroy component control if control is null or undefined', async () => {
        fixture.detectChanges();

        // Arrange
        let controlComponentInstances = fixture.debugElement.queryAll(By.directive(TestDynamicControlComponent));

        // Act

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        expect(controlComponentInstances.length).toBe(Object.values(component.formGroup.items).filter(t => t).length);

        // Arrange
        const dynamicFormControlOutletDirective: DynamicFormControlOutletDirective = controlComponentInstances[0].injector.get(
            DynamicFormControlOutletDirective
        );

        component.formGroup.items.firstControl = null;
        dynamicFormControlOutletDirective.dynamicFormControlOutlet = null;

        // Act

        fixture.detectChanges();
        await fixture.whenStable();

        controlComponentInstances = fixture.debugElement.queryAll(By.directive(TestDynamicControlComponent));

        // Assert
        expect(controlComponentInstances.length).toBe(Object.values(component.formGroup.items).filter(t => t).length);
    });

    it('should sync form controls inputs with component control', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;
        const componentFactoryResolverType: Type<any> = ComponentFactoryResolver as any;
        const factoryResolver: ComponentFactoryResolver = fixture.debugElement.injector.get(componentFactoryResolverType);
        const componentFactory = factoryResolver.resolveComponentFactory(component.formGroup.items.firstControl.componentType);

        // Act

        fixture.detectChanges();

        // Assert

        componentFactory.inputs.forEach(p => {
            expect(controlComponentInstance[p.propName]).toBe(component.formGroup.items.firstControl.inputs[p.propName]);
        });

        // Act
        componentFactory.inputs.forEach(p => {
            controlComponentInstance[p.propName] = {};
        });

        fixture.detectChanges();
        await fixture.whenStable();

        // Assert
        componentFactory.inputs.forEach(p => {
            expect(controlComponentInstance[p.propName]).toBe(component.formGroup.items.firstControl.inputs[p.propName]);
        });
    });

    it('should not set input if it is not defined in inputs property of form control', async () => {
        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;
        const valueToCheck = 'someValue';
        controlComponentInstance.firstInput = valueToCheck;

        delete component.formGroup.items.firstControl.inputs.firstInput;
        // Act

        fixture.detectChanges();

        // Assert
        expect(controlComponentInstance.firstInput).toBe(valueToCheck);
    });

    it('should call function that was declared in form control outputs', async () => {
        const someValueOfOutput = {};

        fixture.detectChanges();

        // Arrange
        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;
        const componentFactoryResolverType: Type<any> = ComponentFactoryResolver as any;
        const factoryResolver: ComponentFactoryResolver = fixture.debugElement.injector.get(componentFactoryResolverType);
        const componentFactory = factoryResolver.resolveComponentFactory(component.formGroup.items.firstControl.componentType);

        componentFactory.outputs.forEach(prop => {
            component.formGroup.items.firstControl.outputs[prop.propName] = jasmine.createSpy(prop.propName);
        });

        // Act

        fixture.detectChanges();

        // Assert

        componentFactory.outputs.forEach(prop => {
            controlComponentInstance[prop.propName].emit(someValueOfOutput);
            expect(component.formGroup.items.firstControl.outputs[prop.propName]).toHaveBeenCalledWith(someValueOfOutput);
        });
    });

    it('should not call function that was removed from form control outputs', async () => {
        // Arrange

        const firstOutputFuncCache = component.formGroup.items.firstControl.outputs.firstOutput;
        delete component.formGroup.items.firstControl.outputs.firstOutput;
        const someValueOfOutput = {};

        fixture.detectChanges();

        const controlComponentInstance: TestDynamicControlComponent = fixture.debugElement.query(By.directive(TestDynamicControlComponent))
            .componentInstance;

        // Act

        controlComponentInstance.firstOutput.emit(someValueOfOutput);
        // Assert

        expect(firstOutputFuncCache).not.toHaveBeenCalled();
    });
});
