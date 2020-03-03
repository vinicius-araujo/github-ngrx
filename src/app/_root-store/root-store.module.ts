import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchUserModule } from './github-search-user/github-search-user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GithubSearchUserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
