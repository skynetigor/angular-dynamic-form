import { Type } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { dynamicComponentAttrName, dynamicComponentHiddenAttrName } from '../../constants';
import { IComponentMetadata, IDynamicComponentRef } from '../../types';

export class ComponentController<TComponentType, TInputsInterface = any, TOutputsInterfase = any> {
  public metadataObj: IComponentMetadata<TComponentType, TInputsInterface> = {
    inputs: <any>{},
    componentRef: null
  };

  private readonly _componentTypeChangedSbj = new ReplaySubject<any>();
  private readonly _componentRegistered = new Subject<IDynamicComponentRef<TComponentType>>();

  private _isDisplayed = true;
  private _componentType: Type<TComponentType>;

  public readonly inputs: TInputsInterface = <any>{};
  public readonly outputs: TOutputsInterfase = <any>{};

  public get componentTypeChanged$(): Observable<any> {
    return this._componentTypeChangedSbj.asObservable();
  }

  public get componentType(): Type<TComponentType> {
    return this._componentType;
  }

  public get componentRegistered$(): Observable<IDynamicComponentRef<TComponentType>> {
    return this._componentRegistered.asObservable();
  }

  public set componentType(v: Type<TComponentType>) {
    if (this._componentType !== v) {
      this._componentType = v;
      this._componentTypeChangedSbj.next(v);
    }
  }

  get isDisplayed(): boolean {
    return this._isDisplayed;
  }
  set isDisplayed(v: boolean) {
    if (v !== this._isDisplayed) {
      const componentNativeElement = this.metadataObj.componentRef.location.nativeElement as HTMLElement;

      if (v) {
        componentNativeElement.attributes.removeNamedItem(dynamicComponentHiddenAttrName);
      } else {
        const dynamicControlHiddenAttr = document.createAttribute(dynamicComponentHiddenAttrName);
        componentNativeElement.attributes.setNamedItem(dynamicControlHiddenAttr);
      }

      this._isDisplayed = v;
    }
  }

  constructor(componentType: Type<TComponentType>, inputs?: TInputsInterface) {
    this.componentType = componentType;

    if (inputs) {
      this.metadataObj.inputs = inputs;
    }
  }

  public registerComponent(
    componentRef: IDynamicComponentRef<TComponentType>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    this.metadataObj.componentRef = componentRef;
    this.bindInputsProperties(inputsProperties);
    this.bindOutputsProperties(outputsProperties);
    this.componentRegistered(componentRef, inputsProperties, outputsProperties);
    this._componentRegistered.next(componentRef);
  }

  protected componentRegistered(
    componentRef: IDynamicComponentRef<TComponentType>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;

    const dynamicComponentAttr = document.createAttribute(dynamicComponentAttrName);
    componentNativeElement.attributes.setNamedItem(dynamicComponentAttr);
  }

  private bindInputsProperties(inputs: string[]) {
    const __this = this;
    inputs.forEach(propName => {
      if (typeof this[propName] === 'undefined') {
        Object.defineProperty(this.inputs, propName, {
          get: function() {
            return __this.metadataObj.inputs[propName];
          },
          set: function(value) {
            __this.metadataObj.inputs[propName] = value;
            __this.metadataObj.componentRef.instance[propName] = value;
            if (__this.metadataObj.componentRef.changeDetectorRef['destroyed'] !== true) {
              __this.metadataObj.componentRef.changeDetectorRef.detectChanges();
            }
          }
        });
      }
      this.metadataObj.componentRef.instance[propName] = this.metadataObj.inputs[propName];
    });
  }

  private bindOutputsProperties(outputs: string[]) {
    outputs.forEach(outpt => {
      this.outputs[outpt] = this.metadataObj.componentRef.instance[outpt].asObservable();
    });
  }
}
