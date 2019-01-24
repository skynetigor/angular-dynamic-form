import { CommonModule, JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrettyJsonModule, ɵc } from 'angular2-prettyjson';
import { DynamicFormModule } from 'dynamic-form';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule, DynamicFormModule, PrettyJsonModule],
  providers: [{ provide: JsonPipe, useClass: ɵc }],
  bootstrap: [AppComponent]
})
export class AppModule {}
