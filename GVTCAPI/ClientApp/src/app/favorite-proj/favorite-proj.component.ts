import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-favorite-proj',
  templateUrl: './favorite-proj.component.html'
})
export class FavComponent {
  public favorites: GitHubFavorites[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    ////Pageload
    //http.get<GitHubFavorites[]>(baseUrl + 'api/SampleData/GetGitHubInfoAsync').subscribe(result => {
    //  this.favorites = result;
    //  console.log(result);
    //}, error => console.error(error));

    this.ngOnInit(http, baseUrl);
  }

  ngOnInit(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.getData(http, baseUrl, "");
  }

  getData(http: HttpClient, @Inject('BASE_URL') baseUrl: string, searchString) {

    const params = new HttpParams().set('searchString', searchString);
    console.log(params);
    //Pageload
    http.get<GitHubFavorites[]>(baseUrl + 'api/SampleData/GetGitHubInfoAsync', { params }).subscribe(result => {
      this.favorites = result;
      console.log(result);
    }, error => console.error(error));
  }
}

interface GitHubFavorites {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  watchers: number;
  pushed_at: string;
}
