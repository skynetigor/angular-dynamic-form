import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[dropArea]',
    exportAs: 'dropArea'
})
export class DropAreaDirective implements OnInit, OnDestroy {
    private element: HTMLElement;
    private subscriptions: Subscription[] = [];
    private counter = 0;

    isFilesOver: boolean;

    @Output()
    dropFiles = new EventEmitter<File[]>();

    @Output()
    dropItems = new EventEmitter<DataTransferItem[]>();

    get src() {
        return this.element;
    }

    constructor(element: ElementRef<HTMLElement>, private zone: NgZone) {
        this.element = element.nativeElement;
    }

    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.subscribeToEvent(eventName, this.preventDefaults);
            });

            this.subscribeToEvent('dragenter', this.dragEnter);
            this.subscribeToEvent('dragleave', this.dragLeave);
            this.subscribeToEvent('drop', this.drop);
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private preventDefaults(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    private drop(e: DragEvent) {
        this.zone.run(() => {
            if (e.dataTransfer.files && e.dataTransfer.files.length) {
                this.dropFiles.emit(Array.from(e.dataTransfer.files));
            }

            if (e.dataTransfer.items && e.dataTransfer.items.length) {
                this.dropItems.emit(Array.from(e.dataTransfer.items));
            }

            this.isFilesOver = false;

            this.counter = 0;
        });
    }

    private dragEnter() {
        if (!this.counter) {
            this.zone.run(() => (this.isFilesOver = true));
        }

        this.counter++;
    }

    private dragLeave() {
        this.counter--;

        if (!this.counter) {
            this.zone.run(() => (this.isFilesOver = false));
        }
    }

    private subscribeToEvent(name: string, handler: Function) {
        this.subscriptions.push(fromEvent(this.element, name).subscribe(handler.bind(this)));
    }
}
