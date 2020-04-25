import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "./_root-store/root-state";
import {
  GithubUserSearchSelectors,
  GithubUserSearchActions,
} from "./_root-store/github-search-user";
import { RouteSelector } from "./_root-store/routing-store";
import { Observable } from "rxjs";
import { GithubUserItem } from "./_models/github-search.model";
import { debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public title = "github-ngrx";
  public results$: Observable<GithubUserItem[]>;
  public isLoading$: Observable<boolean>;
  public isLoaded$: Observable<boolean>;

  constructor(private store: Store<RootState>, private router: Router) {}

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

    this.store
      .select(RouteSelector.getSelectedRouteParam)
      .pipe(debounceTime(200))
      .subscribe((queryParam) => {
        const param = queryParam?.q;
        if (param) {
          this.updateSearch({ query: param });
        }
      });
  }

  updateSearch({ query }) {
    this.store.dispatch(
      GithubUserSearchActions.updateSearchForm({
        searchQuery: query,
      })
    );
  }
}
