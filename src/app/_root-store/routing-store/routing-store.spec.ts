import * as fromReducers from './reducer';
import * as fromActions from './actions';
import * as fromState from './state';
import * as fromSelectors from './selector';
import { StoreModule, Store } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from 'src/app/_models/router-state-url';
import { RootState } from '../root-state';
import { TestBed } from '@angular/core/testing';

describe('Reducers and States', () => {
  const initialState: RouterReducerState<RouterStateUrl> = {
    navigationId: 1,
    state: {
      params: null,
      queryParams: null,
      url: null
    }
  };
  it('should return the default State from a undefined Reducer', () => {
    const action = {} as any;
    const state = fromReducers.reducers.router(initialState, action);
    expect(state).toBe(initialState);
  });
});

import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { RouterEffects } from './effects';
import { Actions } from '@ngrx/effects';
import { Location } from '@angular/common';

@Component({
  template: ''
})
export class SimpleCmp {}

describe('Selectors and effects', () => {
  let store: Store<RootState>;
  let router: Router;
  let effects: RouterEffects;
  let actions$: Observable<any>;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterEffects,
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(),
            state: { url: 'test', queryParams: { q: 't' } }
          }
        },
        {
          provide: Location,
          useValue: { back: jasmine.createSpy(), forward: jasmine.createSpy() }
        }
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'list',
            component: SimpleCmp
          }
        ]),
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromState.routerStareKey, fromReducers.reducers)
      ]
    });

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    effects = TestBed.inject(RouterEffects);
    actions$ = TestBed.inject(Actions);
    location = TestBed.inject(Location);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('Should test Selector', () => {
    let result: any;
    store.select(fromSelectors.getSelectedRouteParam).subscribe((value) => {
      result = value;
    });
    expect(result).toBeUndefined();
  });

  it('Should use Router navigate and call navigate$ effect', (done: any) => {
    const action = fromActions.GO({
      path: ['list'],
      query: { q: 'hello' }
    });

    actions$ = of(action);

    effects.navigate$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(
        ['list'],
        jasmine.objectContaining({})
      );
      done();
    });
  });

  it('Should use Location and call navigateBack$ effect', (done: any) => {
    const action = fromActions.BACK();

    actions$ = of(action);

    effects.navigateBack$.subscribe(() => {
      expect(location.back).toHaveBeenCalled();
      done();
    });
  });

  it('Should use Location and call navigateForward$ effect', (done: any) => {
    const action = fromActions.FORWARD();

    actions$ = of(action);

    effects.navigateForward$.subscribe(() => {
      expect(location.forward).toHaveBeenCalled();
      done();
    });
  });
});
