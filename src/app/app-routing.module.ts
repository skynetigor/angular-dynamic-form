import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'simple-form-without-renderer', pathMatch: 'prefix' },
      {
        path: 'simple-form-without-renderer',
        loadChildren:
          './modules/simple-form-without-renderer/simple-form-without-renderer.module#SimpleFormWithoutRendererModule'
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
