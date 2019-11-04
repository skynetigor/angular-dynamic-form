import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { DropAreaDirective } from '../drop-area/drop-area.directive';

@Directive({
    selector: '[allowDragging]'
})
export class DraggableDirective implements OnInit, OnChanges, OnDestroy {
    private element: HTMLElement;
    private subscriptions: Subscription[] = [];
    private isClicked: boolean;
    private state: { x?: number; y?: number };

    @Input()
    allowDragging: boolean;

    @Output()
    dragStart = new EventEmitter();

    constructor(elementRef: ElementRef<HTMLElement>, private dropArea: DropAreaDirective) {
        this.element = elementRef.nativeElement;
    }

    ngOnInit() {}

    ngOnChanges(sc: SimpleChanges) {
        if ('allowDragging' in sc && this.allowDragging) {
            this.ngOnDestroy();

            this.subscribeToEvent(this.dropArea.src, 'drop', this.drop);

            this.subscribeToEvent(this.element, 'mousedown', this.mouseDown);
            this.subscribeToEvent(this.element, 'mousemove', this.mouseMove);
            this.subscribeToEvent(this.element, 'mouseup', this.mouseUp);
        }
    }

    drop(e: DragEvent) {
        console.log(e);
    }

    mouseMove(e: MouseEvent) {
        if (this.isClicked && this.isDragging(e)) {
            console.log(e);
            this.element.style.position = 'absolute';
            this.element.style.top = `${e.y}px`;
            this.element.style.left = `${e.x}px`;
        }
    }

    mouseDown(e: MouseEvent) {
        this.isClicked = true;
        this.state = { x: e.x, y: e.y };
        this.state.x = e.x;
        this.state.y = e.y;

        // this.element.style.position = 'absolute';
    }

    mouseUp(e: MouseEvent) {
        console.log(e);
        // this.element.style.position = 'initial';
        this.state = null;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(t => t.unsubscribe());
    }

    private subscribeToEvent(target: HTMLElement, name: string, handler: Function) {
        this.subscriptions.push(fromEvent(target, name).subscribe(handler.bind(this)));
    }

    private isDragging(e: MouseEvent): boolean {
        return this.state && (Math.abs(this.state.x - e.x) > 20 || Math.abs(this.state.y - e.y) > 20);
    }
}
