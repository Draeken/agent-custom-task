import { Component,
         OnInit,
         Input,
         Output } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
  infoForm: FormGroup;

  @Input() title: string;

  @Input() description: string;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.infoForm = this.formBuilder.group({
      title: [this.title],
      description: this.description
    })
  }

}
