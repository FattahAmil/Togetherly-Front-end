import { Component, Input } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input()
  userDetails: UserResponse = new UserResponse;
  isHidden=true;
  constructor(private authenticationService:AuthenticationService){

  }
  dropDownMenue(){
    if (this.isHidden==true) {
      this.isHidden=false;
      return;
    }
    
    this.isHidden=true;
   
  }

  logout(){
    this.authenticationService.logout()
  }
}
