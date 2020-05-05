import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GithubUsersService } from './github-users.service';
import { HttpClient } from '@angular/common/http';
import {
  GithubSearchResults,
  GithubUserItem
} from '../_models/github-search.model';
import { of } from 'rxjs';

describe('GithubUsersService', () => {
  let service: GithubUsersService;
  const httpClientSpy = {
    get: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(GithubUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call getUserList', () => {
    const expectedUsers: GithubSearchResults = {
      items: [
        {
          id: 12346,
          login: 'John Doe',
          avatar_url: 'hello-world',
          html_url: 'hello-world'
        } as GithubUserItem
      ],
      total_count: 1,
      incomplete_results: false
    };
    httpClientSpy.get.and.returnValue(of(expectedUsers));
    service
      .getUserList('hello-word')
      .subscribe((userList) => expect(userList).toEqual(expectedUsers));
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
