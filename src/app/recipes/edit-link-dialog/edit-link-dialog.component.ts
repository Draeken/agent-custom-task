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

import { Recipe,
         LinkTask } from '../../core/recipes-state/recipes-state.interface';
import { RecipeStatus } from '../../core/recipes-state/recipe-state.enum';
import { AbstractDialogTb } from '../abstract-dialog-tb';

export interface DataInfoDialog {
  links: LinkTask[];
}

@Component({
  selector: 'app-edit-link-dialog',
  templateUrl: './edit-link-dialog.component.html',
  styleUrls: ['./edit-link-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLinkDialogComponent extends AbstractDialogTb implements OnInit, AfterViewInit {
  private infoForm: FormGroup;
  private selectedKind = 1;
  private delayKinds: { value: string, view: string }[];
  private units = [
    { value: 1000 * 60, view: 'min' },
    { value: 1000 * 3600, view: 'hour' },
    { value: 1000 * 3600 * 24, view: 'day' },
    { value: 1000 * 3600 * 24 * 7, view: 'week' },
    { value: 1000 * 60 * 43800, view: 'month' },
    { value: 1000 * 60 * 525600, view: 'year' },
  ];

  @ViewChildren(MdSelect) selects: QueryList<MdSelect>;

  constructor(@Inject(MD_DIALOG_DATA) private data: DataInfoDialog,
              formBuilder: FormBuilder) {
    super(formBuilder);
    this.createForm();
    this.infoForm.valueChanges
      .startWith({ links: [] })
      .subscribe(this.handleFormChanges.bind(this));
    this.delayKinds = [
      { value: 'before', view: 'before' },
      { value: 'after', view: 'after' },
    ];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setSelectsToDefault();
  }

  get links(): FormArray {
    return this.infoForm.get('links') as FormArray;
  }

  private handleFormChanges(formValue: DataInfoDialog): void {
    if (formValue.links.length > 0 && this.links.controls.some(ctrl => ctrl.dirty)) { return; }
    this.links.insert(0, this.getNewLink());
  }

  private getNewLink(): FormGroup {
    return this.formBuilder.group({
      timeElapsed: this.timeBoundaryGroup({}),
      kind: null,
      recipeId: ''
    });
  }

  private displayRecipeOpt(recipeOpt: Recipe): string {
    return recipeOpt.title;
  }

  private setSelectsToDefault(): void {
    setTimeout(() => {
      this.selects.forEach((select: MdSelect) => select.writeValue(this.kinds[1].value));
    }, 0);
  }

  private createForm() {
    const linkFGs = this.data.links.map(link => this.formBuilder.group({
      timeElapsed: this.timeBoundaryGroup(link.timeElapsed),
      kind: link.kind,
      recipeId: link.recipeId
    }));
    this.infoForm = this.formBuilder.group({
      links: this.formBuilder.array(linkFGs)
    });
  }

}
