import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'simple-form-without-renderer', pathMatch: 'prefix' },
            {
                path: 'simple-form-native-approach',
                loadChildren: './modules/simple-form-native-approach/simple-form-native-approach.module#SimpleFormNativeApproachModule'
            },
            {
                path: 'simple-form-without-renderer',
                loadChildren: './modules/simple-form-without-renderer/simple-form-without-renderer.module#SimpleFormWithoutRendererModule'
            },
            { path: 'simple-form', loadChildren: './modules/simple-form/simple-form.module#SimpleFormModule' },
            {
                path: 'simple-form-ng-temlate',
                loadChildren: './modules/simple-form-ng-template/simple-form-ng-template.module#SimpleFormNgTemplateModule'
            },
            {
                path: 'simple-form-with-controls-styling',
                loadChildren:
                    './modules/simple-form-with-controls-styling/simple-form-with-controls-styling.module#SimpleFormWithControlsStylingModule'
            },
            {
                path: 'forms-from-server',
                loadChildren: './modules/forms-from-server/forms-from-server.module#FormsFromServerModule'
            },
            {
                path: 'simple-form-with-inputs-binder-directive',
                loadChildren:
                    './modules/simple-form-with-inputs-binder-directive/simple-form-with-inputs-binder-directive.module#SimpleFormWitInputsBinderModule'
            },
            {
                path: 'dynamic-form-wizard',
                loadChildren: './modules/wizard/wizard.module#WizardModule'
            },
            {
                path: 'live-json-renderer',
                loadChildren: './modules/live-json-renderer/live-json-renderer.module#LiveJsonRendererModule'
            }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'simple-form-without-renderer' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
