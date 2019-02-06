import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { MakeProvider } from '../../abstractions';
import { BaseControlModel } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss'],
  providers: [MakeProvider(ControlWrapperComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlWrapperComponent implements ControlValueAccessor, OnDestroy, OnChanges {
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
      this.control.componentTypeChanged$.subscribe(componentType => this.resolveComponent(componentType))
    );
  }

  public resolveComponent(componentType) {
    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const componentRef = this.viewContainerRef.createComponent<any>(componentFactory);
    this.componentInstance = <any>componentRef.instance;

    this.control.registerComponent(
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
