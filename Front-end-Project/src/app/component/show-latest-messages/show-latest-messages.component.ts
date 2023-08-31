import { Component, Input } from '@angular/core';
import { UserResponse } from 'src/app/model/UserResponse';

@Component({
  selector: 'app-show-latest-messages',
  templateUrl: './show-latest-messages.component.html',
  styleUrls: ['./show-latest-messages.component.css']
})
export class ShowLatestMessagesComponent {
  @Input()
  userDetails: UserResponse = new UserResponse;
}
