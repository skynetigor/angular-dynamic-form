import { TemplateRef } from '@angular/core';

export class TemplateModel<TContext = any> {
  private _name: string;

  public get name() {
    return this._name;
  }

  public templateRef: TemplateRef<any>;

  public isDisplayed = true;

  constructor(public readonly context?: TContext, templateRef?: TemplateRef<any>) {
    this.context = context ? context : <TContext>{};
    this.templateRef = templateRef;
  }
}
