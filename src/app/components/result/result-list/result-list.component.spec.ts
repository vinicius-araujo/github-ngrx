import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from './result-list.component';
import { Store } from '@ngrx/store';
import { GithubUserItem } from 'src/app/_models/github-search.model';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;
  const testStore = {
    select: jasmine.createSpy(),
    dispatch: jasmine.createSpy()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultListComponent],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a User when trackByUser is called', () => {
    const userId = component.trackByUser(1, {
      id: 12346,
      login: 'John Doe',
      avatar_url: 'hello-world',
      html_url: 'hello-world'
    } as GithubUserItem);
    expect(userId).toBe(12346);
  });

  it('should return a index when trackByUser is called with no User', () => {
    const userId = component.trackByUser(1, null);
    expect(userId).toBe(1);
  });

  it('should set results', () => {
    const fakeResult = [
      {
        id: 12346,
        login: 'John Doe',
        avatar_url: 'hello-world',
        html_url: 'hello-world'
      } as GithubUserItem
    ];
    component.results = fakeResult;
    expect(component.results).toBe(fakeResult);
  });

  it('should clear search', () => {
    component.clearSearch();
    expect(testStore.dispatch).toHaveBeenCalled();
  });

  it('should set isLoading', () => {
    const fakeBoolean = true;
    component.isLoading = fakeBoolean;
    expect(component.isLoading).toBe(fakeBoolean);
  });
});
