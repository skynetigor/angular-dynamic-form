### Contributors 

### @skynet-ng/dynamic-form
An extension for Angular Reactive forms for rendering forms dynamically.

### About
Reactive forms compatible dynamic form called upon to facilitate work with form, render a form from a config (from JSON, from Back-end response, etc).
Works with ControlValueAccessor powered components. Supports all the functionality owned by Angular Dynamic form.

### Showcase
[See showcase here](https://dynamic-form-showcase.firebaseapp.com)

### Get started
**Step 1:**
Install the lib.
```sh
npm install @skynet-ng/dynamic-form
```

**Step 2:**
Import DynamicFormModule intor your module

```ts
import { NgModule } from '@angular/core';
import { DynamicFormModule } from '@skynet-ng/dynamic-form';

@NgModule({
  imports: [
    ...
    DynamicFormModule
  ],
  ...
})
export class SomeModule {}
```

**Step 3:**
Create [ControlValueAccessor] component. Example of such a component is [here](https://www.digitalocean.com/community/tutorials/angular-custom-form-control).
Let's assume that we created TextfieldComponent.

```ts
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'textfield-control',
  template: `
    <input
        [disabled]="isDisabled"
        [type]="type"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [disabled]="isDisabled"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
})
export class TextfieldComponent implements ControlValueAccessor {
  private _value: string;

  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  isDisabled: boolean;

  @Input()
  placeholder = '';

  @Input()
  type: 'text' | 'number' = 'text';

  onChange = (_) => {};

  onTouch = () => {};

  writeValue(obj: any): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
```

**Step 4:**
Create dynamic control by inheriting AbstractDynamicControl class and passing component config and component type (`TextfieldComponent`) through the `super` call.

```ts
import { AbstractDynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';
import { TextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends AbstractDynamicControl<TextfieldComponent> {
    constructor(config: ControlConfiguration<any, any, string>) {
        super(config, TextfieldComponent);
    }
}
```

**Step 5:**
In your component's ts file you want the form in, define form via DynamicFormGroup.

```ts
import { AbstractDynamicControl, ControlConfiguration } from '@skynet-ng/dynamic-form';
import { TextfieldComponent } from '../components';

export class BootstrapTextFieldModel extends AbstractDynamicControl<TextfieldComponent> {
    constructor(config: ControlConfiguration<any, any, string>) {
        super(config, TextfieldComponent);
    }
}
```











[ControlValueAccessor]: <https://angular.io/api/forms/ControlValueAccessor>
