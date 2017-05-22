import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MdSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdSidenavModule
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded, import it in the AppModule only. ${parentModule}`);
    };
  }

}
