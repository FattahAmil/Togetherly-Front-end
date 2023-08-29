import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/Post';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://127.0.0.1:8082/posts';

  constructor(private http: HttpClient, private router: Router) {}

  createPost(post: object): void {
    console.log(post);
    this.http.post<any>(`${this.url}/create`, post)
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
