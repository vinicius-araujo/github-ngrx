import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './_root-store/root-state';
import { GithubUserSearchSelectors, GithubUserSearchActions } from './_root-store/github-search-user';
import { Observable } from 'rxjs';
import { GithubUserItem } from './_models/github-search.model';

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

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.results$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateSuccess
    );
    this.isLoading$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateLoading
    );

    this.isLoaded$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateLoaded
    );
  }

  updateSearch({ query }) {
    this.store.dispatch(
      GithubUserSearchActions.updateSearchForm({
        searchQuery: query
      })
    );
  }
}
