import { Component } from '@angular/core';

@Component({
  selector: 'kgms-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  chat = {id: '123', typing: ['12312']}
  messages = [{content:'123'}]
  user = {uid:'123', email:'1232', displayName: '123', photoUrl:'123'}

  trackByCreated(msg:any) {
    return msg.createdAt;
  }
}
