import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { AbstractValueAccessor, MakeProvider } from '../../../abstractions';

@Component({
  selector: 'lib-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [MakeProvider(DropdownComponent)]
})
export class DropdownComponent extends AbstractValueAccessor implements OnInit {
  private _options = [];

  isDropdownOpened = false;

  @Input()
  set options(value) {
    if (this._options !== value) {
      this._options = value;
      this.dirty = false;
      this.value = null;

      if (!!this.formControl) {
        this.formControl.reset();
      }
    }
  }

  @Output() dropdownOpened = new EventEmitter<boolean>();
  @Output() dropdown2Opened = new EventEmitter<boolean>();

  get options() {
    return this._options;
  }

  @Input()
  displayedProperty = null;
  @Input()
  placeholder: string;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  toggleDropdown() {
    if (!this.isDisabled) {
      this.isDropdownOpened = !this.isDropdownOpened;
      this.dropdownOpened.emit(this.isDropdownOpened);
      this.dropdown2Opened.emit(this.isDropdownOpened);
    }
  }

  selectOption(option: any) {
    this.value = option;
    this.toggleDropdown();
  }

  markAsDirty() {
    this.isDropdownOpened = false;
    super.markAsDirty();
  }

  displayOptionValue(option: any) {
    if (!option) {
      return '';
    }
    if (!this.displayedProperty) {
      return option;
    }

    return option[this.displayedProperty];
  }
}
