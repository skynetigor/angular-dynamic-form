import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapDropdownComponent, BootstrapTextfieldComponent } from './components';

const controlsComponents = [BootstrapDropdownComponent, BootstrapTextfieldComponent];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...controlsComponents],
  exports: [...controlsComponents],
  entryComponents: [...controlsComponents]
})
export class BootstrapControlsModule {}
