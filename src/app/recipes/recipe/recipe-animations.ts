import { trigger,
         state,
         animate,
         transition,
         AnimationTriggerMetadata,
         style } from '@angular/animations';

export const transformRecipe: AnimationTriggerMetadata = trigger('transformRecipe', [
  state('extanded', style({
    width: '75%',
    height: '64px'
  })),
  state('minimized', style({
    width: '50%',
    height: '32px'
  })),
  transition('extanded <=> minimized', [
    animate('200ms ease-in-out')
  ])
]);
