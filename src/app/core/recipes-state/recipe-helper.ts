import { Recipe } from './recipes-state.interface';
import { RecipeState } from './recipe-state.enum';

const idGenerator = (function* idGen() {
  let id = 0;
  while (true) {
    yield id++;
  }
})();

export class RecipeHelper {
  static recipeFactory(): Recipe {
    return {
      id: `${idGenerator.next().value}`,
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

  static shallowClone(base: Recipe): Recipe {
    const clone: Recipe = Object.assign({}, base);
    clone.instances = base.instances.slice();
    clone.restriction = base.restriction.slice();
    clone.links = base.links.slice();
    return clone;
  }
}