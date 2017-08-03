import { Component } from '@angular/core';

import { DataIoService } from './core/data-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'Agent Custom Task';

  constructor(private dataIoService: DataIoService) {}
}
