import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/model/UserResponse';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isAllRead=false
  userDetails: UserResponse = new UserResponse;
  isHiddenNotif=true;
  isHidden=true;
  notifications:any;
  private connectObservable!: Observable<any>;

  constructor(private authenticationService:AuthenticationService,private router: Router,private userServ:UserService,private webSocketService:WebSocketService,private notificationService :NotificationService){
  }
  ngOnInit(): void {
    this.getUserDetails();
    this.webSocketService.connect();
    setTimeout(() => {
      this.webSocketService.onConnectNotif().subscribe(response=>{
        this.showNotification();
      });
    }, 700);
    
  }
  getUserDetails(){
    this.userServ.getUserToken().subscribe(
      (userData) => {
        this.userDetails = userData ;
        this.showNotification();
      
      },
      (error) => {
        console.error(error);
      }
    );
  }
  dropDownMenue(){
    if (this.isHidden==true) {
      this.isHidden=false;
      return;
    }
    
    this.isHidden=true;
   
  }
  dropDownMenueNotif(){
    if (this.isHiddenNotif==true) {
      this.isHiddenNotif=false;
      return;
    }
    
    this.isHiddenNotif=true;
   
  }

  showNotification(){

      this.notificationService.showPostAndUserDetails(this.userDetails.body.id).subscribe((response)=>{
        this.notifications=response.body;
        let i=0
        this.notifications.forEach(() => {
          if (this.notifications[i].isRead==false) {
            this.isAllRead=true;
          }
          i++;
        });
      })
  }
  isMessage(type:string){
    if (type==="MESSAGE") {
      return true;
    }
    return false;
  }
  isComment(type:string){
    if (type==="COMMENT") {
      return true;
    }
    return false;
  }
  isLike(type:string){
    if (type==="LIKE") {
      return true;
    }
    return false;
  }
  isFollow(type:string){
    if (type==="FOLLOW") {
      return true;
    }
    return false;
  }
  isRead(read:boolean){
      if (read==true) {
        return true;
      }
      return false;
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
  navigateToProfilePage(emailProfile:string,idPost:number,idUserFrom:string,idRecepeint:string,type:string) {
    if (emailProfile!=null) {
      if(type=="FOLLOW"){
      this.router.navigate(['profile', emailProfile]);
            this.funcRead(idUserFrom,idRecepeint,type,idPost);
            setTimeout(() => {
              location.reload()
            }, 50);
            return;
      }
      this.router.navigate(['privateChat', emailProfile]);
            this.funcRead(idUserFrom,idRecepeint,type,idPost);
            setTimeout(() => {
              location.reload()
            }, 50);
            return;
      
    }
     this.router.navigate(['post', idPost]);
     this.funcRead(idUserFrom,idRecepeint,type,idPost);
     setTimeout(() => {
      location.reload()
     }, 50);
     
  }

  funcRead(idUserFrom:string,idRecepeint:string,type:string,idpost:number){
   this.notificationService.funcRead(idRecepeint,idUserFrom,type,idpost).subscribe((respons)=>{
   
    });
   
     
  }
  

  logout(){
    this.authenticationService.logout();
    this.webSocketService.disconnect();
  }
}
