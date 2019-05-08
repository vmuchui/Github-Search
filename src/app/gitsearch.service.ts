import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Profile} from './profiles/profiles';
import {Repos} from './repos/repos';

interface RepositoriesInterface {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
}

interface Repo {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  forks: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubsearchService {

  GitHubApiKey: string = environment.GitHubApiKey;

  profile: Profile;
  profileRepos: Repos[];
  searchedRepos: Repos[];

  constructor(private http: HttpClient) {
    this.profileRepos = [];
    this.searchedRepos = [];

  }

  getUser(username: string) {

    interface  ProfileInterface {
      login: string;
      avatar_url: string;
      html_url: string;
      name: string;
      email: string;
      public_repos: number;
      followers: number;
      following: number;
    }

    let promise = new Promise((resolve, reject) => {
      let url = 'https://api.github.com/users/' + username + '?access_token=' + this.GitHubApiKey;
      this.http.get<ProfileInterface>(url).toPromise().then(
        res => {
          this.profile = new Profile(res.login, res.avatar_url, res.html_url, res.name, res.email, res.followers, res.following);
          resolve();
        },
        error => {
          console.log(error);
          reject();
        }
      );
    });
    return promise;
  }

  getUserRepos(username: string) {
    let promise = new Promise((resolve, reject) => {
      let url= 'https://api.github.com/users/' + username + '/repos?access_token=' + this.GitHubApiKey;
      this.http.get<Repo[]>(url).toPromise().then(
        res => {
          this.profileRepos = [];
          if (res.length > 0) {
            for(var i=0; i<res.length;i++) {
              this.profileRepos.push(
                new Repos(res[i].name, res[i].html_url, res[i].description, res[i].stargazers_count,
                  res[i].language, res[i].forks
                  )
              );
            }
          }
          resolve();
        },
        error => {
          console.log(error);
          this.profileRepos = [];
          reject();
        }
      );
    });
    return promise;

  }

  searchRepos(query: string) {
    let promise = new Promise((resolve, reject) => {
      let url = 'https://api.github.com/search/repositories?q=' + query + '&access_token=' + this.GitHubApiKey;
      this.http.get<RepositoriesInterface>(url)
      .toPromise().then(
        res => {
          console.log(res);
          this.searchedRepos = [];
          if (res.total_count > 0) {
            for (var i = 0; i < res.items.length; i++) {
              console.log(i);
              this.searchedRepos.push(
                new Repos(res.items[i].name, res.items[i].html_url, res.items[i].description, res.items[i].stargazers_count,
                  res.items[i].language, res.items[i].forks
                  )
              );
            }
          }
          resolve();
        },
        error => {
          console.log(error);
          this.searchedRepos = [];
          reject();
        }
      );
    });
    return promise;
  }

}
