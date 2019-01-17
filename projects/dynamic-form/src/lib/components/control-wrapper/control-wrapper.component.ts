import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { MakeProvider } from '../../abstractions';

@Component({
  selector: 'lib-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss'],
  providers: [MakeProvider(ControlWrapperComponent)]
})
export class ControlWrapperComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private viewContainerRef: ViewContainerRef;
  private componentInstance: ControlValueAccessor;

  @Input()
  control;

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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.control.componentAccessor.componentTypeChanged$.subscribe(componentType =>
      this.resolveComponent(componentType)
    );
  }

  public resolveComponent(componentType) {
    this.viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.componentInstance = <any>this.viewContainerRef.createComponent(componentFactory).instance;
    this.control.componentAccessor.registerComponent(
      this.componentInstance,
      componentFactory.inputs,
      componentFactory.outputs
    );
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy() {}
}
