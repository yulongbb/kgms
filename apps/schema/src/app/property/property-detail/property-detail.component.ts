import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'kgms-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent {
  property: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getProperty();
  }

  getProperty(): void {
    this.http
      .get(`http://localhost:3333/api/property/${this.route.snapshot.paramMap.get('id')}`)
      .subscribe((property) => (this.property = property));
  }

  goBack(): void {
    this.location.back();
  }
}
