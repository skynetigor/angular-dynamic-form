import { Type } from '@angular/core';
import { Observable, ReplaySubject, Subject as EventEmitter, Subscription, isObservable } from 'rxjs';

import { dynamicComponentAttrName, dynamicComponentHiddenAttrName } from '../../constants';
import { IComponentMetadata, IDynamicComponentRef } from '../../types';
import { ComponentFactory } from '@angular/core';

export class ComponentController<TComponentType, TInputsInterface = any, TOutputsInterfase = any> {
  public metadataObj: IComponentMetadata<TComponentType, TInputsInterface> = {
    inputs: <any>{},
    componentRef: null
  };

  private readonly _componentTypeChangedSbj = new ReplaySubject<any>();
  private readonly _componentRegistered = new EventEmitter<IDynamicComponentRef<TComponentType>>();
  private _componentFactory: ComponentFactory<TComponentType>;
  private _inputProps: string[];
  private _outputProps: string[];
  private _outputsSubscriptions: Subscription[] = [];

  private _isDisplayed = true;
  private _componentType: Type<TComponentType>;
  private _outputSubjects: { [key: string]: EventEmitter<any> } = {};

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

  public setComponentFactory(componentFactory: ComponentFactory<TComponentType>) {
    if (!this._componentFactory) {
      this._inputProps = componentFactory.inputs.map(t => t.propName);
      this._outputProps = componentFactory.outputs.map(t => t.propName);

      this.bindInputsProperties(this._inputProps);
      this.bind();
      this._componentFactory = componentFactory;
    }
  }

  public registerComponent(componentRef: IDynamicComponentRef<TComponentType>) {
    if (!(componentRef.instance instanceof this._componentFactory.componentType)) {
      throw new Error(
        `A component instance should be of type ${this._componentFactory.componentType.name} but was ${
          componentRef.componentType.name
        }`
      );
    }

    this.bindOutputsProperties(componentRef.instance);
    this.metadataObj.componentRef = componentRef;
    this.componentRegistered(componentRef);
    this._componentRegistered.next(componentRef);

    this._inputProps.forEach(propName => {
      this.metadataObj.componentRef.instance[propName] = this.metadataObj.inputs[propName];
    });

    this.detectChanges();
  }

  protected componentRegistered(componentRef: IDynamicComponentRef<TComponentType>) {
    const componentNativeElement = componentRef.location.nativeElement as HTMLElement;

    const dynamicComponentAttr = document.createAttribute(dynamicComponentAttrName);
    componentNativeElement.attributes.setNamedItem(dynamicComponentAttr);
  }

  public detectChanges() {
    if (this.metadataObj.componentRef) {
      if (this.metadataObj.componentRef.changeDetectorRef['destroyed'] !== true) {
        this.metadataObj.componentRef.changeDetectorRef.detectChanges();
      }
    }
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
            __this.detectChanges();
          }
        });
      }
    });
  }

  private bindOutputsProperties(componentInstance: TComponentType) {
    this._outputsSubscriptions.forEach(subscription => subscription.unsubscribe());

    this._outputProps.forEach(outpt => {
      if (isObservable(componentInstance[outpt])) {
        this._outputsSubscriptions.push(
          componentInstance[outpt].subscribe(v => {
            this._outputSubjects[outpt].next(v);
          })
        );
      }
    });
  }

  private bind() {
    this._outputProps.forEach(outpt => {
      const subject = new EventEmitter<any>();
      this._outputSubjects[outpt] = subject;

      Object.defineProperty(this.outputs, outpt, {
        get: function() {
          return subject.asObservable();
        }
      });
    });
  }
}
