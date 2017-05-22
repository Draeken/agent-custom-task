import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-detail-viewer',
  templateUrl: './detail-viewer.component.html',
  styleUrls: ['./detail-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
