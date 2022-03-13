import { Component, DoCheck, Input, KeyValueDiffers, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { AbstractDynamicControl, DynamicFormGroup, TemplateModel } from '../../models';
import { FormBodyItem } from '../../types';
import { isDynamicControl, isDynamicFormGroup, isTemplateModel } from '../../utils';

/**
 * A component for rendering form based on @class DynamicFormGroup
 */
@Component({
    selector: 'dynamic-form-outlet',
    templateUrl: './dynamic-form-outlet.component.html'
})
export class DynamicFormOutletComponent implements OnInit, OnChanges, DoCheck {
    @ViewChild('defaultControlWrapper', { static: true })
    private defaultControlWrapper: TemplateRef<any>;
    @ViewChild('defaultTemplateWrapper', { static: true })
    private defaultTemplateWrapper: TemplateRef<any>;
    @ViewChild('formGroupTemplate', { static: true })
    private formGroupTemplate: TemplateRef<any>;

    private differ = this.differs.find({}).create();
    private _controlWrappers: any;

    /**
     * A form model that is rendered @instance DynamicFormGroup
     */
    @Input()
    dynamicFormGroup: DynamicFormGroup<any>;

    /**
     * An object that describes templates which control to be wrapped by custom template
     */
    @Input()
    controlWrappers: { [key: string]: TemplateRef<any> };

    /**
     * Form body that is built based on FormGroup
     */
    formBody: FormBodyItem[] = [];

    constructor(private differs: KeyValueDiffers) {}

    ngOnInit(): void {
        this.refreshControlWrappers();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('controlWrappers' in changes) {
            this.refreshControlWrappers();
            this.buildFormBody();
        }

    }

    trackByFn(_, obj: { trackBy: any }): void {
        return obj.trackBy;
    }

    ngDoCheck(): void {
        if (this.dynamicFormGroup instanceof DynamicFormGroup) {
            const diff = this.differ.diff(this.dynamicFormGroup.items);

            if (diff) {
                this.buildFormBody();
            }
        } else {
            this.formBody = [];
        }
    }

    private refreshControlWrappers(): void {
        this._controlWrappers = this.controlWrappers ? this.controlWrappers : {};
    }

    private buildFormBody(): void {
        this.formBody = Object.keys(this.dynamicFormGroup.items)
            .map(key => {
                const name = key;
                const item = this.dynamicFormGroup.items[key];
                const wrapper = this._controlWrappers[key];

                if (isDynamicControl(item)) {
                    const template = wrapper ? wrapper : this.defaultControlWrapper;

                    return {
                        name,
                        instance: item,
                        trackBy: item,
                        template: template,
                        context: { control: item, name: key }
                    } as FormBodyItem<{ control: AbstractDynamicControl<any>, name: string }>;
                } else if (isTemplateModel(item)) {
                    return {
                        name,
                        instance: item,
                        trackBy: item.templateRef,
                        template: this.defaultTemplateWrapper,
                        context: { templateModel: item }
                    } as FormBodyItem<{ templateModel: TemplateModel }>;
                } else if (isDynamicFormGroup(item)) {
                    return {
                        name,
                        instance: item,
                        trackBy: item,
                        template: wrapper ? wrapper : this.formGroupTemplate,
                        context: { dynamicFormGroup: item, name: key }
                    } as FormBodyItem<{dynamicFormGroup: DynamicFormGroup<any>, name: string}>;
                }
            })
            .filter(item => item);
    }
}
