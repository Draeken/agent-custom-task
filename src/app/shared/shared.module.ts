import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule,
         MdCardModule,
         MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdButtonModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
