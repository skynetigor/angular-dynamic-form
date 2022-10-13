import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, NgModule, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

import { DynamicFormControlOutletDirective } from '../../directives';
import { TestDynamicControlComponent, TestDynamicControlModel } from '../../mocks';
import { DynamicFormGroup } from '../../models';
import { DynamicFormOutletComponent } from './dynamic-form-outlet.component';

@Component({
    selector: 'lib-test-component',
    template: `
        <dynamic-form-outlet
            [dynamicFormGroup]="formGroup"
            [controlWrappers]="useControlWrapper ? { firstControl: controlWrapper, secondControl: controlWrapper } : null"
        ></dynamic-form-outlet>

        <ng-template #controlWrapper let-control="control">
            <div id="{{ control.name }}Wrapper"><ng-container #some [dynamicFormControlOutlet]="control"></ng-container></div>
        </ng-template>
    `
})
class TestComponent {
    useControlWrapper = false;

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
}

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [DynamicFormOutletComponent, DynamicFormControlOutletDirective, TestDynamicControlComponent, TestComponent],
    entryComponents: [TestDynamicControlComponent]
})
export class TestModule {}

describe('DynamicFormOutlet', () => {
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

    describe('outlet native element', () => {
        it('should have display css property set to `none`', () => {
            // Arrange
            const componentUnderTestDebugElement = fixture.debugElement.query(By.directive(DynamicFormOutletComponent));
    
            // Act
            fixture.detectChanges();
    
            // Assert
            expect(componentUnderTestDebugElement.styles['display']).toEqual('none');
        });

        it('should have no elements', () => {
            // Arrange
            const componentUnderTestDebugElement = fixture.debugElement.query(By.directive(DynamicFormOutletComponent));
    
            // Act
            fixture.detectChanges();
    
            // Assert
            expect(componentUnderTestDebugElement.children.filter(d => d.nativeNode.type !== Node.COMMENT_NODE).length).toEqual(0);
        });
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

    it('should sync form control disabled state with control component', async () => {
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

    it('should sync form control inputs with controls component', async () => {
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

    it('should use template that wraps control if it is specified', () => {
        component.useControlWrapper = true;

        fixture.detectChanges();

        const componentUnderTestDebugElement = fixture.debugElement.query(By.directive(DynamicFormOutletComponent));
        const formDebugElement = fixture.debugElement.children.filter(debugElement => debugElement !== componentUnderTestDebugElement);

        const controlsObjects = Object.values(component.formGroup.controls);

        formDebugElement.forEach((div, index) => {
            expect(div.nativeElement.id).toBe(`${controlsObjects[index].name}Wrapper`);
            const controlDebugElement = div.query(By.directive(controlsObjects[index].componentType));
            expect(controlDebugElement.componentInstance instanceof controlsObjects[index].componentType).toBeTruthy();
        });

        expect(controlsObjects.length).toBe(formDebugElement.length);
    });
});
