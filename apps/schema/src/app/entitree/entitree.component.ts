import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'kgms-entitree',
  templateUrl: './entitree.component.html',
  styleUrls: ['./entitree.component.css'],
})
export class EntitreeComponent {
  name = 'Set iframe source';
  url = 'http://localhost:3000';
  urlSafe!: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
