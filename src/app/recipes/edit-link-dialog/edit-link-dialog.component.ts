import { Component,
         OnInit,
         Input,
         Inject,
         AfterViewInit,
         ViewChildren,
         QueryList,
         ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,
         FormGroup,
         AbstractControl,
         FormArray } from '@angular/forms';
import { MdSelect,
         MD_DIALOG_DATA } from '@angular/material';

import { RecipeHelper } from '../../core/recipes-state/recipe-helper';
import { Recipe,
         LinkTask } from '../../core/recipes-state/recipes-state.interface';
import { RecipeStatus } from '../../core/recipes-state/recipe-state.enum';
import { AbstractDialogTb } from '../abstract-dialog-tb';

export interface DataInfoDialog {
  links: LinkTask[];
  recipeId: string;
}

@Component({
  selector: 'app-edit-link-dialog',
  templateUrl: './edit-link-dialog.component.html',
  styleUrls: ['./edit-link-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLinkDialogComponent implements OnInit {
  private infoForm: FormGroup;
  private payload: { links: LinkTask[] };

  constructor(@Inject(MD_DIALOG_DATA) private data: DataInfoDialog,
              private formBuilder: FormBuilder) {
    this.createForm();
    this.infoForm.valueChanges
      .subscribe(this.handleFormChanges.bind(this));
  }

  ngOnInit() {}

  get links(): FormArray {
    return this.infoForm.get('links') as FormArray;
  }

  private handleFormChanges(formValue: any): void {
    const links = formValue.links
      .map(l => l.link)
      .filter(l => l.kind != null && l.recipeId != null && !RecipeHelper.isTimeBoundaryEmpty(l.timeElapsed));
    this.payload = { links: links };
    if (formValue.links.length > 0 && this.links.controls.some(ctrl => ctrl.pristine)) { return; }
    this.links.insert(0, this.getNewLink());

  }

  private getNewLink(): FormGroup {
    const link: LinkTask = {
      timeElapsed: { min: null, target: null, max: null },
      kind: null,
      recipeId: ''
    }
    return this.formBuilder.group({
      link: link
    });
  }

  private createForm() {
    this.payload = { links: this.data.links };
    const linkFGs = this.data.links.map(link => {
      const linkForm: LinkTask = {
        timeElapsed: { min: link.timeElapsed.min, target: link.timeElapsed.target, max: link.timeElapsed.max },
        kind: link.kind,
        recipeId: link.recipeId
      };
      return this.formBuilder.group({
        link: linkForm
      });
    });
    this.infoForm = this.formBuilder.group({
      links: this.formBuilder.array(linkFGs)
    });
    this.links.insert(0, this.getNewLink());
  }

}
