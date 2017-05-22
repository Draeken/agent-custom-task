import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationComponent } from './creation/creation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreationComponent],
  exports: [CreationComponent]
})
export class CreationModule { }
