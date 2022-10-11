import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'simple-form-without-renderer', pathMatch: 'prefix' },
            {
                path: 'simple-form-native-approach',
                loadChildren: () => import('./modules/simple-form-native-approach/simple-form-native-approach.module').then(x => x.SimpleFormNativeApproachModule)
            },
            {
                path: 'simple-form-without-renderer',
                loadChildren: () => import('./modules/simple-form-without-renderer/simple-form-without-renderer.module').then(x => x.SimpleFormWithoutRendererModule)
            },
            { path: 'simple-form', loadChildren: () => import('./modules/simple-form/simple-form.module').then(x => x.SimpleFormModule) },
            {
                path: 'simple-form-ng-temlate',
                loadChildren: () => import('./modules/simple-form-ng-template/simple-form-ng-template.module').then(x => x.SimpleFormNgTemplateModule)
            },
            {
                path: 'simple-form-with-controls-styling',
                loadChildren: () => import('./modules/simple-form-with-controls-styling/simple-form-with-controls-styling.module').then(x => x.SimpleFormWithControlsStylingModule)
            },
            // {
            //     path: 'forms-from-server',
            //     loadChildren: () => import('./modules/forms-from-server/forms-from-server.module').then(x => x.FormsFromServerModule)
            // },
            {
                path: 'simple-form-with-inputs-binder-directive',
                loadChildren: () => import('./modules/simple-form-with-inputs-binder-directive/simple-form-with-inputs-binder-directive.module').then(x => x.SimpleFormWitInputsBinderModule)
            },
            // {
            //     path: 'dynamic-form-wizard',
            //     loadChildren: () => import('./modules/wizard/wizard.module').then(x => x.WizardModule)
            // },
            {
                path: 'live-json-renderer',
                loadChildren: () => import('./modules/live-json-renderer/live-json-renderer.module').then(x => x.LiveJsonRendererModule)
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
