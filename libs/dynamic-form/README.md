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
Import DynamicFormModule into your module

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
Create [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) component. Example of such a component is [here](https://www.digitalocean.com/community/tutorials/angular-custom-form-control).
Let's implement TextfieldComponent.

```ts
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'textfield-control',
  template: `
    <div class="flex flex-col gap-1">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <input
        class="block w-full border border-gray-300 rounded-md sm:text-sm shadow-sm outline-indigo-500 p-3"
        [disabled]="isDisabled"
        [type]="type"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [disabled]="isDisabled"
      />
    </div>
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
  label: string;

  @Input()
  placeholder = '';

  @Input()
  type: 'text' | 'number' = 'text';

  onChange = (_) => {};

  onTouch = () => {};

  writeValue(value: any): void {
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

export class TextfieldControl extends AbstractDynamicControl<TextfieldComponent> {
    constructor(config: ControlConfiguration<any, any, string>) {
        super(config, TextfieldComponent);
    }
}
```

**Step 5:**
In your component's ts file you want to implement form in, define form via DynamicFormGroup. After dynamic form is defined, pass it through `dynamicFormGroup` input in `dynamic-form-outlet` component. 

```ts
import { Component } from '@angular/core';
import { DynamicFormGroup } from '@skynet-ng/dynamic-form';
import { TextfieldControl } from './models';

@Component({
  selector: 'example-app-root',
  template: `
    <div class="flex justify-center items-center absolute w-full h-full bg-gray-200">
      <div class="bg-white flex flex-col w-96 border-gray-300 border border-solid p-5 rounded-md gap-4">
        <dynamic-form-outlet class="flex flex-col gap-4" [dynamicFormGroup]="dynamicFormGroup"></dynamic-form-outlet>
        <button class="self-end h-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          Submit
        </button>
      </div>
    </div>
  `
})
export class AppComponent {
  dynamicFormGroup = new DynamicFormGroup({
    name: new TextfieldControl({
      initialInputs: {
        label: 'Name',
        placeholder: 'Enter your name'
      }
    }),
    surname: new TextfieldControl({
      initialInputs: {
        label: 'Surname',
        placeholder: 'Enter your surname'
      }
    }),
    age: new TextfieldControl({
      initialInputs: {
        label: 'Age',
        placeholder: 'Enter your age',
        type: 'number'
      }
    })
  });
}
```









