import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule,
         MdCardModule,
         MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdButtonModule
  ]
})
export class SharedModule { }
