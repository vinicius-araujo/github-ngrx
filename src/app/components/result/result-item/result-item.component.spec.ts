import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultItemComponent } from './result-item.component';
import { GithubUserItem } from 'src/app/_models/github-search.model';

describe('ResultItemComponent', () => {
  let component: ResultItemComponent;
  let fixture: ComponentFixture<ResultItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 12346,
      login: 'John Doe',
      avatar_url: 'hello-world',
      html_url: 'hello-world'
    } as GithubUserItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
