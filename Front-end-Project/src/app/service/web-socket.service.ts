import { inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from './authentication.service';
import { DecodeJwt } from '../model/DecodeJwtToken';
import jwt_decode from 'jwt-decode';


const SERVER_URL = 'http://localhost:8082/connect';

export class WebSocketService {


  
stompClient!: Stomp.Client;
private isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
jwtToken:any=inject(AuthenticationService).getToken();
decodeJwt:DecodeJwt=jwt_decode(this.jwtToken);


constructor() {
    
}

connect(){
  const ws = new SockJS(SERVER_URL);
    this.stompClient = Stomp.over(ws);
     this.stompClient.connect({},this.onConnect2
    //  () => {  // Successfully connected
  
    //   // Subscribe to the acknowledgment queue to receive acknowledgment messages
    //   this.stompClient.subscribe('/user/'+this.decodeJwt.sub+"/privateMessage", (response) => {
    //       // Handle the acknowledgment message
    //       const receivedMessage = JSON.parse(response.body);
    //       console.log( receivedMessage.content);
    //   });
    // }
    ,this.onError);
}

onConnect=()=>{
  this.stompClient.subscribe('/user/'+this.decodeJwt.sub+"/privateMessage", (response) => {
    // Handle the acknowledgment message
    const receivedMessage = JSON.parse(response.body);
  });
}
onConnect2(): Observable<any> {
  return new Observable<any>((observer) => {
    this.stompClient.subscribe('/user/' + this.decodeJwt.sub + '/privateMessage', (response) => {
      // Handle the acknowledgment message
      const receivedMessage = JSON.parse(response.body);

      // Emit the received message to observers
      observer.next(receivedMessage);
    });
  });
}
onConnectNotif(): Observable<any> {
  return new Observable<any>((observer) => {
    this.stompClient.subscribe('/user/' + this.decodeJwt.sub + '/notif', (response) => {
      // Handle the acknowledgment message
      const receivedMessage = JSON.parse(response.body);

      // Emit the received message to observers
      observer.next(receivedMessage);
    });
  });
}
onError=(error:any)=>{
    console.log(error)
}


  

  sendMessageNotif(email:string,content:string){
    const ChatDtoReq={
        userEmailReceiver:email,
        content:content,

    }
    this.stompClient.send('/app/notification', {}, JSON.stringify(ChatDtoReq));
  }

  sendPrivateMessage(userFromId:string,recipientId:string,content:string,typeMessage:string){
    const privatMessage={
      userFromId:userFromId,
      recipientId:recipientId,
      content:content,
      typeMessage: typeMessage
    }
    this.stompClient.send('/app/privateMessage', {}, JSON.stringify(privatMessage));
  }



 public disconnect() {
   
    this.stompClient.disconnect(() => {
         this.stompClient.ws.close();
    });
  }


}
