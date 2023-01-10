import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kgms-instance-detail',
  templateUrl: './instance-detail.component.html',
  styleUrls: ['./instance-detail.component.css'],
})
export class InstanceDetailComponent implements OnInit {
  instance: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getInstance();
  }

  getInstance(): void {
    this.http
      .get(
        `http://localhost:3333/api/entity/${this.route.snapshot.paramMap.get(
          'id'
        )}`
      )
      .subscribe((instance: any) => (this.instance = instance));
  }

  goBack(): void {
    this.location.back();
  }
}
