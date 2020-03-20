import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GithubUserSearchStateEffects } from './effects';
import { reducer } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('githubUserSearch', reducer),
    EffectsModule.forFeature([GithubUserSearchStateEffects])
  ]
})
export class GithubSearchUserModule { }
