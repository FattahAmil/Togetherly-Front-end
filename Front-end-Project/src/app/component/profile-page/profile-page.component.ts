import { Component, OnInit, inject } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { UserResponse } from 'src/app/model/UserResponse';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent  implements OnInit {
  constructor(private userServ:UserService,private route: ActivatedRoute) {
  }
  jwtToken:any=inject(AuthenticationService).getToken();
  decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);
  userDetails: UserResponse = new UserResponse;
  userName!:string;
  userEmail!:string;
  userImage!:string;
  emailProfile!: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.emailProfile = +params['email'];
    });
    this.getUserDetails()
    
  }
  checkRoleAdminTeacher(){
    return (this.decodeJwt.roles[0] =='ROLE_ADMIN' || this.decodeJwt.roles[0] == 'ROLE_TEACHER');
  }

  getUserDetails(){
    this.userServ.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.userName=this.userDetails.body.userName;
        this.userEmail=this.userDetails.body.email;
        this.userImage=this.userDetails.body.profileImage

      },
      (error) => {
        console.error(error);
      }
    );
  }

}
