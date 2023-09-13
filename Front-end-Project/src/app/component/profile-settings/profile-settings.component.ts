import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  emailProfile!:string;
  userDetails:any;
  isLoading=false
  constructor(private route: ActivatedRoute,private router :Router,private userService:UserService){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emailProfile = params['email'];
    });
    this.getInfoUser();
    
  }
  getInfoUser(){
    this.userService.getUserByEmail(this.emailProfile).subscribe(response=>{
      this.userDetails=response.body
      setTimeout(() => {
      this.isLoading=true
    }, 500);
    })
  }

}
