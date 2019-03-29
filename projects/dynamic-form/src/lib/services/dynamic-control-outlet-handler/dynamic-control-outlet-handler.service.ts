import { ComponentFactory, Injectable } from '@angular/core';

import { AbstractDynamicControl } from '../../models';
import { DynamicControlHandlerService } from '../dynamic-control-handler/dynamic-control-handler.service';

@Injectable()
export class DynamicControlOutletHandlerService extends DynamicControlHandlerService {

  constructor(private componentFactory: ComponentFactory<any>
    private control: AbstractDynamicControl<any>) {
    super()
  }
}
