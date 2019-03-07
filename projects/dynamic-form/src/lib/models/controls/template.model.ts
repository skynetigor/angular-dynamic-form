import { TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class TemplateModel<TContext = any> {
    private readonly _templateRefChangedSubject = new BehaviorSubject<TemplateRef<any>>(undefined);
    private readonly _hideSubject = new Subject<boolean>();

    private _currentTemplateRef: TemplateRef<any>;
    private _name: string;

    private _isDisplayed = true;

    public get hide$() {
        return this._hideSubject.asObservable();
    }

    public get name() {
        return this._name;
    }

    public readonly templateRefChanged$: Observable<TemplateRef<any>>;

    public get templateRef() {
        return this._currentTemplateRef;
    }

    public set templateRef(value) {
        if (this._currentTemplateRef !== value) {
            this._currentTemplateRef = value;
            this._templateRefChangedSubject.next(value);
        }
    }

    get isDisplayed(): boolean {
        return this._isDisplayed;
    }
    set isDisplayed(v: boolean) {
        if (v !== this._isDisplayed) {
            this._hideSubject.next(v);
            this._isDisplayed = v;
        }
    }

    constructor(public readonly context?: TContext, templateRef?: TemplateRef<any>) {
        this.context = context ? context : <TContext>{};
        this.templateRefChanged$ = this._templateRefChangedSubject.asObservable();
        this.templateRef = templateRef;
    }
}
