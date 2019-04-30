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
    OnInit,
    Optional,
    SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { AbstractDynamicControl } from '../../models';
import { InputsHandlerService, OutputsHandlerService } from '../../services';
import { setupControl } from '../../utils';

const dynamicFormControlOutletProp = 'dynamicFormControlOutlet';

export const formControlBinding: any = {
    provide: NgControl,
    useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

/**
 * Directive that is rendering control and binds its inputs/outputs
 */
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[dynamicFormControlOutlet]', providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends NgControl implements OnChanges, OnDestroy, DoCheck {
    private dynamicControl: AbstractDynamicControl<any>;
    private displayed = false;
    private componentViewRefIndex: number;
    private componentRef: ComponentRef<any>;
    private inputsHandler: InputsHandlerService;
    private outputsHandler: OutputsHandlerService;

    /**
     * @inheritdoc
     */
    get control() {
        return this.dynamicControl;
    }

    /**
     * A Dynamic control or a name of the dynamic control that exists in parent dynamic form group
     */
    @Input()
    dynamicFormControlOutlet: AbstractDynamicControl<any> | string;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        @Optional() private formGroup: FormGroupDirective
    ) {
        super();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        if (dynamicFormControlOutletProp in simpleChanges) {
            if (simpleChanges[dynamicFormControlOutletProp].currentValue) {
                if (isString(this.dynamicFormControlOutlet)) {
                    this.dynamicControl = <AbstractDynamicControl<any>>this.formGroup.control.get(this.dynamicFormControlOutlet as string);
                } else {
                    this.dynamicControl = this.dynamicFormControlOutlet as AbstractDynamicControl<any>;
                }

                this.buildComponentInstance();
            } else {
                this.viewContainerRef.clear();
            }
        }
    }

    private buildComponentInstance() {
        this.viewContainerRef.clear();

        if (this.control instanceof AbstractDynamicControl) {
            if (!this.componentRef) {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.control.componentType);

                this.componentRef = componentFactory.create(
                    Injector.create({
                        providers: [{ provide: NgControl, useValue: this }],
                        parent: this.injector
                    })
                );

                this.inputsHandler = new InputsHandlerService(componentFactory);
                this.outputsHandler = new OutputsHandlerService(componentFactory);
                this.setupControl();
            }
        }
    }

    private setupControl() {
        if (isString(this.control.name) && !this.componentRef.location.nativeElement.id) {
            this.componentRef.location.nativeElement.id = this.control.name;
        }

        const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
        this.componentRef.location.nativeElement.attributes.setNamedItem(dynamicControlAttr);

        setupControl(this.control, this.componentRef.instance);
    }

    private changeDisplayingState() {
        if (this.componentRef && this.displayed !== this.control.displayed) {
            if (this.control.displayed && !this.componentRef.hostView.destroyed) {
                this.viewContainerRef.insert(this.componentRef.hostView);
            } else {
                this.viewContainerRef.detach(this.componentViewRefIndex);
            }

            this.displayed = this.control.displayed;
        }
    }

    ngDoCheck() {
        if (this.componentRef && this.componentRef.componentType !== this.control.componentType) {
            this.buildComponentInstance();
        }

        if (this.control instanceof AbstractDynamicControl) {
            this.inputsHandler.handle(this.control.inputs, this.componentRef.instance);
            this.outputsHandler.handle(this.control.outputs, this.componentRef.instance);
        }

        this.changeDisplayingState();
    }

    ngOnDestroy() {
        if (this.componentRef && !this.componentRef.hostView.destroyed) {
            this.componentRef.destroy();
        }
    }

    viewToModelUpdate(newValue: any): void {}
}
