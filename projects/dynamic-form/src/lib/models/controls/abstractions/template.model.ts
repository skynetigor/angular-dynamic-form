import { TemplateRef } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export class TemplateModel<TContext> {
  private _templateRefChangedSubject: ReplaySubject<TemplateRef<any>>;
  private _currentTemplateRef: TemplateRef<any>;

  isDisplayed: boolean;
  context: TContext;

  public readonly templateRefChanged$: Observable<TemplateRef<any>>;

  public get templateRef() {
    return this._currentTemplateRef;
  }

  public set templateRef(value) {
    this._currentTemplateRef = value;
    this._templateRefChangedSubject.next(value);
  }

  constructor(context?: TContext, templateRef?: TemplateRef<any>) {
    this.context = context ? context : <TContext>{};
    this._templateRefChangedSubject = new ReplaySubject<TemplateRef<any>>();
    this.templateRefChanged$ = this._templateRefChangedSubject.asObservable();
    this.templateRef = templateRef;
  }
}
