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
  Archive,
  Draft,
  New
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  state: RecipeState;
  atomic: AtomicTask;
  reccurence: TimeBoundary;
  restriction: TimeRestriction[];
  links: LinkTask[];
  instances: Task[];
}

export type RecipesState = Recipe[];

export function recipeFactory(): Recipe {
  return {
    title: '',
    description: '',
    atomic: { },
    instances: [],
    links: [],
    reccurence: {},
    restriction: [],
    state: RecipeState.New
  };
}
