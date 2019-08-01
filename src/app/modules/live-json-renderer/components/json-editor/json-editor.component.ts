import { ChangeDetectionStrategy, Component, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import * as angJson from 'ang-jsoneditor';

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorComponent implements OnInit {
    @Output()
    valueChanged = new EventEmitter();

    @ViewChild(angJson.JsonEditorComponent) editor: angJson.JsonEditorComponent;

    options = new angJson.JsonEditorOptions();

    constructor(private zone: NgZone) {
        this.options.mode = 'code';
        this.options.modes = ['code', 'text', 'tree', 'view'];
        this.options.statusBar = false;
        this.options.search = false;
        this.options.statusBar = false;
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            this.options.onChange = () => {
                this.zone.runOutsideAngular(() => {
                    const value = this.editor.get();
                    if (value) {
                        this.valueChanged.emit(value);
                    }
                });
            };
        });
    }
}
