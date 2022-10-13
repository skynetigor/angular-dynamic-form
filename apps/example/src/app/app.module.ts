import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DynamicFormModule } from '@skynet-ng/dynamic-form';
import { AppComponent } from './app.component';
import { TextfieldComponent } from './components';

@NgModule({
  declarations: [AppComponent, TextfieldComponent],
  imports: [
    BrowserModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
