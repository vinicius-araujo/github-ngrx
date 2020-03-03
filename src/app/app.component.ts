import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { RootState } from './_root-store/root-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'github-ngrx';

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.store.select<any>('githubUserSearch').subscribe(st => {
      console.log(st);
    });
  }

  search() {
    console.log('Search');
  }
}
