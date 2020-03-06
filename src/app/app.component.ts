import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './_root-store/root-state';
import { GithubUserSearchSelectors } from './_root-store/github-search-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'github-ngrx';
  public results$: Observable<any[]>;

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.results$ = this.store.select(
      GithubUserSearchSelectors.getGithubUserSearchStateResult
    );
  }

  search() {
    console.log('Search');
  }
}
