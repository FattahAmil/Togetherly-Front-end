import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/FileHandle';
import { Post } from 'src/app/model/Post';
import { UserResponse } from 'src/app/model/UserResponse';
import { PostService } from "src/app/service/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private sanitizer:DomSanitizer,private postService:PostService){}
 post:Post={
  content:"",
  id:"",
  isEvent:false,
  mediaList:[]
 }
 fileData:any;
 @Input()
 userDetails: UserResponse = new UserResponse;

 onMediaSelected(event:any){
  if (event.target.files) {
    const file=event.target.files[0];
    const reader = new FileReader();
         
    reader.onload= (e) => {
      this.fileData=reader.result
   
    };
    reader.readAsText(file);
    const fileHandle:FileHandle={
      file: file,
      mediaUrl: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
      fileContent:window.URL.createObjectURL(file),
    };
    this.post.mediaList.push(fileHandle);
    console.log(this.post);
  }
 }

onCreate(){
  this.post.id=this.userDetails.body.id;
  console.log();
  
  this.postService.createPost(this.post);
}


 removeMedia(i:number){
   console.log(this.post.mediaList[i].file.type)
  this.post.mediaList.splice(i,1);
 
 }
 
 isImage(i:number):boolean{
  const url = this.post.mediaList[i].file.type;
  return url.endsWith('jpg') || url.endsWith('jpeg') || url.endsWith('png');
 }

 isVideo(i:number):boolean{
  const url = this.post.mediaList[i].file.type;
  return url.endsWith('mp4') || url.endsWith('mov') || url.endsWith('avi');
 }
}
