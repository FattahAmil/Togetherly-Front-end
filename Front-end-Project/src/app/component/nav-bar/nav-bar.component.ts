import { Component, Input } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input()
  userDetails: UserResponse = new UserResponse;
}
