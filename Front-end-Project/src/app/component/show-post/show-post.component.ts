import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { PostService } from "src/app/service/post.service";
import { UserResponse } from 'src/app/model/UserResponse';
import { UserService } from "src/app/service/user.service";
import { FollowReq } from 'src/app/model/FollowReq';
import { Subscription } from 'rxjs';
import { CommunicationServiceService } from 'src/app/service/communication-service.service';
import { PostReq } from 'src/app/model/PostReq';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit,OnDestroy {
  private subscription: Subscription;
  userDetails:UserResponse=new UserResponse()
  followReq:FollowReq=new FollowReq() ;
  idUser:string='';
  posts: any;
  Post2!:[PostReq];
  

  constructor(private postService:PostService,private userService:UserService,private communicationService: CommunicationServiceService,private sanitizer:DomSanitizer ){
    this.subscription = this.communicationService.triggerFunction$.subscribe(() => {
      this.getUserDetails();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {  
    this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.showPostUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }
showPostUser(){
     this.idUser =this.userDetails.body.id;
    this.postService.showPostAndUserDetails(this.idUser).subscribe(
      (response)=>{
        this.posts=response.body;
        console.log(response);
      });
}

ifTherIsMedia(i:number):boolean{
 return this.posts[i].mediaList.length !== 0;
}
convertImage(media: string,type:string) {
  var url = 'data:'+type+';base64,' + media;
  return url;
}
isImage(i:string):boolean{

  return i.endsWith('jpg') || i.endsWith('jpeg') || i.endsWith('png');
 }
 isVideo(i:string):boolean{
  return i.endsWith('mp4') || i.endsWith('mov') || i.endsWith('avi');
 }
pathGen(path:string){
  return"assets/media/"+path;
}
timeGenerator(date:number){
  const previousTime= new Date(date)
  const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((currentTime.getTime() - previousTime.getTime()) / 1000);
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    }if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minutes ago`;
    } if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return  `${hours} hours ago`;
    } if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    }  
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months} months ago`;
}
likePost(idPost:number){
  
  this.postService.likePost(idPost,this.idUser).subscribe(
      (response)=>{
        console.log(response);
        
      });
}
}
