import { SafeUrl } from "@angular/platform-browser";
export interface FileHandle{
    file:File,
    fileName:string,
    fileSize:number,
    fileType:string,
    mediaUrl:SafeUrl,
    fileContent:string,
}