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

export enum RestrictionKind {
  Hour,
  Weekday,
  Day,
  Month
}

export enum RestrictionCondition {
  InRange,
  OutRange
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

export enum RecipeState {
  Active,
  Archive
}

export interface Recipe {
  title: string;
  state: RecipeState;
  atomic: AtomicTask;
  reccurence: TimeBoundary;
  restriction: TimeRestriction[];
  links: LinkTask[];
  isDraft: boolean;
  instances: Task[];
}

export type RecipesState = Recipe[];
