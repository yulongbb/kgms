import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing-indicator',
  templateUrl: './typing-indicator.component.html',
  styleUrls: ['./typing-indicator.component.scss']
})
export class TypingIndicatorComponent implements OnInit {
  @Input() user: any;
  @Input() typing!: string[];

  constructor() {}

  ngOnInit() {}

  showTyping(typing:any, userId:any) {
    return typing.some((typerId:any) => typerId !== userId);
  }

  getTypingUsersById(typing:any, userId:any) {
    const otherUserIds = typing.filter((typerId:any) => typerId !== userId);
    let names: string = otherUserIds
      .map((typerId:any) => {})
      .join(', ');
    otherUserIds.length > 1
      ? (names = names + ' are typing...')
      : (names = names + ' is typing...');
    return names;
  }

  
  getUserName(user:any) {
    if (!user) {
      return null;
    }
    return user.realName ? user.realName : user.displayName;
  }
}
