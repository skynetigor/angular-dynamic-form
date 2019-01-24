import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { MakeProvider } from '../../abstractions';
import { BaseControlModel } from '../../models';

@Component({
  selector: 'lib-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss'],
  providers: [MakeProvider(ControlWrapperComponent)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlWrapperComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private viewContainerRef: ViewContainerRef;
  private componentInstance: ControlValueAccessor;

  @Input()
  control: BaseControlModel<any>;

  get displayControl() {
    return this.control.isDisplayed === null || this.control.isDisplayed === undefined || this.control.isDisplayed;
  }

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

  @ViewChild('host', { read: ViewContainerRef })
  set prop(v) {
    this.viewContainerRef = v;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.control.componentTypeChanged$.subscribe(componentType => this.resolveComponent(componentType));
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

  public ngOnDestroy() {}
}
