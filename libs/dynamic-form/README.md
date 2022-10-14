## @skynet-ng/dynamic-form
An extension for Angular Reactive forms to render forms dynamically.

## About
Reactive forms compatible dynamic form called upon to facilitate work with form, render a form from a config (from JSON, from Back-end response, etc).
Works with ControlValueAccessor powered components. Supports all the functionality owned by Angular Reactive Forms.

## Showcase
[See showcase here](https://dynamic-form-showcase.firebaseapp.com)

[Showcase source code](https://github.com/skynetigor/angular-dynamic-form/tree/develop/apps/showcase/src/app/modules)

## Get started
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
In your component's ts file you want to implement form in, define form via DynamicFormGroup. After dynamic form is defined, pass it through `dynamicFormGroup` input in `dynamic-form-outlet` component. 

```ts
import { Component } from '@angular/core';
import { DynamicControl, DynamicFormGroup } from '@skynet-ng/dynamic-form';
import { TextfieldComponent } from './components';

@Component({
  selector: 'example-app-root',
  template: `
    <div class="flex justify-center items-center absolute w-full h-full bg-gray-200">
      <div class="bg-white flex flex-col w-96 border-gray-300 border border-solid p-5 rounded-md gap-4">
        <form class="flex flex-col gap-4">
          <dynamic-form-outlet [dynamicFormGroup]="dynamicFormGroup"></dynamic-form-outlet>
        </form>
        <button class="self-end h-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          Submit
        </button>
      </div>
    </div>
  `
})
export class AppComponent {
  dynamicFormGroup = new DynamicFormGroup({
    name: new DynamicControl({
      initialInputs: {
        label: 'Name',
        placeholder: 'Enter your name'
      }
    }, TextfieldComponent),
    surname: new DynamicControl({
      initialInputs: {
        label: 'Surname',
        placeholder: 'Enter your surname'
      }
    }, TextfieldComponent),
    age: new DynamicControl({
      initialInputs: {
        label: 'Age',
        placeholder: 'Enter your age',
        type: 'number'
      }
    }, TextfieldComponent)
  });
}

```

You can play with it in [StackBlitz](https://stackblitz.com/edit/skynet-ng-dynamic-form-example-jarsjn?file=src/app/app.component.scss). Also, this example is availabe in [GitHub](https://github.com/skynetigor/angular-dynamic-form/tree/develop/apps/example/src/app).

## Usage notes
- Controls are being rendered outside `dynamic-form-outlet` element. This is done this way in order to allow outer element to apply layout styles for controls. `dynamic-form-outlet` has `display: none` CSS property so it does not participate in layout. See screenshot from the dev tools:

![image](https://user-images.githubusercontent.com/20903171/195823124-3b81bc27-a056-4288-86e1-7f5b3f5e8fe0.png)

- The rendering system adds ids for each control. It takes the name of a control which it's defined in `DynamicFormGroup` with (how it looks like in dev tools can bee seen on the screenshot from the previous bullet). This part of functionality is needed for automation tests so that they can select specific control HTML elements. Example of names the rendering system use:

![image](https://user-images.githubusercontent.com/20903171/195823533-7b779b8a-ee97-4d33-bfad-b736fcb1561b.png)

- The rendering system puts `dynamic-control` empty attribute for each being rendered controls. Might be useful for selection purposes.

![image](https://user-images.githubusercontent.com/20903171/195820666-80d3ef64-3975-4b90-891a-880171cc0a23.png)





