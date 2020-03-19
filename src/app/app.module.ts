import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RootStoreModule } from './_root-store/root-store.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultListComponent } from './components/result/result-list/result-list.component';
import { ResultItemComponent } from './components/result/result-item/result-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultListComponent,
    ResultItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    RootStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
