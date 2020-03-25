import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GithubSearchResults } from '../_models/github-search.model';

@Injectable({
  providedIn: 'root'
})
export class GithubUsersService {
  private userListUrl = `${environment.githubUrl}/search/users`;

  constructor(private http: HttpClient) { }

  getUserList(query: string): Observable<GithubSearchResults> {
    const params = new HttpParams().set('q', query);
    return this.http.get<GithubSearchResults>(this.userListUrl, { params });
  }
}
