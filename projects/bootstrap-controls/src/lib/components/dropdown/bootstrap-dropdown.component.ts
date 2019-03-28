import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { IBootstrapDropdownInputs } from '../../interfaces';
import { MakeProvider, AbstractValueAccessor } from '../../abstractions';

@Component({
  selector: 'lib-bootstrap-dropdown',
  templateUrl: './bootstrap-dropdown.component.html',
  styleUrls: ['./bootstrap-dropdown.component.scss', '../common-styles.scss'],
  providers: [MakeProvider(BootstrapDropdownComponent)]
})
export class BootstrapDropdownComponent extends AbstractValueAccessor implements OnInit, IBootstrapDropdownInputs {
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

  get options() {
    return this._options;
  }

  @Output() dropdownOpened = new EventEmitter<boolean>();

  @Input()
  displayedProperty = null;
  @Input()
  placeholder: string;

  constructor(injector: Injector) {
    super(injector);
  }

  toggleDropdown() {
    if (!this.isDisabled) {
      this.isDropdownOpened = !this.isDropdownOpened;
      this.dropdownOpened.emit(this.isDropdownOpened);
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
