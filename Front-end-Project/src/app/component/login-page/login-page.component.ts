import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule   } from '@angular/forms';
import { Router } from "@angular/router";
import {AuthenticationService} from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(
    private AuthenticationService:AuthenticationService,
    private router: Router
    ){}
    ngOnInit(): void {
      this.form = new FormGroup({
        'email':new FormControl(null,[Validators.required]),
        'password':new FormControl(null,[Validators.required]),
      })
    }
    form!:FormGroup;
  registerPage(){
    this.router.navigate(['register']);
  }
  onLogin(){
    let user = {
      email:this.form.get('email')?.value,
      password:this.form.get('password')?.value,
    } 
    this.AuthenticationService.login(user).subscribe(
      (data) => {
          console.log(data);
          
      },
      (error) => {
          console.error("An error occurred:", error);
          // Handle the error, show an error message, etc.
      }
  );
  }

}
