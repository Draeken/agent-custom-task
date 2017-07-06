import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule,
         MdCardModule,
         MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipeIdPipe } from './recipe-id.pipe';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    RecipeIdPipe
  ],
  exports: [
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdButtonModule,
    FlexLayoutModule,
    RecipeIdPipe
  ]
})
export class SharedModule { }
