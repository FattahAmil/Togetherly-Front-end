import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/FileHandle';
import { post } from 'src/app/model/Post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private sanitizer:DomSanitizer){}
 post:post={
  content:"",
  isEvent:false,
  media:[]
 }

 onMediaSelected(event:any){
  if (event.target.files) {
    const file=event.target.files[0];
    const fileHandle:FileHandle={
      file:file,
      url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
    };
    this.post.media.push(fileHandle);
  }
 }
 removeMedia(i:number){
   console.log(this.post.media[i].file.type)
  this.post.media.splice(i,1);
 
 }
 
 isImage(i:number):boolean{
  const url = this.post.media[i].file.type;
  return url.endsWith('jpg') || url.endsWith('jpeg') || url.endsWith('png');
 }

 isVideo(i:number):boolean{
  const url = this.post.media[i].file.type;
  return url.endsWith('mp4') || url.endsWith('mov') || url.endsWith('avi');
 }
}
