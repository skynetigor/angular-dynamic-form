import { ReplaySubject, Subject } from 'rxjs';
import { ComponentRef, Type } from '@angular/core';
import { dynamicComponentAttrName } from '../../constants';
import { isString } from 'util';
import { ComponentMetadata } from '../../types';

export abstract class ComponentController<TComponentType, TInputsInterface, TOutputsInterfase> {
  protected metadataObj: ComponentMetadata<TComponentType> = {
    config: {},
    componentRef: null
  };

  private readonly _componentTypeChangedSbj = new ReplaySubject<any>();
  private readonly _componentRendered = new Subject<
    ComponentController<TComponentType, TInputsInterface, TOutputsInterfase>
  >();

  private _componentType: Type<TComponentType>;
  private _name: string;
  private _dynamicComponentAttr = document.createAttribute(dynamicComponentAttrName);

  public get componentTypeChanged$() {
    return this._componentTypeChangedSbj.asObservable();
  }

  public get componentType() {
    return this._componentType;
  }

  public get componentRendered() {
    return this._componentRendered.asObservable();
  }

  public set componentType(v) {
    if (this._componentType !== v) {
      this._componentType = v;
      this._componentTypeChangedSbj.next(v);
    }
  }

  public get name() {
    return this._name;
  }

  get componentNativeElement(): HTMLElement {
    if (this.metadataObj.componentRef) {
      return this.metadataObj.componentRef.location.nativeElement;
    }
  }

  public inputs: TInputsInterface = <any>{};
  public outputs: TOutputsInterfase = <any>{};

  constructor(componentType: Type<TComponentType>, inputs?: TInputsInterface) {
    this.componentType = componentType;

    if (inputs) {
      this.metadataObj.config = inputs;
    }
  }

  public registerComponent(
    componentRef: ComponentRef<TComponentType>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    this.metadataObj.componentRef = componentRef;
    this.bindInputsProperties(inputsProperties);
    this.bindOutputsProperties(outputsProperties);
    this.componentRegistered(componentRef, inputsProperties, outputsProperties);
    this._componentRendered.next(this);
  }

  protected componentRegistered(
    componentRef: ComponentRef<TComponentType>,
    inputsProperties: string[],
    outputsProperties: string[]
  ) {
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;
    componentNativeElement.attributes.setNamedItem(this._dynamicComponentAttr);

    if (isString(this.name)) {
      componentNativeElement.classList.add(this.name);
    }
  }

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
            _this.metadataObj.componentRef.changeDetectorRef.detectChanges();
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
