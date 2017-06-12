import { trigger,
         state,
         animate,
         transition,
         AnimationTriggerMetadata,
         style } from '@angular/animations';

export const transformation: AnimationTriggerMetadata = trigger('inputState', [
  state('in', style({
    opacity: 1,
  })),
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('300ms ease-in-out')
  ])
]);
