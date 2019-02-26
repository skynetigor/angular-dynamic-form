import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { IControlConfiguration } from '../../types';
import { ComponentController } from './component-controller';
import { ComponentRef } from '@angular/core/src/render3';

export class BaseControlModel<TControlComponent, TInterface = any, TValue = any> extends FormControl {
  private _name: string;
  private componentRef: ComponentRef<TControlComponent>;

  private readonly _componentController: ComponentController<TControlComponent, TInterface>;

  public get name() {
    return this._name;
  }

  public readonly valueChanges: Observable<TValue>;

  public get componetController() {
    return this._componentController;
  }

  constructor(config: IControlConfiguration<TInterface, TValue>, componentType: Type<TControlComponent>) {
    super(config.validators, config.asyncValidators);
    this._componentController = new ComponentController<TControlComponent, TInterface>(
      componentType,
      config.initialInputs
    );

    this._componentController.componentRendered.subscribe(componentRef => {
      this.componentRef = <any>componentRef;
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
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }
}
