import { Component, Input } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input()
  userDetails: UserResponse = new UserResponse;
  isHiddenNotif=true;
  isHidden=true;
  constructor(private authenticationService:AuthenticationService,private webSocketService:WebSocketService){

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

  logout(){
    this.authenticationService.logout();
    this.webSocketService.disconnect();
  }
}
