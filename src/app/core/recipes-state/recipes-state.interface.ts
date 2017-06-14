import { RecipeStatus, RestrictionCondition, RestrictionKind } from './recipe-state.enum';

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
  kind: RestrictionKind;
  condition: RestrictionCondition;
  ranges: number[];
}

export interface LinkTask {
  timeElapsed: TimeBoundary;
  kind: 'before' | 'after';
  recipeTitle: string;
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
  reccurence: TimeBoundary;
  restriction: TimeRestriction[];
  links: LinkTask[];
  instances: Task[];
}

 export type RecipesState = Recipe[];
