import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from './authentication.service';
import { DecodeJwt } from '../model/DecodeJwtToken';
import jwt_decode from 'jwt-decode';


const SERVER_URL = 'http://localhost:8082/connect';

export class WebSocketService {


  
stompClient: Stomp.Client;
private isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
jwtToken:any=inject(AuthenticationService).getToken();
decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);


constructor() {
    const ws = new SockJS(SERVER_URL);
    this.stompClient = Stomp.over(ws);
    this.onConnected = this.onConnected.bind(this);
    this.stompClient.connect({}, () => {
      // Successfully connected
  
      // Subscribe to the acknowledgment queue to receive acknowledgment messages
      this.stompClient.subscribe('/user/'+this.decodeJwt.sub+"/privateMessage", (response) => {
          // Handle the acknowledgment message
          const receivedMessage = JSON.parse(response.body);
          console.log( receivedMessage.content);
      });
    });
}


onError=(error:any)=>{
    console.log(error)
}
onConnected(){
   
    this.stompClient.subscribe("/user/"+this.decodeJwt.sub+"/privateMessage",this.onPrivateMessageReceived)
}
onPrivateMessageReceived(response: any) {
    
    let responseData = JSON.parse(response.body);
    
}

  

  sendMessage(email:string,content:string){
    const ChatDtoReq={
        userEmailReceiver:email,
        content:content
    }
    this.stompClient.send('/app/privateMessage', {}, JSON.stringify(ChatDtoReq));
  }



 public disconnect() {
   
    this.stompClient.disconnect(() => {
         this.stompClient.ws.close();
      console.log('You are disconnected');
    });
  }


}
