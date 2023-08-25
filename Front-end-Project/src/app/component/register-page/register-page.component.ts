import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule   } from '@angular/forms';
import { Router } from "@angular/router";
import {AuthenticationService} from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  constructor(
    private AuthenticationService:AuthenticationService,
    private router: Router
    ){}
    ngOnInit(): void {
      this.form = new FormGroup({
        'firstName':new FormControl(null,[Validators.required]),
        'lastName':new FormControl(null,[Validators.required]),
        'email':new FormControl(null,[Validators.required]),
        'password':new FormControl(null,[Validators.required]),
      })
    }
    form!:FormGroup;

  loginPage(){
    this.router.navigate(['login']);
  }

  onRegister(){
    let user = {
      firstName:this.form.get('firstName')?.value,
      lastName:this.form.get('lastName')?.value,
      email:this.form.get('email')?.value,
      password:this.form.get('password')?.value,
    } 
    this.AuthenticationService.register(user).subscribe(
      (data) => {
          console.log(data);
          this.loginPage();
      },
      (error) => {
          console.error("An error occurred:", error);
          // Handle the error, show an error message, etc.
      }
  );
  }
}
