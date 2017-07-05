import { RecipeStatus, RestrictionCondition } from './recipe-state.enum';

export interface TimeBoundary {
  target?: number;
  min?: number;
  max?: number;
}

export interface AtomicTask {
  duration?: TimeBoundary;
  start?: TimeBoundary;
  end?: TimeBoundary;
}

export interface TimeRestriction {
  condition: RestrictionCondition;
  ranges: [number, number][];
}

export interface TimeRestrictions {
  hour?: TimeRestriction;
  weekday?: TimeRestriction;
  month?: TimeRestriction;
}

export interface LinkTask {
  timeElapsed: TimeBoundary;
  kind: 'before' | 'after';
  recipeId: string;
}

export interface Task {
  start: number;
  end: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  status: RecipeStatus;
  atomic: AtomicTask;
  recurrence: TimeBoundary;
  restrictions: TimeRestrictions;
  links: LinkTask[];
  instances: Task[];
}

 export type RecipesState = Recipe[];
