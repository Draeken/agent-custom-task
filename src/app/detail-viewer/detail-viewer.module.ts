import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailViewerRoutingModule } from './detail-viewer-routing.module';
import { DetailViewerComponent } from './detail-viewer/detail-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    DetailViewerRoutingModule
  ],
  declarations: [DetailViewerComponent]
})
export class DetailViewerModule { }
