import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as angJson from 'ang-jsoneditor';

@Component({
  selector: 'showcase-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorComponent implements OnInit, OnChanges {
  @Output()
  valueChanged = new EventEmitter();

  @ViewChild(angJson.JsonEditorComponent, { static: true })
  editor: angJson.JsonEditorComponent;

  options = new angJson.JsonEditorOptions();

  @Input()
  data: any;

  constructor(private zone: NgZone) {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;
    this.options.search = false;
    this.options.statusBar = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
        this.valueChanged.emit(this.data);
    }
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
