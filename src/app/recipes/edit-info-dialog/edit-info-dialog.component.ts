import { Component,
         OnInit,
         Input,
         Inject } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms';
import { MdDialogRef,
         MD_DIALOG_DATA } from '@angular/material';

export interface DataInfoDialog {
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit-info-dialog',
  templateUrl: './edit-info-dialog.component.html',
  styleUrls: ['./edit-info-dialog.component.scss']
})
export class EditInfoDialogComponent implements OnInit {
  private infoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MdDialogRef<EditInfoDialogComponent>,
              @Inject(MD_DIALOG_DATA) private data: DataInfoDialog) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.infoForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      description: this.data.description
    });
  }

}
