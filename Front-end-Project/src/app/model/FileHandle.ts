import { SafeUrl } from "@angular/platform-browser";
export interface FileHandle{
    file:File,
    mediaUrl:SafeUrl,
    fileContent:string,
}