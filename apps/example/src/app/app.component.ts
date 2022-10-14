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
