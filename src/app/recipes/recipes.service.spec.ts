import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { RecipesService } from './recipes.service';
import { WindowRef } from '../core/window.provider';
import { stateFn } from '../core/recipes-state/recipes-state.function';
import { RecipesAction } from '../core/recipes-state/actions';

describe('RecipesService', () => {
  let service: RecipesService;
  const http: Http = new Http(null, new RequestOptions({}));

  it('Should create the service', () => {
    const actions = new Subject<RecipesAction>();
    const states = stateFn([], actions);
    service = new RecipesService(http, actions, states, new WindowRef());
    expect(service).toBeTruthy();
  })
});
