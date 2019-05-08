import { Component, OnInit } from '@angular/core';
import {GithubsearchService} from '../gitsearch.service';
import {Profile} from './profiles';
import {Repos} from '../repos/repos';

@Component({
  selector: 'app-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profile: Profile;
  profileRepos: Repos[];
  searchName: string;
  error: boolean;

  constructor(private githubService: GithubsearchService) {
    this.profileRepos = [];
   }

  ngOnInit() {
    this.searchName = 'vmuchui';
    this.searchUser();

  }

  searchUser(){
    this.profile=null;
    this.profileRepos=[];
    this.githubService.getUser(this.searchName).then(()=>{
      this.profile=this.githubService.profile
      this.githubService.getUserRepos(this.searchName).then(()=>{
        this.profileRepos=this.githubService.profileRepos;
        this.error=false
        console.log(this.profileRepos);
      })
    }).catch(error=>{
      this.error=true;
      console.log(error)
    })
  }

}