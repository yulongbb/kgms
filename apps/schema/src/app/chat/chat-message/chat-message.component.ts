import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() msg: any;
  @Input() predecessor: any;
  @Input() user: any;
  @Input() allowsReply = false;

  constructor() {}

  ngOnInit() {}

  getDateDivider(msg: any): string {
    if (!msg.createdAt) {
      return '';
    }

    return msg.createdAt.format('l');
  }

  getUserName(user: any): string {
    if (!user) {
      return '';
    }
    return user.displayName;
  }

  getCreatedDate(msg: any): string {
    if (!msg.createdAt) {
      return '';
    }
    return msg.createdAt.format('LT');
  }

  isPredecessorSameAuthor(): boolean {
    if (!this.predecessor) {
      return false;
    }
    return this.predecessor.uid === this.msg.uid;
  }

  isTemporalClose(): boolean {
    if (!this.predecessor) {
      return true;
    }

    const duration = moment.duration(
      this.msg.createdAt.diff(this.predecessor.createdAt)
    );
    return duration.asMinutes() <= 1;
  }

  isPreviousMessageFromOtherDay() {
    if (!this.predecessor) {
      return true;
    }
    const prevDate = this.predecessor.createdAt.day();
    const date = this.msg.createdAt.day();
    return prevDate !== date;
  }
}
