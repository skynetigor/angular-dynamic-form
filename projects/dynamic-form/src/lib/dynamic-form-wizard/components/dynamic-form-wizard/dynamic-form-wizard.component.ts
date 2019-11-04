import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { GenericDynamicControl } from '../../../dynamic-form/models';
import { ControlConfiguration } from '../../../dynamic-form/types';
import { ControlsSourceService } from '../../services';
import { WizardRuntimeControl } from '../../types';

@Component({
    selector: 'lib-dynamic-form-wizard',
    templateUrl: './dynamic-form-wizard.component.html',
    styleUrls: ['./dynamic-form-wizard.component.scss']
})
export class DynamicFormWizardComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    @ViewChild('popup')
    private popupElementRef: ElementRef<HTMLDivElement>;

    items = [];

    controlToEdit: WizardRuntimeControl;

    controlsStream$: Observable<WizardRuntimeControl[]>;

    constructor(controlsSource: ControlsSourceService) {
        this.controlsStream$ = controlsSource.getWizardControlsStream().pipe(
            map(wc =>
                wc.map(
                    wizardControl =>
                        ({
                            ...wizardControl,
                            control: new GenericDynamicControl(wizardControl.initialConfig, wizardControl.componentType)
                        } as any)
                )
            ),
            shareReplay()
        );
    }

    ngOnInit() {
        // There is an issue with material-select component
        // this.subscriptions.push(
        //     fromEvent(document, 'mouseup').subscribe((e: MouseEvent) => {
        //         if (!this.popupElementRef.nativeElement.contains(e.target as HTMLElement)) {
        //             this.controlToEdit = undefined;
        //         }
        //     })
        // );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    drop(event: CdkDragDrop<WizardRuntimeControl[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            this.insertControlToForm(event.previousContainer.data, event.previousIndex, event.currentIndex);
        }
    }

    removeFromForm(index: number) {
        this.items.splice(index, 1);
    }

    editControl(wizardControl: WizardRuntimeControl) {
        this.controlToEdit = {
            control: wizardControl.control,
            initialConfig: { initialInputs: { ...wizardControl.control.inputs } },
            componentType: null,
            controlDefinition: wizardControl.controlDefinition
        };
    }

    submitEditing(config: ControlConfiguration<any, any, any>) {
        this.controlToEdit.control.inputs = { ...config.initialInputs };
        this.controlToEdit = undefined;
    }

    private insertControlToForm(source: WizardRuntimeControl[], currentIndex: number, targetIndex: number) {
        const to = Math.max(0, Math.min(targetIndex, this.items.length));

        if (source.length) {
            const genericControl = source[currentIndex];
            const toInsert = {
                ...genericControl,
                control: new GenericDynamicControl<any>(genericControl.initialConfig, genericControl.componentType)
            };

            this.items.splice(to, 0, toInsert);
        }
    }
}
