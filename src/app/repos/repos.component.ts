import { Component, OnInit } from '@angular/core';
import {Repos} from './repos';
import {GithubsearchService} from '../gitsearch.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class RepositoriesComponent implements OnInit {

  searchRepos: Repos[];
  searchName: string;
  error: boolean;

  constructor(public githubService: GithubsearchService) {
    this.searchRepos = [];
   }

  ngOnInit() {
  }

  searchRepo() {
    this.searchRepos = [];
    this.githubService.searchRepos(this.searchName).then(() => {
      this.searchRepos = this.githubService.searchedRepos;
      this.error = false;
      if (this.searchRepos.length < 1) {
        this.error = true;
      }

    }).catch(error => {
      console.log(error);
      this.error = true;
    });
  }

}
