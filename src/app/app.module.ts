import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { ToolbarModule } from './toolbar/toolbar.module';
import { CreationModule } from './creation/creation.module';
import { RecipesModule } from './recipes/recipes.module';
import { DetailViewerModule } from './detail-viewer/detail-viewer.module';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    HttpModule,
    ToolbarModule,
    CreationModule,
    RecipesModule,
    DetailViewerModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
