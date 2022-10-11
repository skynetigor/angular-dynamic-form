import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DynamicFormGroup } from '@skynet-ng/dynamic-form';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormModelBuilderService } from '../../services';

@Component({
    selector: 'showcase-live-json-renderer',
    templateUrl: './live-json-renderer.component.html',
    styleUrls: ['./live-json-renderer.component.scss']
})
export class LiveJsonRendererComponent implements OnInit {
    private subject = new Subject();

    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
    formModel: DynamicFormGroup<any>;

    get formGroup() {
        return this.formModel;
    }

    options = new JsonEditorOptions();
    data = {
        "controls": {
            "login": {
                "type": "BootstrapTextField",
                "inputs": {
                    "label": "Login",
                    "multiline": false,
                    "placeholder": "Enter login",
                    "required": false,
                    "errorTexts": {
                        "required": "This field is required"
                    }
                }
            },
            "password": {
                "type": "BootstrapTextField",
                "inputs": {
                    "label": "Password",
                    "multiline": false,
                    "placeholder": "Enter password",
                    "required": true,
                    "type": "password",
                    "errorTexts": {
                        "required": "This field is required"
                    }
                },
                "validators": ["required"]
            },
            "numberField": {
                "type": "BootstrapTextField",
                "inputs": {
                    "label": "Number",
                    "multiline": false,
                    "placeholder": "Enter number",
                    "required": true,
                    "type": "text",
                    "errorTexts": {
                        "required": "This field is required",
                        "maxlength": "Field value should be less than {0}.",
                        "minlength": "Field value should be greater than {0}."
                    }
                },
                "validators": [
                    "required",
                    {
                        "name": "maxLength",
                        "value": 10
                    },
                    {
                        "name": "minLength",
                        "value": 5
                    }
                ]
            }
        }
    };

    jsonChanged(json) {
        this.subject.next(json);
    }

    constructor(private formModelBuilder: FormModelBuilderService, private cd: ChangeDetectorRef) {
        this.options.mode = 'code';
        this.options.modes = ['code', 'text', 'tree', 'view'];
        this.options.statusBar = false;
        this.options.search = false;
        this.options.statusBar = false;
    }

    ngOnInit() {
        this.subject.pipe(debounceTime(500)).subscribe(value => {
            const v = this.formModelBuilder.buildFormModel(value);
            this.formModel = this.formModelBuilder.buildFormModel(value).dynamicFormGroup;
            if (v.script) {
                v.script.call(this);
            }
            Object.keys(this.formGroup.controls).forEach(itKey => {
                const control = this.formGroup.items[itKey];
                Object.keys(control.outputs).forEach(cKey => {
                    const fn = control.outputs[cKey];
                    if (typeof fn === 'function') {
                        control.outputs[cKey] = fn.bind(this);
                    }
                });
            });

            this.cd.detectChanges();
        });
    }
}
