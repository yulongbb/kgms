import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-chat-controls',
  templateUrl: './chat-controls.component.html',
  styleUrls: ['./chat-controls.component.scss']
})
export class ChatControlsComponent implements OnInit {
  @Input() chatId!: string;

  messageControl: FormControl;
  chatForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.messageControl = new FormControl();
    this.chatForm = this.fb.group({ message: this.messageControl });
  }

  ngOnInit() {
    this.scrollBottom();

    this.messageControl.valueChanges
      .pipe(
        filter(data => data !== ''),
        throttleTime(1400)
      )
      .subscribe(data => {
        
      });

    this.messageControl.valueChanges
      .pipe(
        filter(data => data !== ''),
        debounceTime(1500)
      )
      .subscribe(data => {
        
      });
  }

  submit(): void {
    const msg = this.messageControl.value;
    if (!msg) {
      return alert('Please enter a message.');
    }
  
    this.messageControl.reset();
    this.scrollBottom();
  }

  private scrollBottom(): void {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }

  setSelectedFiles(event:any): void {
  }

  deleteAttachment(file:any): void {
  }

  getAttachments(): File[] {
    return [];
  }

  hasAttachments() {
  }
}
