import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kgms-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css'],
})
export class DatasetComponent implements OnInit{
  name = 'Set iframe source';
  url:any
  urlSafe!: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer,private route: ActivatedRoute,) { 
    this.route.queryParams.subscribe((params: any) => {
      this.url = `http://localhost:8000/datasets/graph/${params['id']}/`;
    });
  }

  ngOnInit() {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
