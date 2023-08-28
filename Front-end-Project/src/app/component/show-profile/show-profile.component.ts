import { Component, Input, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';
import { UserService } from "src/app/service/user.service";


@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent {
 @Input()
  userDetails: UserResponse = new UserResponse;

 

}
