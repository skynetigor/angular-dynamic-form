import { ComponentRef, Type } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder } from '@angular/forms';
import { isString } from 'util';

import { dynamicControlAttrName } from '../../constants';
import { IControlConfiguration } from '../../types';
import { ComponentController } from './component-controller';
import { Observable } from 'rxjs';

export class BaseControlModel<
  TControlComponent extends ControlValueAccessor,
  TInterface = any,
  TValue = any
> extends ComponentController<TControlComponent, TInterface, any> {
  private _name: string;
  private readonly _formControl: AbstractControl;
  private readonly _valueChanges: Observable<TValue>;

  public get formControl(): AbstractControl {
    return this._formControl;
  }

  public get name() {
    return this._name;
  }

  public get valueChanges(): Observable<TValue> {
    return this._valueChanges;
  }

  public get value(): TValue {
    return this.formControl.value;
  }

  public set value(v: TValue) {
    this.formControl.setValue(v);
  }

  constructor(config: IControlConfiguration<TInterface>, componentType: Type<TControlComponent>, initialValue = null) {
    super(componentType, config.initialInputs);

    const formBuilder = new FormBuilder();
    this._formControl = formBuilder.control(initialValue, config.validators, config.asyncValidators);
    this._valueChanges = this._formControl.valueChanges;
  }

  protected componentRegistered(
    componentRef: ComponentRef<any>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;

    if (isString(this.name)) {
      componentNativeElement.id = this.name;
    }

    super.componentRegistered(componentRef, inputsProperties, outputsProperties);
    const dynamicControlAttr = document.createAttribute(dynamicControlAttrName);

    componentNativeElement.attributes.setNamedItem(dynamicControlAttr);
  }
}
