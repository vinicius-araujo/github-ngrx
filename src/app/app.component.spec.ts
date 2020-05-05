import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
  flush
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ResultItemComponent } from './components/result/result-item/result-item.component';
import { ResultListComponent } from './components/result/result-list/result-list.component';
import { of, Observable } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const testStore = {
    select: jasmine.createSpy(),
    dispatch: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchFormComponent,
        ResultListComponent,
        ResultItemComponent
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();
  }));

  beforeEach(() => {
    testStore.select.and.returnValue(new Observable());
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dispatch when form submitted', () => {
    component.updateSearch({ query: 'Test' });
    expect(testStore.dispatch).toHaveBeenCalled();
  });

  it('should update Search form when URL has queryparam', fakeAsync(() => {
    const spy = spyOn(component, 'updateSearch');
    component.routeParam$ = of({ q: 'Hello-Word' });
    component.query$ = of('John Doe');
    component.setUpUrlLoading();
    tick(200);
    expect(spy).toHaveBeenCalled();
  }));

  it('should not update Search form when URL has the same queryparam as query state', fakeAsync(() => {
    const spy = spyOn(component, 'updateSearch');
    component.routeParam$ = of({ q: 'John Doe' });
    component.query$ = of('John Doe');
    component.setUpUrlLoading();
    tick(200);
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should not update Search form when URL has queryparam null', fakeAsync(() => {
    const spy = spyOn(component, 'updateSearch');
    component.routeParam$ = of(null);
    component.query$ = of('John Doe');
    component.setUpUrlLoading();
    tick(200);
    expect(spy).not.toHaveBeenCalled();
  }));
});
