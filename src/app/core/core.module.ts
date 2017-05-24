import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { recipesStateAndDispatcherProvider } from './recipes-state/state-dispatcher.provider';
import { WindowRef } from './window.provider';
import { UserService } from './user.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MdSidenavModule
  ],
  providers: [
    ...recipesStateAndDispatcherProvider,
    WindowRef,
    UserService
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded, import it in the AppModule only. ${parentModule}`);
    };
  }

}
