import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-proj',
  templateUrl: './favorite-proj.component.html'  
})
export class FavComponent {
  public favorites: GitHubFavorites[];
  public searchString: string = "";
  private baseUrl: string = location.host; 
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {    
    this.ngOnInit();
  }

  ngOnInit() {
    this.getData();
  }
  getData() {        
    const params = new HttpParams().set('searchString', this.searchString);   
    console.log(params);
    //Pageload
     this.http.get<GitHubFavorites[]>('//' + this.baseUrl + '/api/SampleData/GetGitHubInfoAsync', { params }).subscribe(result => {
      this.favorites = result;
      console.log(result);
    }, error => console.error(error));
  }

  updateSearchString(value: string) {
    this.searchString = value;
    this.getData();
    console.log(this.searchString);
  }

  updatePage() {
    this.getData();
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
