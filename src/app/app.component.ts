import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPrimitive } from 'util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private forms = {
        'Simple form native approach': 'simple-form-native-approach',
        'Simple form without renderer': 'simple-form-without-renderer',
        'Simple form': 'simple-form',
        'Simple form with <ng-teplate></ng-template>': 'simple-form-ng-temlate',
        'Simple form with controls styling': 'simple-form-with-controls-styling',
        'Forms from server': 'forms-from-server',
        'Simple form with inputs binder directive': 'simple-form-with-inputs-binder-directive',
        'Live JSON renderer': 'live-json-renderer',
        'Dynamic form wizard': 'dynamic-form-wizard'
    };

    formState = {
        Controls: 'controls',
        Valid: 'valid',
        Dirty: 'dirty',
        Pristine: 'pristine'
    };

    public formButtons = Object.keys(this.forms).map(key => ({ title: key, path: this.forms[key] }));
    public formStateReflecting = Object.keys(this.formState).map(key => ({
        title: key,
        selector: () => this.currentComponent.formGroup[this.formState[key]]
    }));

    public get formStateReflectings() {
        if (this.currentComponent.formGroup) {
            return Object.keys(this.formState).map(key => ({
                title: key,
                selector: () => this.currentComponent.formGroup[this.formState[key]]
            }));
        }

        return [];
    }

    private subscriptions: Subscription[] = [];

    currentComponent: any;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    ngOnDestroy() {
        this.subscriptions.forEach(t => t.unsubscribe());
    }

    activateRoute(component: any) {
        this.currentComponent = component;
    }

    deactivateRoute(component: any) {
        console.log(component);
    }

    parse(obj) {
        if (isPrimitive(obj)) {
            return obj;
        } else {
            return Object.keys(obj).join(', ');
        }
    }
}
