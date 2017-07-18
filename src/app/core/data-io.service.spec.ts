import { Subject } from 'rxjs/Subject';

import { DataIoService } from './data-io.service';
import { RecipesAction } from './recipes-state/actions';
import { stateFn } from './recipes-state/recipes-state.function';

describe('DataIoService', () => {
  let service: DataIoService;

  it('Should create the service', () => {
    const actions = new Subject<RecipesAction>();
    const states = stateFn([], actions);
    service = new DataIoService(actions, states);
    expect(service).toBeTruthy();
  })
});
