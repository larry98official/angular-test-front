import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../classes/user";
import {UserService} from "../services/user.service";
import {SearchText} from "../classes/searchText";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  user: User = new User(0,"");
  gitUser: any;
  gitHubRepos: any;
  langRepos: any;
  userName: string | undefined;
  reposUser: any;
  searchText: SearchText = new SearchText(0, "");
  statusCheck1 = false;
  statusCheck2 = false;
  statusCheck3 = false;
  languagesRepos: any;
  languageOneUser: any;
  languageTwoUser: any;
  languageThreeUser: any;
  i: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submitUserName() {
    this.findUser(this.user);
  }

  findUser(user: User) {
    this.userName = user.userName;

    this.userService.getGitHubUsers(this.userName)
      .subscribe(
        data => {
          this.gitUser = data;
          console.log(data);
        })

    this.userService.getGitHubRepos(this.userName)
      .subscribe(
        data => {
          this.gitHubRepos = data;

          // voy a coger solo los primeros 3 lenguajes para ponerlos como filtros
          this.languagesRepos = [];
          for (let repo of data) {
            this.languagesRepos.push(repo.language);
          }

          this.languageOneUser = this.languagesRepos[this.i];

          this.i += 1;
          this.languageTwoUser = this.languagesRepos[this.i];
          if (this.languageTwoUser == this.languageOneUser) {
            this.i += 1;
            this.languageTwoUser = this.languagesRepos[this.i];
          }
          this.languageThreeUser = this.languagesRepos[this.i + 1];
          if (this.languageTwoUser == this.languageThreeUser) {
            this.i += 1;
            this.languageThreeUser = this.languagesRepos[this.i];
          }
        })
  }

  reverseColumName() {
    return this.gitHubRepos.reverse();
  }

  filterRepo() {
    this.findRepo(this.gitHubRepos, this.searchText.textSearch);
  }

  findRepo(repos: any, textSearch: string) {

    if (textSearch == "") {
      this.reposUser = undefined;
      return this.gitHubRepos;
    }

    this.reposUser = repos.filter((value: any) => {
      return (value.name.toLocaleLowerCase().includes(textSearch));
    });
  }

  filterLang(language: string, status: boolean) {
    if (status) {
      if (this.reposUser) {
        this.findLang(this.reposUser, language).then();
      } else {
        this.findLang(this.gitHubRepos, language).then();
      }
    } else {
      if (this.reposUser) {
        this.reposUser = undefined;
        this.findRepo(this.gitHubRepos, this.searchText.textSearch);
      } else {
        this.reposUser = undefined;
        this.langRepos = undefined;
        return this.gitHubRepos;
      }
    }

  }

  async findLang(repos: any, textSearch: string) {

    if (textSearch == "") {
      return this.gitHubRepos;
    }

    if (repos == this.reposUser) {
      this.reposUser = repos.filter((value: any) => {
        return (value.language.includes(textSearch));
      });
    } else {
      this.langRepos = repos.filter((value: any) => {
        return (value.language.includes(textSearch));
      });
    }

  }

}
