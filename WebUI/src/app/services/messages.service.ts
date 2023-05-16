import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message!: String;
  constructor() { }

  showMessage(str: String):void{
    this.message = str;
    
    setTimeout(() =>{
      this.clear();
    }, 5000)
  }

  clear(){
    this.message = '';
    window.location.reload();
  }

}
