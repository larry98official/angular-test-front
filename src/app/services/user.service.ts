import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiKey:string = environment.githubAPIKey;

  constructor(private http:HttpClient) {}

  getGitHubUsers(searchQuery:string):Observable<any>{
    return this.http.get<any>(`https://api.github.com/users/${searchQuery}?=${this.apiKey}`);
  }

  getGitHubRepos(searchQuery:string):Observable<any>{
    return this.http.get<any>(`https://api.github.com/users/${searchQuery}/repos?=${this.apiKey}`);
  }

}


