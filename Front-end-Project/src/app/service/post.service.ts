import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://127.0.0.1:8082/posts';

   headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+inject(AuthenticationService).getToken()
   });
  

  constructor(private http: HttpClient, private router: Router) {}


  createPost(post: object): void {
    console.log(post);
    this.http.post<any>(`${this.url}/create`, post,{headers:this.headers})
      .subscribe(
        response => {
          // Handle the response here
          console.log('Request was successful:', response);
        },
        error => {
          // Handle the error here
          console.error('An error occurred:', error);
        }
      );
  }
}
