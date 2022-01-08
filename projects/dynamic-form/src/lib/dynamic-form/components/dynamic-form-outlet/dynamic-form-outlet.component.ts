import { Component, DoCheck, Input, KeyValueDiffers, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { DynamicFormGroup } from '../../models';
import { isDynamicControl, isDynamicFormGroup, isTemplateModel } from '../../utils';

/**
 * A component for rendering form based on @class DynamicFormGroup
 */
@Component({
    selector: 'lib-dynamic-form-outlet',
    templateUrl: './dynamic-form-outlet.component.html'
})
export class DynamicFormOutletComponent implements OnInit, OnChanges, DoCheck {
    @ViewChild('defaultControlWrapper')
    private defaultControlWrapper: TemplateRef<any>;
    @ViewChild('defaultTemplateWrapper')
    private defaultTemplateWrapper: TemplateRef<any>;
    @ViewChild('formGroupTemplate')
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
    formBody = [];

    constructor(private differs: KeyValueDiffers) {}

    ngOnInit() {
        this.refreshControlWrappers();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('controlWrappers' in changes) {
            this.refreshControlWrappers();
            this.buildFormBody();
        }
    }

    trackByFn(_, obj: { trackBy: any }) {
        return obj.trackBy;
    }

    ngDoCheck() {
        if (this.dynamicFormGroup instanceof DynamicFormGroup) {
            const diff = this.differ.diff(this.dynamicFormGroup.items);

            if (diff) {
                this.buildFormBody();
            }
        } else {
            this.formBody = [];
        }
    }

    private refreshControlWrappers() {
        this._controlWrappers = this.controlWrappers ? this.controlWrappers : {};
    }

    private buildFormBody() {
        this.formBody = Object.keys(this.dynamicFormGroup.items)
            .map(key => {
                const item = this.dynamicFormGroup.items[key];
                const wrapper = this._controlWrappers[key];

                if (isDynamicControl(item)) {
                    const template = wrapper ? wrapper : this.defaultControlWrapper;

                    return {
                        instance: item,
                        trackBy: item,
                        template: template,
                        context: { control: item, name: key }
                    };
                } else if (isTemplateModel(item)) {
                    return {
                        instance: item,
                        trackBy: item.templateRef,
                        template: this.defaultTemplateWrapper,
                        context: { templateModel: item }
                    };
                } else if (isDynamicFormGroup(item)) {
                    return {
                        instance: item,
                        trackBy: item,
                        template: wrapper ? wrapper : this.formGroupTemplate,
                        context: { formModel: item, name: key }
                    };
                }
            })
            .filter(t => t);
    }
}
