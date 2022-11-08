import { TemplateRef } from '@angular/core';
import { ControlNamePrivatePropertyName } from '../../types';

export class TemplateModel<TContext = any> {
    public get name(): string {
        return this[ControlNamePrivatePropertyName];
    }

    public templateRef: TemplateRef<any>;

    public displayed = true;

    constructor(public readonly context?: TContext, templateRef?: TemplateRef<any>) {
        this.context = context ? context : <TContext>{};
        this.templateRef = templateRef;
    }
}
