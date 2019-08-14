import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    DoCheck,
    forwardRef,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { isString } from 'util';

import { FormGroupComponent } from '../../components';
import { DynamicFormGroupInjectionToken } from '../../constants';
import { DynamicFormGroup } from '../../models';

const dynamicFormControlOutletProp = 'nestedDynamicFormGroupOutlet';

export const formControlBinding: any = {
    provide: NgControl,
    useExisting: forwardRef(() => NestedDynamicFormGroupOutletDirective)
};

/**
 * Directive that is rendering control and binds its inputs/outputs
 */
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[nestedDynamicFormGroupOutlet]', providers: [formControlBinding] })
export class NestedDynamicFormGroupOutletDirective implements OnChanges, OnDestroy, DoCheck {
    private _nestedDynamicFormGroupOutlet: DynamicFormGroup<any>;
    private displayed = false;
    private componentViewRefIndex: number;
    private componentRef: ComponentRef<any>;

    /**
     * A Dynamic control or a name of the dynamic control that exists in parent dynamic form group
     */
    @Input(dynamicFormControlOutletProp)
    nestedDynamicFormGroupOutlet: DynamicFormGroup<any> | string;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        @Optional() private formGroup: FormGroupDirective
    ) {}

    ngDoCheck(): void {
        this.changeDisplayingState();
    }

    ngOnDestroy(): void {
        if (this.componentRef && !this.componentRef.hostView.destroyed) {
            this.componentRef.destroy();
        }
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (dynamicFormControlOutletProp in simpleChanges) {
            if (simpleChanges[dynamicFormControlOutletProp].currentValue) {
                if (isString(this.nestedDynamicFormGroupOutlet)) {
                    this._nestedDynamicFormGroupOutlet = <DynamicFormGroup<any>>(
                        this.formGroup.control.get(this.nestedDynamicFormGroupOutlet as string)
                    );
                } else {
                    this._nestedDynamicFormGroupOutlet = this.nestedDynamicFormGroupOutlet as DynamicFormGroup<any>;
                }

                this.buildComponentInstance();
            } else {
                this.viewContainerRef.clear();
            }
        }
    }

    private buildComponentInstance() {
        this.viewContainerRef.clear();

        if (this.nestedDynamicFormGroupOutlet instanceof DynamicFormGroup) {
            if (!this.componentRef) {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormGroupComponent);

                this.componentRef = componentFactory.create(
                    Injector.create({
                        providers: [{ provide: DynamicFormGroupInjectionToken, useValue: this._nestedDynamicFormGroupOutlet }],
                        parent: this.injector
                    })
                );
            }
        }
    }

    private changeDisplayingState() {
        if (this.componentRef && this.displayed !== this._nestedDynamicFormGroupOutlet.displayed) {
            if (this._nestedDynamicFormGroupOutlet.displayed && !this.componentRef.hostView.destroyed) {
                this.viewContainerRef.insert(this.componentRef.hostView);
            } else {
                this.viewContainerRef.detach(this.componentViewRefIndex);
            }

            this.displayed = this._nestedDynamicFormGroupOutlet.displayed;
        }
    }
}
