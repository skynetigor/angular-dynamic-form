import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MakeProvider } from '../../abstractions';
import { BaseControlModel } from '../../models';

@Component({
  selector: 'lib-dynamic-control-outlet',
  templateUrl: './dynamic-control-outlet.component.html',
  styleUrls: ['./dynamic-control-outlet.component.scss'],
  providers: [MakeProvider(DynamicControlOutletComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlOutletComponent implements ControlValueAccessor, OnDestroy, OnChanges {
  private componentInstance: ControlValueAccessor;
  private subscriptions: Subscription[] = [];

  @ViewChild('host', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  @Input()
  control: BaseControlModel<any>;

  writeValue(obj: any): void {
    this.componentInstance.writeValue(obj);
  }
  registerOnChange(fn: any): void {
    this.componentInstance.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.componentInstance.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.componentInstance.setDisabledState(isDisabled);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    this.unsubscribe();
    this.subscriptions.push(
      this.control.componetController.componentTypeChanged$.subscribe(componentType =>
        this.resolveComponent(componentType)
      )
    );
  }

  public resolveComponent(componentType) {
    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = this.viewContainerRef.createComponent<any>(componentFactory);
    this.componentInstance = <any>componentRef.instance;

    this.control.componetController.registerComponent(
      componentRef,
      componentFactory.inputs.map(t => t.propName),
      componentFactory.outputs.map(t => t.propName)
    );
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.subscriptions.forEach(t => t.unsubscribe());
  }
}
