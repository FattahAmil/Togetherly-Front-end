import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/model/UserResponse';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-user-page',
  templateUrl: './chat-user-page.component.html',
  styleUrls: ['./chat-user-page.component.css']
})
export class ChatUserPageComponent implements OnInit {
  userDetails: UserResponse = new UserResponse;
  usersFriends:any;
  emailProfile!:string;
  idProfile!:string;
  firstNameProfile!:string;
  lastNameProfile!:string;
  profileImageProfile!:string;
constructor(private userService:UserService,private route: ActivatedRoute,private router:Router,private CommunicationService:CommunicationServiceService){
  this.getUserDetails();
}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.emailProfile = params['email'];
    });
  }

getUserDetails(){
  this.userService.getUserToken().subscribe(
    (userData) => {
      this.userDetails = userData ;
      this.getUserFriends();
      this.getUserDetailsByUser()
    },
    (error) => {
      console.error(error);
    }
  );
}
getUserFriends(){
  this.userService.getUserFriends(this.userDetails.body.id).subscribe((response)=>{
   
    this.usersFriends=response.body;
  });
}
navigateToProfilePage(emailProfile:string) {
  this.router.navigate(['/profile', emailProfile]).then(()=>{
    location.reload()
  })    
}
navigateToChatByUser(emailUser:string){
  this.router.navigate(['/privateChat',emailUser]).then(()=>{
    location.reload()
  });
}
getUserDetailsByUser(){
  this.userService.getUserByEmail(this.emailProfile).subscribe((response)=>{
    this.idProfile=response.body.id
    this.firstNameProfile=response.body.firstName;
    this.lastNameProfile=response.body.lastName;
    this.profileImageProfile=response.body.profileImage;
    
  })
}
}
