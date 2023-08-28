import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Response } from '../model/Response';
import { AuthenticationService } from "./authentication.service";
import jwt_decode from 'jwt-decode';
import { DecodeJwt } from "../model/DecodeJwtToken";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://127.0.0.1:8082/User';


  constructor(private http: HttpClient, private router: Router,private authService:AuthenticationService) {}
  
  getUserToken(): Observable<any>{
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      const decodeJwt: DecodeJwt = jwt_decode(token);
      const email: string = decodeJwt.sub;
     return this.http.get<any>(`${this.url}/email/` + email)
    }
    return of(null);
  }
  
}