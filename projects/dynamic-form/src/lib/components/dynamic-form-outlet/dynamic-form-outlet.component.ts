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
    @ViewChild('defaultControlWrapper') private defaultControlWrapper: TemplateRef<any>;
    @ViewChild('defaultTemplateWrapper') private defaultTemplateWrapper: TemplateRef<any>;
    @ViewChild('formGroupTemplate') private formGroupTemplate: TemplateRef<any>;

    private _differ = this.differs.find({}).create();
    private _controlWrappers: any;
    /**
     * A form model that is rendered @instance DynamicFormGroup
     */
    @Input()
    formModel: DynamicFormGroup<any>;

    /**
     * An object that describes templates which control to be wrapped by custom template
     */
    @Input()
    controlWrappers: any;

    /**
     * Form body that is built based on FormModel
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
        if (this.formModel instanceof DynamicFormGroup) {
            const diff = this._differ.diff(this.formModel.items);

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
        this.formBody = Object.keys(this.formModel.items)
            .map(key => {
                const item = this.formModel.items[key];
                const wrapper = this._controlWrappers[key];

                if (isDynamicControl(item)) {
                    const template = wrapper ? wrapper : this.defaultControlWrapper;

                    return {
                        instance: item,
                        trackBy: item,
                        template: template,
                        context: { control: item }
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
                        context: { formGroup: item }
                    };
                }
            })
            .filter(t => t);
    }
}
