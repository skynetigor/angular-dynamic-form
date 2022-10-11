import { Component, EventEmitter, Injector, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

import { AbstractValueAccessor, MakeProvider } from '../../abstractions';
import { IBootstrapDropdownInputs } from '../../interfaces';

@Component({
    selector: 'showcase-bootstrap-dropdown',
    templateUrl: './bootstrap-dropdown.component.html',
    styleUrls: ['./bootstrap-dropdown.component.scss', '../common-styles.scss'],
    providers: [MakeProvider(BootstrapDropdownComponent)]
})
export class BootstrapDropdownComponent extends AbstractValueAccessor implements IBootstrapDropdownInputs, OnChanges {
    private _options = [];

    isDropdownOpened = false;

    @Input()
    set options(value) {
        if (this._options !== value) {
            // this._options = value;
            this.dirty = false;
            this.value = null;

            if (this.formControl) {
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

    ngOnChanges(obj: SimpleChanges) {
        if ('options' in obj) {
            this._options = obj['options'].currentValue;
        }
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
