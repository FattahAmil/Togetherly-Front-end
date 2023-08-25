import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule   } from '@angular/forms';
import { Router } from "@angular/router";
import { Response } from 'src/app/model/Response';
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
    isAlert:boolean=false;

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
      (response) => {
        const data = response as Response;
        const toast = document.getElementById("toast");
        const message ='<div class="p-4 border-l-4 border-red-500 rounded-r-xl bg-red-50"><div class="flex"><div class="flex-shrink-0"><svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><div class="text-sm text-red-600"><p>'+data.body+'</p></div></div></div></div>';
          
        if (data.statusCodeValue === 200) {
              this.router.navigate(['login']);
          }
        if (toast) {
          toast.classList.remove("hidden");
          toast.innerHTML += message;
          setTimeout(() => {
            toast.classList.add("hidden");
        }, 3000);

        }
      },
      (error) => {
          console.error("An error occurred:", error);
          // Handle the error, show an error message, etc.
      }
  );  
  }
}
