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

import { dynamicControlAttrName } from '../../constants';
import { AbstractDynamicControl } from '../../models';
import { InputsHandlerService, OutputsHandlerService } from '../../services';
import { setupControl, isString } from '../../utils';

export const formControlBinding: any = {
    provide: NgControl,
    useExisting: forwardRef(() => DynamicFormControlOutletDirective)
};

/**
 * Directive that is rendering control and binds its inputs/outputs
 */
@Directive({ selector: `[dynamicFormControlOutlet]`, providers: [formControlBinding] })
export class DynamicFormControlOutletDirective extends NgControl implements OnChanges, OnDestroy, DoCheck {
    private dynamicControl: AbstractDynamicControl<any>;
    private displayed = false;
    private componentViewRefIndex: number;
    private componentRef: ComponentRef<any>;
    private inputsHandler: InputsHandlerService;
    private outputsHandler: OutputsHandlerService;
    private isControlSetup: boolean;

    /**
     * @inheritdoc
     */
    get control(): AbstractDynamicControl<any> {
        return this.dynamicControl;
    }

    /**
     * A Dynamic control or a name of the dynamic control that exists in parent dynamic form group
     */
    @Input()
    dynamicFormControlOutlet: AbstractDynamicControl<any> | string;

    @Input()
    name: string;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector,
        @Optional() private formGroup: FormGroupDirective
    ) {
        super();
    }

    ngOnChanges(simpleChanges: SimpleChanges): void {
        if ('dynamicFormControlOutlet' in simpleChanges) {
            if (simpleChanges.dynamicFormControlOutlet.currentValue) {
                if (isString(this.dynamicFormControlOutlet)) {
                    this.dynamicControl = <AbstractDynamicControl<any>>this.formGroup.control.get(this.dynamicFormControlOutlet as string);
                } else {
                    this.dynamicControl = this.dynamicFormControlOutlet as AbstractDynamicControl<any>;
                }

                this.name = this.control.name;

                if (!this.componentRef || this.componentRef.componentType !== this.dynamicControl.componentType) {
                    this.buildComponentInstance();
                }
            } else {
                this.viewContainerRef.clear();
            }
        }

        if ('name' in simpleChanges) {
            this.setId();
        }
    }

    ngDoCheck(): void {
        if (this.componentRef) {
            if (this.componentRef.componentType !== this.control.componentType) {
                this.buildComponentInstance();
            }

            this.syncInputsOutputs();

            this.changeDisplayingState();
        }
    }

    ngOnDestroy(): void {
        if (this.componentRef && !this.componentRef.hostView.destroyed) {
            this.componentRef.destroy();
        }
    }

    viewToModelUpdate(newValue: any): void {
        // TODO
    }

    private changeDisplayingState(): void {
        if (this.componentRef && this.displayed !== this.control.displayed) {
            if (this.control.displayed && !this.componentRef.hostView.destroyed) {
                this.viewContainerRef.insert(this.componentRef.hostView);

                if (!this.isControlSetup) {
                    this.setupControl();
                    this.isControlSetup = true;
                }
            } else {
                this.viewContainerRef.detach(this.componentViewRefIndex);
            }

            this.displayed = this.control.displayed;
        }
    }

    private setupControl(): void {
        this.setId();

        const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
        this.componentRef.location.nativeElement.attributes.setNamedItem(dynamicControlAttr);

        setupControl(this.control, this.componentRef.instance);
    }

    private buildComponentInstance(): void {
        this.viewContainerRef.clear();
        this.displayed = false;

        if (this.control instanceof AbstractDynamicControl) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.control.componentType);

            this.componentRef = componentFactory.create(
                Injector.create({
                    providers: [{ provide: NgControl, useValue: this }],
                    parent: this.injector
                })
            );

            this.inputsHandler = new InputsHandlerService(componentFactory);
            this.outputsHandler = new OutputsHandlerService(componentFactory);
            this.syncInputsOutputs();
        }
    }

    private syncInputsOutputs(): void {
        if (this.control instanceof AbstractDynamicControl) {
            this.inputsHandler.handle(this.control.inputs, this.componentRef.instance);
            this.outputsHandler.handle(this.control.outputs, this.componentRef.instance);
        }
    }

    private setId(): void {
        if (this.componentRef) {
            this.componentRef.location.nativeElement.id = this.name;
        }
    }
}
