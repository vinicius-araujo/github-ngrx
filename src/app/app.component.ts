import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './_root-store/root-state';
import {
  GithubUserSearchSelectors,
  GithubUserSearchActions
} from './_root-store/github-search-user';
import { RouteSelector } from './_root-store/routing-store';
import { Observable } from 'rxjs';
import { GithubUserItem } from './_models/github-search.model';
import {
  debounceTime,
  withLatestFrom,
  distinctUntilChanged
} from 'rxjs/operators';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'github-ngrx';
  public results$: Observable<GithubUserItem[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;
  public query$: Observable<string>;
  public routeParam$: Observable<Params>;

  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.setUpSelectors();
    this.setUpUrlLoading();
  }

  public setUpSelectors() {
    this.results$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateSuccess
    );
    this.isLoading$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateLoading
    );

    this.isLoaded$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateLoaded
    );

    this.query$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateQuery
    );

    this.routeParam$ = this.store.select(RouteSelector.getSelectedRouteParam);
  }

  public setUpUrlLoading() {
    this.routeParam$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        withLatestFrom(this.query$)
      )
      .subscribe(([queryParam, queryFromState]) => {
        const param = queryParam?.q;
        if (param && param !== queryFromState) {
          this.updateSearch({ query: param });
        }
      });
  }

  public updateSearch({ query }) {
    this.store.dispatch(
      GithubUserSearchActions.updateSearchForm({
        searchQuery: query
      })
    );
  }
}
