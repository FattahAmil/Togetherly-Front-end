import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { UserResponse } from 'src/app/model/UserResponse';
import { DecodeJwt } from 'src/app/model/DecodeJwtToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent  implements OnInit,OnDestroy {
  constructor(private userServ:UserService,private route: ActivatedRoute,private router :Router,private communicationService: CommunicationServiceService) {
    this.subscription = this.communicationService.triggerFunction3$.subscribe(() => {
      this.getNumbersOfLikesFollowersFollowing();
    });
  }
  ngOnDestroy(): void {
     this.subscription.unsubscribe();
  }
  private subscription: Subscription;
  jwtToken:any=inject(AuthenticationService).getToken();
  decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);
  userDetails: UserResponse = new UserResponse;
  userName!:string;
  userEmail!:string;
  userImage!:string;
  emailProfile!:string;
  idProfile!:string;
  firstNameProfile!:string;
  lastNameProfile!:string;
  profileImageProfile!:string;
  likes:number=0;
  followers:number=0;
  following:number=0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.emailProfile = params['email'];
    });
  
    this.getUserDetailsPost();
    
    this.getUserDetails();
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
  getNumbersOfLikesFollowersFollowing(){
    this.userServ.getNumbersOfLikesFollowersFollowing(this.idProfile).subscribe((response)=>{
        this.likes=response.body.numberOfLikes;
        this.followers=response.body.numberOfFollowers;
        this.following=response.body.numberOfFollowing;
      
    });
  }
  getUserDetailsPost(){
    this.userServ.getUserByEmail(this.emailProfile).subscribe((response)=>{
      this.idProfile=response.body.id
      this.firstNameProfile=response.body.firstName;
      this.lastNameProfile=response.body.lastName;
      this.profileImageProfile=response.body.profileImage;
      this.getNumbersOfLikesFollowersFollowing();
    })
  }

}
