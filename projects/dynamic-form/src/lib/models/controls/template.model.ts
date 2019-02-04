import { TemplateRef } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

export class TemplateModel<TContext> {
  private readonly _templateRefChangedSubject = new BehaviorSubject<TemplateRef<any>>(undefined);
  private _currentTemplateRef: TemplateRef<any>;

  isDisplayed: boolean;
  context: TContext;

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

  constructor(context?: TContext, templateRef?: TemplateRef<any>) {
    this.context = context ? context : <TContext>{};
    this.templateRefChanged$ = this._templateRefChangedSubject.asObservable();
    this.templateRef = templateRef;
  }
}
