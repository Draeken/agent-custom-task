import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailViewerComponent } from './detail-viewer/detail-viewer.component';

const routes: Routes = [
  { path: 'details', component: DetailViewerComponent, outlet: 'details' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailViewerRoutingModule { }
