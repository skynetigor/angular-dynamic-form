import { ComponentFactory } from '@angular/core';
import { Subscription } from 'rxjs';

export class OutputsHandlerService {
  private outputsSubscriptions: Subscription[] = [];

  constructor(private componentFactory: ComponentFactory<any>) {}

  handle(outputsObj, componentInstance) {
    this.unsubscribeFromOutputsSubscription();

    if (outputsObj) {
      this.componentFactory.outputs.forEach(prop => {
        const key = prop.propName;

        if (outputsObj.hasOwnProperty(prop.propName) && outputsObj[key]) {
          this.outputsSubscriptions.push(componentInstance[key].subscribe(outputsObj[key].bind(outputsObj)));
        }
      });
    } else {
      this.unsubscribeFromOutputsSubscription();
    }
  }

  private unsubscribeFromOutputsSubscription() {
    this.outputsSubscriptions.forEach(s => s.unsubscribe());
  }
}
