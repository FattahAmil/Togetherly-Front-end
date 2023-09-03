import { Component, Input, OnInit } from '@angular/core';
import { FollowReq } from 'src/app/model/FollowReq';
import { User } from 'src/app/model/User';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { UserService } from "src/app/service/user.service";

@Component({
  selector: 'app-show-followers',
  templateUrl: './show-followers.component.html',
  styleUrls: ['./show-followers.component.css']
})
export class ShowFollowersComponent implements OnInit {
  
  userDetails:UserResponse=new UserResponse()
  followReq:FollowReq=new FollowReq() ;
  users: any;
  constructor(private userService:UserService,private communicationService: CommunicationServiceService){
  }
  ngOnInit(): void {
    
    this.getUserDetails();
   
  }
  getUserDetails(){
    this.userService.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.getUnFollowedPerson()
      },
      (error) => {
        console.error(error);
      }
    );
  }
  followRequest(followedId:string){
    this.followReq.followed=followedId;
    this.followReq.following=this.userDetails.body.id;
    this.userService.followReq(this.followReq).subscribe(
      (response)=>{
        console.log(response);
        this.communicationService.triggerFunction2();
        this.communicationService.triggerFunction();
        this.getUnFollowedPerson()
      }
    );
   

  }

  getUnFollowedPerson(){
    this.userService.getUserNotFollwed(this.userDetails.body.id).subscribe(
      (users) => {
      this.users=users.body;
        
        console.log()

      },
      (error) => {
        console.error(error);
      }
    )
   
  }

  
}
