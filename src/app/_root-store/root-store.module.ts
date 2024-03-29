import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchUserModule } from './github-search-user/github-search-user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { reducers } from './routing-store/reducer';
import { CustomSerializer } from './routing-store/custom-route-serializer';
import { RouterEffects } from './routing-store/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GithubSearchUserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class RootStoreModule {}
