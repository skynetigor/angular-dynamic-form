import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { IControlConfiguration, IDynamicComponentRef } from '../../types';
import { ComponentController } from './component-controller';

export class BaseControlModel<TControlComponent, TInputs = any, TOutputs = any, TValue = any> extends FormControl {
  private _name: string;
  private componentRef: IDynamicComponentRef<TControlComponent>;

  private readonly _componentController: ComponentController<TControlComponent, TInputs>;

  public get name() {
    return this._name;
  }

  public get inputs(): TInputs {
    return this._componentController.inputs;
  }

  public get outputs(): TOutputs {
    return this._componentController.outputs;
  }

  public get isDisplayed() {
    return this._componentController.isDisplayed;
  }

  public set isDisplayed(value: boolean) {
    this._componentController.isDisplayed = value;
  }

  public readonly valueChanges: Observable<TValue>;

  public get componetController() {
    return this._componentController;
  }

  constructor(config: IControlConfiguration<TInputs, TValue>, componentType: Type<TControlComponent>) {
    super(config.validators, config.asyncValidators);
    this._componentController = new ComponentController<TControlComponent, TInputs>(
      componentType,
      config.initialInputs
    );

    this._componentController.componentRendered.subscribe(componentRef => {
      this.componentRef = componentRef;
      const componentNativeElement = componentRef.location.nativeElement as HTMLElement;

      if (isString(this.name)) {
        componentNativeElement.id = this.name;
      }

      const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);
      componentNativeElement.attributes.setNamedItem(dynamicControlAttr);
    });
  }

  setValue(
    value: TValue,
    options: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    } = {}
  ): void {
    super.setValue(value, options);
    this.detectChanges();
  }

  patchValue(
    value: TValue,
    options: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    } = {}
  ): void {
    super.patchValue(value, options);
  }

  reset(value?: TValue, options?: Object): void {
    super.reset(value, options);
  }

  private detectChanges() {
    if (this._componentController.metadataObj.componentRef) {
      if (this.componentRef.changeDetectorRef['destroyed'] !== true) {
        this.componentRef.changeDetectorRef.detectChanges();
      }
    }
  }
}
