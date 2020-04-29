import { Component, OnInit, Input } from '@angular/core';
import { GithubUserItem } from 'src/app/_models/github-search.model';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/_root-store/root-state';
import { GithubUserSearchActions } from 'src/app/_root-store/github-search-user';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() results: GithubUserItem[];
  @Input() isLoading: boolean;
  @Input() query: string;

  public loadingArray = new Array(4).fill('loading');

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}

  public trackByUser(index: any, user: GithubUserItem) {
    return user ? user.id : index;
  }

  public clearSearch() {
    this.store.dispatch(GithubUserSearchActions.resetState());
  }
}
