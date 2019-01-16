import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRendererModule as DynamicFormModule } from 'dynamic-form';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DynamicFormModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
