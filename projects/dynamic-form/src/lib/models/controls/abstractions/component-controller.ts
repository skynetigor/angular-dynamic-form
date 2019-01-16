import { ComponentAccessor } from './component-accessor';

export abstract class ComponentController<TInputsInterface, TOutputsInterfase> {
  public inputs: TInputsInterface = <any>{};
  public outputs: TOutputsInterfase = <any>{};
  public componentAccessor: ComponentAccessor;

  constructor(componentType, initialValue?: any) {
    this.componentAccessor = new ComponentAccessor(componentType, this.inputs, this.outputs, initialValue);
  }
}
