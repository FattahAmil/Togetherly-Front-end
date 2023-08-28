import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/service/user.service";
import { UserResponse } from 'src/app/model/UserResponse';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  constructor(private userServ:UserService) {
  }
   userDetails: UserResponse = new UserResponse;
   userName!:string;
   userEmail!:string;
   userImage!:string;
  ngOnInit() {
    this.getUserDetails()
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

}
