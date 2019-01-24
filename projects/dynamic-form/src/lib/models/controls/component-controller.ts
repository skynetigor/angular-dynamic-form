import { ReplaySubject } from 'rxjs';
import { ComponentRef } from '@angular/core';

export abstract class ComponentController<TInputsInterface, TOutputsInterfase> {
  protected metadataObj: { config: any; componentRef: ComponentRef<any> } = {
    config: {},
    componentRef: null
  };

  private _componentTypeChangedSbj: ReplaySubject<any> = new ReplaySubject<any>();
  private _componentType;

  public get componentTypeChanged$() {
    return this._componentTypeChangedSbj.asObservable();
  }

  public get componentType() {
    return this._componentType;
  }

  public set componentType(v) {
    if (this._componentType !== v) {
      this._componentType = v;
      this._componentTypeChangedSbj.next(v);
    }
  }

  public inputs: TInputsInterface = <any>{};
  public outputs: TOutputsInterfase = <any>{};

  constructor(componentType, initialValue?: any) {
    this.componentType = componentType;

    if (initialValue) {
      this.metadataObj.config = initialValue;
    }
  }

  public registerComponent(componentRef: ComponentRef<any>, inputsProperties: string[], outputsProperties: string[]) {
    this.metadataObj.componentRef = componentRef;
    this.bindInputsProperties(inputsProperties);
    this.bindOutputsProperties(outputsProperties);
    this.componentRegistered(componentRef, inputsProperties, outputsProperties);
  }

  protected componentRegistered(
    componentRef: ComponentRef<any>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {}

  private bindInputsProperties(inputs: string[]) {
    const _this = this;

    inputs.forEach(propName => {
      if (typeof this[propName] === 'undefined') {
        Object.defineProperty(this.inputs, propName, {
          get: function() {
            return _this.metadataObj.config[propName];
          },
          set: function(value) {
            _this.metadataObj.config[propName] = value;
            _this.metadataObj.componentRef.instance[propName] = value;
          }
        });
      }
      this.metadataObj.componentRef.instance[propName] = this.metadataObj.config[propName];
    });
  }

  private bindOutputsProperties(outputs: string[]) {
    outputs.forEach(outpt => {
      this.outputs[outpt] = this.metadataObj.componentRef.instance[outpt].asObservable();
    });
  }
}
