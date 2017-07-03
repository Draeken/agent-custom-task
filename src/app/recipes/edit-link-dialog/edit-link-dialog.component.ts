import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-edit-link-dialog',
  templateUrl: './edit-link-dialog.component.html',
  styleUrls: ['./edit-link-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLinkDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
