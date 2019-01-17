import { Subject, ReplaySubject } from 'rxjs';

export class ComponentAccessor {
  private metadataObj: any = {};

  private componentTypeChangedSbj: ReplaySubject<any> = new ReplaySubject<any>();
  private _componentType;

  public get componentTypeChanged$() {
    return this.componentTypeChangedSbj.asObservable();
  }

  public get componentType() {
    return this._componentType;
  }

  public set componentType(v) {
    if (this._componentType !== v) {
      this._componentType = v;
      this.componentTypeChangedSbj.next(v);
    }
  }

  constructor(componentType, private inputsObj: any, private outputsObj: any, initialValue?: any) {
    this.componentType = componentType;
    this.metadataObj.config = initialValue ? { ...initialValue } : {};
  }

  public registerComponent(componentInstance: any, inputs: any[], outputs: any[]) {
    this.metadataObj.componentInstance = componentInstance;
    this.bindInputsProperties(inputs);
    this.bindOutputsProperties(outputs);
  }

  private bindInputsProperties(inputs: any[]) {
    const _this = this;

    inputs.forEach(inpt => {
      if (typeof this[inpt.propName] === 'undefined') {
        Object.defineProperty(this.inputsObj, inpt.propName, {
          get: function() {
            return _this.metadataObj.config[inpt.propName];
          },
          set: function(value) {
            _this.metadataObj.config[inpt.propName] = value;
            _this.metadataObj.componentInstance[inpt.propName] = value;
          }
        });
      }
      this.metadataObj.componentInstance[inpt.propName] = this.metadataObj.config[inpt.propName];
    });
  }

  private bindOutputsProperties(outputs: any[]) {
    outputs.forEach(outpt => {
      this.outputsObj[outpt.propName] = this.metadataObj.componentInstance[outpt.propName].asObservable();
    });
  }
}
