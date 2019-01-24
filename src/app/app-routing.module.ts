import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'simple-form', pathMatch: 'prefix' },
      { path: 'simple-form', loadChildren: './modules/simple-form/simple-form.module#SimpleFormModule' },
      {
        path: 'simple-form-ng-temlate',
        loadChildren: './modules/simple-form-ng-template/simple-form-ng-template.module#SimpleFormNgTemplateModule'
      }
    ]
  }
  // { path: '**', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
